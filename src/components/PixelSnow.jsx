import PixelSnowCore from "./PixelSnowCore";

export default function PixelSnowBackground() {
  return (
    <div
      className="fixed inset-0 w-screen h-screen pointer-events-none z-10"
      style={{
        filter: "none",
        backdropFilter: "none",
        WebkitBackdropFilter: "none",
        isolation: "isolate",
      }}
      aria-hidden="true"
    >
      <PixelSnowCore
        color="#ffffff"
        variant="snowflake"
        brightness={1}
        gamma={0.4545}
        speed={1.2}
        density={0.25}
        direction={125}
        flakeSize={0.015}
        minFlakeSize={1.25}
        pixelResolution={500}
        depthFade={8}
        farPlane={20}
      />
    </div>
  );
}
