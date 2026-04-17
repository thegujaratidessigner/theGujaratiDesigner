"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ── Hover-colour hook ──────────────────────────────────
   Smoothly lerps material colour + emissive to white on
   pointer-over, back to the base colour on pointer-out.   */
function useHoverColor(baseColor: string, baseEmissive = 0.35) {
  const matRef      = useRef<THREE.MeshStandardMaterial>(null);
  const isHovered   = useRef(false);
  const currentCol  = useRef(new THREE.Color(baseColor));
  const targetCol   = useRef(new THREE.Color(baseColor));

  const onOver = () => {
    isHovered.current = true;
    targetCol.current.set("#ffffff");
    document.body.style.cursor = "pointer";
  };
  const onOut = () => {
    isHovered.current = false;
    targetCol.current.set(baseColor);
    document.body.style.cursor = "default";
  };
  const tick = () => {
    if (!matRef.current) return;
    currentCol.current.lerp(targetCol.current, 0.07);
    matRef.current.color.copy(currentCol.current);
    matRef.current.emissive.copy(currentCol.current);
    matRef.current.emissiveIntensity = THREE.MathUtils.lerp(
      matRef.current.emissiveIntensity,
      isHovered.current ? 1.4 : baseEmissive,
      0.07
    );
  };

  return { matRef, onOver, onOut, tick };
}

/* ── Shape components ───────────────────────────────── */

