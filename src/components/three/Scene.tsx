import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ----------------------------------------------------
// 1. Floating Lotus Petals & Jasmine Buds Particle System
// ----------------------------------------------------
interface PetalProps {
  count: number;
  scrollY: number;
}

function LotusPetalsAndJasmine({ count, scrollY }: PetalProps) {
  const petalsRef = useRef<THREE.InstancedMesh>(null);
  const jasmineRef = useRef<THREE.InstancedMesh>(null);

  // Petal geometry: concave curved petal
  const petalGeometry = useMemo(() => {
    const geom = new THREE.CylinderGeometry(0.02, 0.24, 0.55, 7, 3);
    geom.scale(1, 1, 0.25);
    return geom;
  }, []);

  // Jasmine bud geometry: tiny teardrop/spherical bud
  const jasmineGeometry = useMemo(() => {
    const geom = new THREE.DodecahedronGeometry(0.12, 1);
    geom.scale(0.8, 1.2, 0.8);
    return geom;
  }, []);

  // Precompute initial random positions and velocities
  const [petalData, jasmineData] = useMemo(() => {
    const pData = [];
    const jData = [];
    for (let i = 0; i < count; i++) {
      pData.push({
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 22,
        z: (Math.random() - 0.5) * 12 - 2,
        rotX: Math.random() * Math.PI,
        rotY: Math.random() * Math.PI,
        rotZ: Math.random() * Math.PI,
        speedY: 0.008 + Math.random() * 0.012,
        speedRot: 0.008 + Math.random() * 0.014,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: 0.8 + Math.random() * 1.2,
      });

      jData.push({
        x: (Math.random() - 0.5) * 22,
        y: (Math.random() - 0.5) * 22,
        z: (Math.random() - 0.5) * 10 - 1,
        rotX: Math.random() * Math.PI,
        rotY: Math.random() * Math.PI,
        rotZ: Math.random() * Math.PI,
        speedY: 0.006 + Math.random() * 0.01,
        speedRot: 0.006 + Math.random() * 0.01,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: 0.6 + Math.random() * 1.0,
      });
    }
    return [pData, jData];
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scrollOffset = scrollY * 0.0025;

    // Update Lotus Petals
    if (petalsRef.current) {
      for (let i = 0; i < count; i++) {
        const item = petalData[i];
        item.y -= item.speedY + (scrollOffset > 0 ? 0.005 : 0);
        if (item.y < -12) item.y = 12;

        const sway = Math.sin(time * item.swaySpeed + item.swayPhase) * 0.45;
        dummy.position.set(item.x + sway, item.y, item.z);
        dummy.rotation.set(
          item.rotX + time * item.speedRot,
          item.rotY + time * item.speedRot * 0.8,
          item.rotZ + sway * 0.6
        );
        dummy.scale.setScalar(0.9 + Math.sin(item.swayPhase) * 0.2);
        dummy.updateMatrix();
        petalsRef.current.setMatrixAt(i, dummy.matrix);
      }
      petalsRef.current.instanceMatrix.needsUpdate = true;
    }

    // Update Jasmine Buds
    if (jasmineRef.current) {
      for (let i = 0; i < count; i++) {
        const item = jasmineData[i];
        item.y -= item.speedY;
        if (item.y < -12) item.y = 12;

        const sway = Math.cos(time * item.swaySpeed + item.swayPhase) * 0.35;
        dummy.position.set(item.x + sway, item.y, item.z);
        dummy.rotation.set(
          item.rotX + time * item.speedRot * 0.6,
          item.rotY + time * item.speedRot,
          item.rotZ
        );
        dummy.scale.setScalar(0.75 + Math.cos(item.swayPhase) * 0.15);
        dummy.updateMatrix();
        jasmineRef.current.setMatrixAt(i, dummy.matrix);
      }
      jasmineRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      {/* Lotus Petals: Soft sacred pink with slight translucency */}
      <instancedMesh
        ref={petalsRef}
        args={[petalGeometry, undefined, count]}
      >
        <meshStandardMaterial
          color="#E66591"
          roughness={0.4}
          metalness={0.08}
          transparent
          opacity={0.88}
        />
      </instancedMesh>

      {/* Jasmine Buds: Pure fragrant white/cream with faint yellow hint */}
      <instancedMesh
        ref={jasmineRef}
        args={[jasmineGeometry, undefined, count]}
      >
        <meshStandardMaterial
          color="#FFFDF0"
          roughness={0.25}
          metalness={0.05}
          transparent
          opacity={0.92}
        />
      </instancedMesh>
    </>
  );
}

// ----------------------------------------------------
// 2. Warm Golden Bokeh Dust Motes & Diya Glow Particles
// ----------------------------------------------------
function GoldenDustMotes({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      spd[i] = 0.004 + Math.random() * 0.008;
    }
    return [pos, spd];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      // Golden motes rise upward slowly like warm diya embers
      let y = posAttr.getY(i) + speeds[i];
      if (y > 10) y = -10;
      posAttr.setY(i, y);

      // Gentle horizontal drift
      const x = posAttr.getX(i) + Math.sin(time * 0.5 + i) * 0.003;
      posAttr.setX(i, x);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.14}
        color="#F5B82E"
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// ----------------------------------------------------
// 3. Interactive 3D Mangala Kalasha & Diya (Centerpiece)
// ----------------------------------------------------
function TraditionalDiyaKalasha({ scrollY }: { scrollY: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const flameLightRef = useRef<THREE.PointLight>(null);
  const flameMeshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Gentle floating and subtle parallax with mouse and scroll
      groupRef.current.position.y = 0.8 + Math.sin(time * 1.5) * 0.12 - scrollY * 0.0012;
      groupRef.current.rotation.y = time * 0.35 + mouse.x * 0.4 + scrollY * 0.0015;
      groupRef.current.rotation.x = 0.2 + mouse.y * 0.15;
    }

    // Realistic warm diya flame flicker
    if (flameLightRef.current) {
      const flicker = Math.sin(time * 14) * 0.15 + Math.cos(time * 23) * 0.1;
      flameLightRef.current.intensity = 2.4 + flicker;
    }

    if (flameMeshRef.current) {
      const scaleX = 1 + Math.sin(time * 12) * 0.08;
      const scaleY = 1 + Math.cos(time * 16) * 0.12;
      flameMeshRef.current.scale.set(scaleX, scaleY, scaleX);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.8, 0]}>
      {/* --- Mangala Kalasha Vessel / Deepa Base (Brass Gold) --- */}
      {/* Lower circular base pedestal */}
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[0.9, 1.1, 0.18, 32]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.88} roughness={0.22} />
      </mesh>

      {/* Stem / waist pillar */}
      <mesh position={[0, -0.9, 0]}>
        <cylinderGeometry args={[0.35, 0.55, 0.45, 32]} />
        <meshStandardMaterial color="#C59B27" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Main Pot (Kumbha / Diya bowl) */}
      <mesh position={[0, -0.2, 0]}>
        <sphereGeometry args={[0.95, 32, 24]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.88} roughness={0.2} />
      </mesh>

      {/* Ornate decorative ring around pot */}
      <mesh position={[0, -0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.97, 0.045, 16, 48]} />
        <meshStandardMaterial color="#B8860B" metalness={0.92} roughness={0.15} />
      </mesh>

      {/* Neck rim of Kalasha */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.62, 0.45, 0.25, 32]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Flared top collar */}
      <mesh position={[0, 0.72, 0]}>
        <cylinderGeometry args={[0.78, 0.6, 0.12, 32]} />
        <meshStandardMaterial color="#E8C86A" metalness={0.9} roughness={0.18} />
      </mesh>

      {/* Five Auspicious Mango Leaves (Spreading outward) */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i * Math.PI * 2) / 5;
        return (
          <group key={i} rotation={[0.42, angle, 0]} position={[0, 0.75, 0]}>
            <mesh position={[0, 0.45, 0.22]} rotation={[-0.4, 0, 0]}>
              <coneGeometry args={[0.22, 0.85, 5]} />
              <meshStandardMaterial color="#2E7D32" roughness={0.35} metalness={0.15} />
            </mesh>
          </group>
        );
      })}

      {/* Sacred Coconut (Shrifal) on top */}
      <mesh position={[0, 1.15, 0]}>
        <sphereGeometry args={[0.46, 24, 20]} />
        <meshStandardMaterial color="#78350F" roughness={0.7} metalness={0.05} />
      </mesh>

      {/* Traditional Diya Wick & Flame on the apex */}
      <group position={[0, 1.62, 0]}>
        {/* Diya Brass Cup at apex */}
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.24, 0.12, 0.1, 24]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Flickering Flame Mesh */}
        <mesh ref={flameMeshRef} position={[0, 0.22, 0]}>
          <coneGeometry args={[0.13, 0.42, 16]} />
          <meshBasicMaterial color="#FFB300" />
        </mesh>

        {/* Inner white flame core */}
        <mesh position={[0, 0.15, 0]}>
          <coneGeometry args={[0.07, 0.24, 16]} />
          <meshBasicMaterial color="#FFF9C4" />
        </mesh>

        {/* Diya Point Light */}
        <pointLight
          ref={flameLightRef}
          color="#FF9500"
          intensity={2.8}
          distance={8}
          decay={2}
          position={[0, 0.25, 0]}
        />
      </group>
    </group>
  );
}

// ----------------------------------------------------
// 4. Main Scene Component with Parallax Canvas
// ----------------------------------------------------
export const Scene: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.9} color="#FFFDF7" />
        <directionalLight position={[5, 8, 5]} intensity={1.4} color="#FFF5DB" />
        <directionalLight position={[-5, -4, -3]} intensity={0.5} color="#D84B7E" />

        {/* Floating sacred petals & buds */}
        <LotusPetalsAndJasmine count={isMobile ? 35 : 75} scrollY={scrollY} />

        {/* Golden dust motes */}
        <GoldenDustMotes count={isMobile ? 60 : 130} />

        {/* 3D Mangala Kalasha & Brass Diya hero */}
        <TraditionalDiyaKalasha scrollY={scrollY} />
      </Canvas>
    </div>
  );
};
