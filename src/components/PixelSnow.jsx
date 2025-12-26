import PixelSnow from './PixelSnow';
export default function PixelSnowBackground() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <PixelSnow
        color="#ffffff"
        flakeSize={0.8}
        minFlakeSize={0.4}
        pixelResolution={440}
        speed={1.2}
        density={0.25}
        direction={125}
        brightness={1}
      />
    </div>
  );
}