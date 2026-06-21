"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo } from "react";
import type { HouseGeometry, LightingScenario } from "../lib/house";

const LIGHTING_PRESETS: Record<LightingScenario, { color: string; intensity: number; positions: [number, number, number][] }> = {
  "Curb Appeal": {
    color: "#ffd8a6",
    intensity: 1.9,
    positions: [
      [0, 4, 6],
      [-3, 2, 4],
    ],
  },
  Security: {
    color: "#e8f2ff",
    intensity: 2.4,
    positions: [
      [0, 5, 6],
      [3, 3, -4],
    ],
  },
  Dramatic: {
    color: "#ffb16a",
    intensity: 2.7,
    positions: [
      [-5, 2, 2],
      [5, 2, 2],
    ],
  },
  Minimal: {
    color: "#c7e3ff",
    intensity: 1.1,
    positions: [
      [0, 4, 6],
      [0, 2, -5],
    ],
  },
};

function HouseBody({ house }: { house: HouseGeometry }) {
  const width = house.facadeWidth;
  const depth = width * 0.7;
  const height = house.stories * 1.2;
  const roofHeight = Math.max(0.8, width * 0.4);

  const roofMaterial = useMemo(
    () => ({ color: "#4a3f35", metalness: 0.2, roughness: 0.7 }),
    []
  );

  const wallMaterial = useMemo(
    () => ({ color: "#e8e2d6", metalness: 0.1, roughness: 0.8 }),
    []
  );

  return (
    <group>
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial {...wallMaterial} />
      </mesh>

      <mesh
        position={[0, height + roofHeight / 2 - 0.1, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
      >
        <coneGeometry args={[width * 0.95, roofHeight, 4]} />
        <meshStandardMaterial {...roofMaterial} />
      </mesh>

      {house.features.garage ? (
        <mesh position={[width * 0.75, 0.5, -depth * 0.2]} castShadow receiveShadow>
          <boxGeometry args={[width * 0.6, 1.1, depth * 0.55]} />
          <meshStandardMaterial color="#c7c7c7" metalness={0.05} roughness={0.9} />
        </mesh>
      ) : null}

      {house.features.porch ? (
        <group>
          <mesh position={[0, 0.25, depth * 0.55]} castShadow receiveShadow>
            <boxGeometry args={[width * 0.8, 0.5, 0.4]} />
            <meshStandardMaterial color="#d9d1bf" />
          </mesh>
          {Array.from({ length: house.features.columns }).map((_, index) => {
            const x = -width * 0.25 + index * (width * 0.25);
            return (
              <mesh key={index} position={[x, 0.9, depth * 0.75]} castShadow>
                <cylinderGeometry args={[0.08, 0.08, 1.4, 16]} />
                <meshStandardMaterial color="#f5f0e6" />
              </mesh>
            );
          })}
        </group>
      ) : null}

      {house.features.chimney ? (
        <mesh position={[-width * 0.25, height + roofHeight / 2 - 0.2, -depth * 0.15]} castShadow>
          <boxGeometry args={[0.4, 1.1, 0.4]} />
          <meshStandardMaterial color="#6b5b4b" />
        </mesh>
      ) : null}
    </group>
  );
}

export default function Scene({
  house,
  lightingScenario,
}: {
  house: HouseGeometry;
  lightingScenario: LightingScenario;
}) {
  const preset = LIGHTING_PRESETS[lightingScenario];

  return (
    <div className="rounded-3xl border border-zinc-200 bg-zinc-950/5 p-0 shadow-xl shadow-zinc-900/5">
      <Canvas shadows camera={{ position: [6, 4, 10], fov: 45 }}>
        <color attach="background" args={["#0f172a"]} />
        <ambientLight intensity={0.35} color="#d7e9ff" />
        <directionalLight
          castShadow
          intensity={0.8}
          position={[4, 8, 6]}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        {preset.positions.map((position, index) => (
          <spotLight
            key={index}
            castShadow
            position={position}
            angle={0.35}
            penumbra={0.75}
            intensity={preset.intensity}
            color={preset.color}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
        ))}
        <pointLight position={[0, 5, 0]} intensity={0.3} color="#ffffff" />

        <HouseBody house={house} />

        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[40, 40]} />
          <shadowMaterial opacity={0.22} />
        </mesh>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
          <planeGeometry args={[40, 40]} />
          <meshStandardMaterial color="#081018" metalness={0.2} roughness={0.85} />
        </mesh>

        <OrbitControls enablePan enableRotate enableZoom minDistance={4} maxDistance={18} />
      </Canvas>
    </div>
  );
}
