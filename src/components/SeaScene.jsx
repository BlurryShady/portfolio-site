import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, extend, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrthographicCamera, Sky } from '@react-three/drei';
import * as THREE from 'three';
import { Water } from 'three-stdlib';
import { MAX_OBSTACLES, SEA_WORLD_SIZE } from '../constants/sea';

extend({ Water });

const WATER_PLANE_SIZE = SEA_WORLD_SIZE * 6;
const WATER_NORMALS_URL = 'https://threejs.org/examples/textures/waternormals.jpg';
const SEA_MIDNIGHT_BLUE = '#000512';
const SEA_FOG_BLUE = '#010a18';
const SEA_MASK_SIZE = SEA_WORLD_SIZE * 2.4;
const SEA_SEGMENTS = 280;

const rippleVertex = `
  uniform float uTime;
  uniform float uAmplitude;
  uniform float uRimLift;
  uniform int uObstacleCount;
  uniform vec4 uObstacles[${MAX_OBSTACLES}];
  varying float vHeight;
  varying float vMask;
  varying float vRim;
  varying float vCalm;

  float wave(vec2 pos, vec2 direction, float freq, float speed, float amp) {
    vec2 dir = normalize(direction);
    float phase = dot(pos, dir) * freq;
    return sin(phase + uTime * speed) * amp;
  }

  float hash12(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float obstacleMask(vec2 pos, out float rim) {
    float mask = 1.0;
    rim = 0.0;
    for (int i = 0; i < ${MAX_OBSTACLES}; i++) {
      if (i >= uObstacleCount) break;
      vec4 data = uObstacles[i];
      vec2 center = data.xy;
      float radius = data.z;
      float influence = data.w;
      float dist = distance(pos, center);
      float safeRadius = max(radius, 0.0001);
      float distNorm = dist / safeRadius;
      float calm = smoothstep(0.0, 1.0, distNorm);
      float strength = mix(influence, 1.0, calm);
      mask *= strength;

      float inner = smoothstep(0.55, 0.95, distNorm);
      float outer = smoothstep(0.9, 1.35, distNorm);
      float ring = inner * (1.0 - outer);
      rim = max(rim, ring * (1.0 - influence));
    }
    return mask;
  }

  void main() {
    vec3 transformed = position;
    float rim;
    float mask = obstacleMask(position.xy, rim);
    vCalm = clamp(1.0 - mask, 0.0, 1.0);
    float slow = wave(position.xy * 0.07, vec2(0.9, 0.3), 0.5, 0.09, 1.2);
    float medium = wave(position.xy * 0.22 + vec2(2.0, -3.0), vec2(-0.4, 1.0), 0.8, 0.3, 0.7);
    float fast = wave(position.yx * 0.35 + vec2(-6.0, 4.0), vec2(1.0, 0.0), 1.1, -0.5, 0.35);
    float detail = wave(position.xy * 0.7 + vec2(12.0, -16.0), vec2(0.2, -1.0), 1.1, 0.95, 0.2);
    float breakup = sin((position.x - position.y) * 0.18 + uTime * 0.12) * 0.45;
    float jitter = (hash12(position.xy * 0.18 + uTime * 0.02) - 0.5) * 0.8;
    float height = (slow + medium + fast + detail + breakup + jitter) * uAmplitude * mask;
    float rimPulse = rim * (0.9 + sin(uTime * 1.4 + position.x * 0.35 + position.y * 0.45) * 0.35);
    transformed.z += height + rimPulse * uRimLift;
    vHeight = height;
    vMask = mask;
    vRim = rimPulse;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`;

const rippleFragment = `
  precision highp float;
  uniform float uTime;
  uniform vec3 uDeepColor;
  uniform vec3 uCrestColor;
  uniform vec3 uSunColor;
  uniform float uOpacity;
  uniform float uHighlightStrength;
  uniform float uRimStrength;
  varying float vHeight;
  varying float vMask;
  varying float vRim;
  varying float vCalm;

  void main() {
    float mixVal = smoothstep(-1.2, 1.2, vHeight);
    vec3 base = mix(uDeepColor, uCrestColor, mixVal + vCalm * 0.35);
    float calmZone = vCalm;
    float sparkle = smoothstep(0.05, 1.1, abs(vHeight)) * 0.7;
    sparkle += sin(uTime * 0.4 + vHeight * 5.0) * 0.08;
    vec3 highlight = uSunColor * sparkle * (0.2 + calmZone * 0.6) * uHighlightStrength;
    float fresnel = smoothstep(0.45, 0.0, vMask) * 0.35;
    vec3 rim = uSunColor * (abs(vRim) + fresnel + calmZone * 0.5) * uRimStrength;
    vec3 color = base + highlight + rim;
    float alpha = mix(uOpacity * 0.6, uOpacity, calmZone);
    gl_FragColor = vec4(color, alpha);
  }
`;

