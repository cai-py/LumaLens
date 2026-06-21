import { useMemo } from "react";

export default function TemplateHouse() {
  const wallMat = useMemo(() => ({ color: "#e9e4db", roughness: 0.8 }), []);
  const roofMat = useMemo(() => ({ color: "#7b4f3b", roughness: 0.7 }), []);

  return (
    <group rotation={[0, Math.PI / 8, 0]} position={[0, 0.6, 0]}>
      {/* Main volume */}
      <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 2.2, 3]} />
        <meshStandardMaterial {...wallMat} />
      </mesh>

      {/* Gabled roof */}
      <mesh position={[0, 2.4, 0]} rotation={[0, 0, 0]} castShadow>
        <coneGeometry args={[2.6, 1.2, 4]} />
        <meshStandardMaterial {...roofMat} />
      </mesh>

      {/* Door */}
      <mesh position={[0, 0.3, 1.51]} castShadow>
        <boxGeometry args={[0.7, 1.2, 0.08]} />
        <meshStandardMaterial color="#5b3a29" />
      </mesh>

      {/* Windows */}
      <mesh position={[-1.1, 1.1, 1.51]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.05]} />
        <meshStandardMaterial color="#cfe8ff" metalness={0.1} roughness={0.3} />
      </mesh>
      <mesh position={[1.1, 1.1, 1.51]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.05]} />
        <meshStandardMaterial color="#cfe8ff" metalness={0.1} roughness={0.3} />
      </mesh>

      {/* Garage */}
      <mesh position={[2.1, 0.55, -0.2]} castShadow>
        <boxGeometry args={[1.2, 1.1, 1.6]} />
        <meshStandardMaterial color="#d0d0d0" />
      </mesh>

      {/* Chimney */}
      <mesh position={[-1.3, 2.1, -0.3]} castShadow>
        <boxGeometry args={[0.25, 0.9, 0.25]} />
        <meshStandardMaterial color="#6b5b4b" />
      </mesh>
    </group>
  );
}
