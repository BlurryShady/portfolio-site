import { SEA_WORLD_SIZE } from '../constants/sea';
import { useLayoutObstacles } from '../hooks/useLayoutObstacles';
import SeaScene from './SeaScene';

function SeaEffect({ obstacleTargets = [] }) {
  const obstacles = useLayoutObstacles(obstacleTargets, SEA_WORLD_SIZE, {
    radiusMultiplier: 1,
    strength: 0.35,
    minRadius: 8,
  });

  return (
    <>
      <div className="sea-wrapper" aria-hidden>
        <SeaScene obstacles={obstacles} />
      </div>
    </>
  );
}

export default SeaEffect;
