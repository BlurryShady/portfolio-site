import PixelSnow from "./PixelSnow";
export default function PixelSnowBackground() {
  return (
    <div
      className="fixed inset-0 w-screen h-screen pointer-events-none z-[9999]"
      aria-hidden="true"
    >
      <PixelSnow
        // visuals
        color="#ffffff"
        variant="snowflake"  
        brightness={1}
        gamma={0.4545}

        // behavior
        speed={1.2}
        density={0.25}
        direction={125}


        flakeSize={0.015}
        minFlakeSize={1.25}
        pixelResolution={440}


        depthFade={8}
        farPlane={20}
      />
    </div>
  );
}
