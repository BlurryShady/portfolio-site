import { useEffect, useState } from 'react';

function mapToSeaSpace(rect, viewport, seaSize, options) {
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const normalizedX = ((centerX / viewport.width) - 0.5) * seaSize;
  const normalizedY = -((centerY / viewport.height) - 0.5) * seaSize;
  const maxViewport = Math.max(viewport.width, viewport.height);
  const influence = Math.max(rect.width, rect.height) / maxViewport;

  return {
    position: [normalizedX, normalizedY],
    radius: Math.max(options.minRadius, influence * seaSize * options.radiusMultiplier),
    strength: options.strength,
  };
}

export function useLayoutObstacles(targets = [], seaSize, defaults = {}) {
  const [obstacles, setObstacles] = useState([]);

  useEffect(() => {
    if (!targets.length || !seaSize) {
      setObstacles([]);
      return undefined;
    }

    let frame;
    const viewport = { width: window.innerWidth, height: window.innerHeight };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        viewport.width = window.innerWidth;
        viewport.height = window.innerHeight;

        const next = targets
          .map((target, index) => {
            const element = target.ref?.current;
            if (!element) return null;
            const rect = element.getBoundingClientRect();
            if (!rect.width && !rect.height) return null;
            const mapped = mapToSeaSpace(rect, viewport, seaSize, {
              radiusMultiplier: target.radiusMultiplier ?? defaults.radiusMultiplier ?? 1,
              strength: target.strength ?? defaults.strength ?? 0.35,
              minRadius: defaults.minRadius ?? 4,
            });
            return { id: target.id ?? `obstacle-${index}`, ...mapped };
          })
          .filter(Boolean);

        setObstacles(next);
      });
    };

    schedule();

    const handleResize = () => schedule();
    const handleScroll = () => schedule();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const resizeObserver = new ResizeObserver(schedule);
    targets.forEach((target) => {
      if (target.ref?.current) {
        resizeObserver.observe(target.ref.current);
      }
    });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
    };
  }, [targets, seaSize, defaults.radiusMultiplier, defaults.strength, defaults.minRadius]);

  return obstacles;
}