function OceanSurface() {
  const waterRef = useRef();
  const gl = useThree((state) => state.gl);
  const waterNormals = useLoader(THREE.TextureLoader, WATER_NORMALS_URL);

  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

  const geometry = useMemo(
    () => new THREE.PlaneGeometry(WATER_PLANE_SIZE, WATER_PLANE_SIZE),
    [],
  );

  const config = useMemo(() => ({
    textureWidth: 1024,
    textureHeight: 1024,
    waterNormals,
    sunDirection: new THREE.Vector3(0.5, 1, 0.25),
    sunColor: 0xffffff,
    waterColor: 0x06345c,
    distortionScale: 4.1,
    fog: false,
    format: gl.outputColorSpace ?? gl.outputEncoding ?? THREE.LinearEncoding,
  }), [gl, waterNormals]);

  useFrame((_, delta) => {
    if (waterRef.current) {
      waterRef.current.material.uniforms.time.value += delta;
    }
  });

  return (
    <water ref={waterRef} args={[geometry, config]} rotation-x={-Math.PI / 2} position={[0, -8, 0]} />
  );
}

function RippleMask({ obstacles = [] }) {
  const shaderRef = useRef();
  const obstacleVectors = useMemo(
    () => Array.from({ length: MAX_OBSTACLES }, () => new THREE.Vector4(999, 999, 1, 1)),
    [],
  );

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uAmplitude: { value: 2.8 },
    uRimLift: { value: 3.6 },
    uDeepColor: { value: new THREE.Color('#000b1e') },
    uCrestColor: { value: new THREE.Color('#123a63') },
    uSunColor: { value: new THREE.Color('#4b80c0') },
    uOpacity: { value: 0.55 },
    uHighlightStrength: { value: 0.45 },
    uRimStrength: { value: 0.4 },
    uObstacleCount: { value: 0 },
    uObstacles: { value: obstacleVectors },
  }), [obstacleVectors]);

  useFrame((_, delta) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value += delta;
    }
  });

  useEffect(() => {
    const uniformsRef = shaderRef.current?.uniforms;
    if (!uniformsRef) return;

    for (let i = 0; i < MAX_OBSTACLES; i += 1) {
      const vector = obstacleVectors[i];
      const obstacle = obstacles[i];
      if (obstacle) {
        vector.set(obstacle.position[0], obstacle.position[1], obstacle.radius, obstacle.strength);
      } else {
        vector.set(999, 999, 0.1, 1);
      }
    }

    uniformsRef.uObstacleCount.value = Math.min(obstacles.length, MAX_OBSTACLES);
  }, [obstacles, obstacleVectors]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -6.5, 0]}>
      <planeGeometry args={[SEA_MASK_SIZE, SEA_MASK_SIZE, SEA_SEGMENTS, SEA_SEGMENTS]} />
      <shaderMaterial
        ref={shaderRef}
        uniforms={uniforms}
        vertexShader={rippleVertex}
        fragmentShader={rippleFragment}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

function VignetteOverlay() {
  const texture = useMemo(() => {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      size * 0.25,
      size / 2,
      size / 2,
      size * 0.6,
    );
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const canvasTexture = new THREE.CanvasTexture(canvas);
    canvasTexture.needsUpdate = true;
    return canvasTexture;
  }, []);

  return (
    <mesh position={[0, 0, -30]} scale={[WATER_PLANE_SIZE * 1.6, WATER_PLANE_SIZE * 1.6, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        transparent
        opacity={0.6}
        depthWrite={false}
        color="#000000"
        map={texture}
      />
    </mesh>
  );
}

function SeaScene({ obstacles = [] }) {
  return (
    <Canvas
      className="sea-canvas"
      dpr={[1, 1.5]}
    >
      <color attach="background" args={[SEA_MIDNIGHT_BLUE]} />
      <fog attach="fog" args={[SEA_FOG_BLUE, 150, 900]} />
      <OrthographicCamera
        makeDefault
        position={[0, 520, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        zoom={44}
        near={0.1}
        far={2000}
      />
      <pointLight decay={0} position={[100, 120, 160]} intensity={1.4} color="#fff2d5" />
      <pointLight decay={0.4} position={[-120, -80, -60]} intensity={0.6} color="#7ec9ff" />
      <Suspense fallback={null}>
        <OceanSurface />
        <RippleMask obstacles={obstacles} />
      </Suspense>
      <Sky scale={1000} sunPosition={[500, 150, -1000]} turbidity={0.8} />
      <VignetteOverlay />
    </Canvas>
  );
}

export default SeaScene;