function Torus({ pos, color, args = [1.1, 0.32, 16, 48] as [number,number,number,number], rx = 0.35, ry = 0.55, fs = 1.6 }: {
  pos: [number,number,number]; color: string;
  args?: [number,number,number,number]; rx?: number; ry?: number; fs?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const { matRef, onOver, onOut, tick } = useHoverColor(color);
  useFrame((_, d) => {
    if (ref.current) { ref.current.rotation.x += d * rx; ref.current.rotation.y += d * ry; }
    tick();
  });
  return (
    <Float speed={fs} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={ref} position={pos} onPointerOver={onOver} onPointerOut={onOut}>
        <torusGeometry args={args} />
        <meshStandardMaterial ref={matRef} color={color} emissive={color}
          emissiveIntensity={0.35} roughness={0.2} metalness={0.85} />
      </mesh>
    </Float>
  );
}

function Icosahedron({ pos, color, radius = 0.9, rx = 0.45, rz = 0.3, fs = 2.2, wire = false }: {
  pos: [number,number,number]; color: string; radius?: number;
  rx?: number; rz?: number; fs?: number; wire?: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const { matRef, onOver, onOut, tick } = useHoverColor(color, wire ? 0.8 : 0.35);
  useFrame((_, d) => {
    if (ref.current) { ref.current.rotation.x += d * rx; ref.current.rotation.z += d * rz; }
    tick();
  });
  return (
    <Float speed={fs} rotationIntensity={0.5} floatIntensity={0.7}>
      <mesh ref={ref} position={pos} onPointerOver={onOver} onPointerOut={onOut}>
        <icosahedronGeometry args={[radius, 0]} />
        <meshStandardMaterial ref={matRef} color={color} emissive={color}
          emissiveIntensity={wire ? 0.8 : 0.35} roughness={0.15} metalness={0.9} wireframe={wire} />
      </mesh>
    </Float>
  );
}

function Octahedron({ pos, color, radius = 0.75, ry = 0.65, rz = 0.2, fs = 1.9 }: {
  pos: [number,number,number]; color: string; radius?: number;
  ry?: number; rz?: number; fs?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const { matRef, onOver, onOut, tick } = useHoverColor(color);
  useFrame((_, d) => {
    if (ref.current) { ref.current.rotation.y += d * ry; ref.current.rotation.z += d * rz; }
    tick();
  });
  return (
    <Float speed={fs} rotationIntensity={0.4} floatIntensity={0.5}>
      <mesh ref={ref} position={pos} onPointerOver={onOver} onPointerOut={onOut}>
        <octahedronGeometry args={[radius, 0]} />
        <meshStandardMaterial ref={matRef} color={color} emissive={color}
          emissiveIntensity={0.3} roughness={0.25} metalness={0.8} />
      </mesh>
    </Float>
  );
}

function TorusKnot({ pos, color, args = [0.45, 0.13, 80, 10] as [number,number,number,number], rx = 0.3, ry = 0.45, fs = 1.3 }: {
  pos: [number,number,number]; color: string;
  args?: [number,number,number,number]; rx?: number; ry?: number; fs?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const { matRef, onOver, onOut, tick } = useHoverColor(color, 0.45);
  useFrame((_, d) => {
    if (ref.current) { ref.current.rotation.x += d * rx; ref.current.rotation.y += d * ry; }
    tick();
  });
  return (
    <Float speed={fs} rotationIntensity={0.25} floatIntensity={0.4}>
      <mesh ref={ref} position={pos} onPointerOver={onOver} onPointerOut={onOut}>
        <torusKnotGeometry args={args} />
        <meshStandardMaterial ref={matRef} color={color} emissive={color}
          emissiveIntensity={0.45} roughness={0.15} metalness={0.9} />
      </mesh>
    </Float>
  );
}

function Dodecahedron({ pos, color, radius = 0.7, rx = 0.2, ry = 0.4, fs = 1.7 }: {
  pos: [number,number,number]; color: string; radius?: number;
  rx?: number; ry?: number; fs?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const { matRef, onOver, onOut, tick } = useHoverColor(color);
  useFrame((_, d) => {
    if (ref.current) { ref.current.rotation.x += d * rx; ref.current.rotation.y += d * ry; }
    tick();
  });
  return (
    <Float speed={fs} rotationIntensity={0.35} floatIntensity={0.55}>
      <mesh ref={ref} position={pos} onPointerOver={onOver} onPointerOut={onOut}>
        <dodecahedronGeometry args={[radius, 0]} />
        <meshStandardMaterial ref={matRef} color={color} emissive={color}
          emissiveIntensity={0.3} roughness={0.2} metalness={0.85} />
      </mesh>
    </Float>
  );
}

function WireSphere({ pos, color, radius = 0.7, fs = 2.0 }: {
  pos: [number,number,number]; color: string; radius?: number; fs?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const { matRef, onOver, onOut, tick } = useHoverColor(color, 0.7);
  useFrame((_, d) => {
    if (ref.current) { ref.current.rotation.y += d * 0.5; ref.current.rotation.x += d * 0.2; }
    tick();
  });
  return (
    <Float speed={fs} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={ref} position={pos} onPointerOver={onOver} onPointerOut={onOut}>
        <sphereGeometry args={[radius, 10, 10]} />
        <meshStandardMaterial ref={matRef} color={color} emissive={color}
          emissiveIntensity={0.7} roughness={0.1} metalness={0.9} wireframe />
      </mesh>
    </Float>
  );
}

/* ── Scene: all 10 shapes + mouse parallax ────────────── */

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, state.mouse.x * 0.18, 0.04);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -state.mouse.y * 0.12, 0.04);
  });

  return (
    <group ref={groupRef}>
      {/* 1 — large torus, right */}
      <Torus pos={[5.2, 0.6, -1]} color="#7c3aed" rx={0.3} ry={0.5} fs={1.5} />

      {/* 2 — wireframe icosahedron, far left */}
      <Icosahedron pos={[-5.0, 1.8, -2]} color="#ec4899" wire radius={1.1} rx={0.3} rz={0.18} fs={1.8} />

      {/* 3 — small solid icosahedron, upper-center */}
      <Icosahedron pos={[1.2, 4.2, -3]} color="#a855f7" radius={0.55} rx={0.5} rz={0.3} fs={2.4} />

      {/* 4 — octahedron, lower-right */}
      <Octahedron pos={[4.2, -3.2, 0.3]} color="#a855f7" ry={0.7} rz={0.25} fs={2.0} />

      {/* 5 — torus knot, lower-left */}
      <TorusKnot pos={[-4.0, -3.0, -0.5]} color="#c026d3" rx={0.28} ry={0.42} fs={1.2} />

      {/* 6 — small torus, far left mid */}
      <Torus pos={[-5.8, -0.6, -3]} color="#7c3aed" args={[0.55, 0.18, 12, 32]} rx={0.5} ry={0.7} fs={2.2} />

      {/* 7 — tiny octahedron, upper-right corner */}
      <Octahedron pos={[5.8, 3.2, -2]} color="#ec4899" radius={0.38} ry={0.9} rz={0.3} fs={2.5} />

      {/* 8 — dodecahedron, upper-left */}
      <Dodecahedron pos={[-3.2, 4.0, -2]} color="#a855f7" radius={0.65} rx={0.25} ry={0.35} fs={1.6} />

      {/* 9 — wireframe sphere, far right deep */}
      <WireSphere pos={[6.5, -1.2, -4]} color="#7c3aed" radius={1.0} fs={1.4} />

      {/* 10 — small torus knot, lower-center */}
      <TorusKnot pos={[2.2, -4.2, -1]} color="#ec4899" args={[0.35, 0.1, 64, 8]} rx={0.4} ry={0.6} fs={1.9} />
    </group>
  );
}

/* ── Canvas ─────────────────────────────────────────── */

// THREE.Clock is deprecated in Three.js r174+ in favour of THREE.Timer.
// @react-three/fiber still uses it internally — suppress until R3F updates.
if (typeof window !== "undefined") {
  const _warn = console.warn.bind(console);
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) return;
    _warn(...args);
  };
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 58 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[ 6,  6,  4]} color="#a855f7" intensity={4} />
      <pointLight position={[-6, -4,  2]} color="#ec4899" intensity={3} />
      <pointLight position={[ 0, -6,  3]} color="#7c3aed" intensity={2} />
      <Scene />
    </Canvas>
  );
}
