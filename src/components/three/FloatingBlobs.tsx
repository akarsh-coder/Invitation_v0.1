import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface BlobData {
  initialPos: [number, number, number];
  color: string;
  speed: number;
  radius: number;
  phase: number;
}

function BlobsCollection({ scrollY }: { scrollY: number }) {
  const { mouse } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  // 6 distinct soft-toned 3D blobs at varied depth planes
  const blobs: BlobData[] = useMemo(
    () => [
      {
        initialPos: [-3.5, 2.2, -1.5],
        color: '#E8D2A8', // Warm champagne gold
        speed: 0.45,
        radius: 2.4,
        phase: 0.2,
      },
      {
        initialPos: [3.8, 1.5, 0.5],
        color: '#F4D2DA', // Soft blush rose quartz
        speed: 0.38,
        radius: 2.8,
        phase: 1.8,
      },
      {
        initialPos: [-2.2, -2.5, 1.2],
        color: '#EAD7BA', // Soft golden cream
        speed: 0.42,
        radius: 2.1,
        phase: 3.4,
      },
      {
        initialPos: [3.2, -3.2, -1.0],
        color: '#DFBE86', // Rich antique champagne
        speed: 0.32,
        radius: 2.6,
        phase: 4.6,
      },
      {
        initialPos: [0.5, 0.2, -2.5],
        color: '#F7E6CE', // Pale warm ivory glow
        speed: 0.28,
        radius: 3.2,
        phase: 2.1,
      },
      {
        initialPos: [-4.2, -0.5, 0.8],
        color: '#F2C7CF', // Subtle blush accent
        speed: 0.36,
        radius: 1.9,
        phase: 5.2,
      },
    ],
    []
  );

  const sphereRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scrollFactor = scrollY * 0.0012;

    if (groupRef.current) {
      // Subtle parallax tilt with cursor and smooth scroll
      groupRef.current.position.y = -scrollFactor * 0.4;
      groupRef.current.rotation.x = mouse.y * 0.06;
      groupRef.current.rotation.y = mouse.x * 0.08;
    }

    // Individual organic floating motion for each blob
    sphereRefs.current.forEach((ref, idx) => {
      if (!ref) return;
      const b = blobs[idx];
      const t = time * b.speed + b.phase;

      ref.position.x = b.initialPos[0] + Math.sin(t * 0.8) * 0.85 + mouse.x * 0.3;
      ref.position.y = b.initialPos[1] + Math.cos(t * 0.6) * 0.95;
      ref.position.z = b.initialPos[2] + Math.sin(t * 0.5) * 0.5;

      // Gentle organic breathing scale
      const scale = 1 + Math.sin(t * 0.7) * 0.08;
      ref.scale.set(scale, scale, scale);
    });
  });

  return (
    <group ref={groupRef}>
      {blobs.map((b, idx) => (
        <mesh
          key={idx}
          ref={(el) => {
            sphereRefs.current[idx] = el;
          }}
          position={b.initialPos}
        >
          <sphereGeometry args={[b.radius, 28, 28]} />
          <meshStandardMaterial
            color={b.color}
            roughness={0.8}
            metalness={0.1}
            transparent
            opacity={0.65}
          />
        </mesh>
      ))}
    </group>
  );
}

export const FloatingBlobs: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#FAF8F5]">
      {/* 3D WebGL Canvas for Blobs with Depth & Lighting */}
      <div className="absolute inset-0 filter blur-[55px] sm:blur-[75px] md:blur-[95px] opacity-70 transform-gpu">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, powerPreference: 'low-power' }}
        >
          <ambientLight intensity={1.5} color="#FFFDF7" />
          <directionalLight position={[6, 8, 5]} intensity={1.2} color="#FFF5DB" />
          <directionalLight position={[-6, -6, -3]} intensity={0.8} color="#FCE4EC" />
          <BlobsCollection scrollY={scrollY} />
        </Canvas>
      </div>

      {/* Modern subtle micro-grain overlay for editorial paper finish */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#3D1212_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
    </div>
  );
};
