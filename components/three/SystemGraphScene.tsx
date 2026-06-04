"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { buildSystemGraph } from "@/lib/system-graph";

/*
  The hero's "living architecture" — distributed nodes, service links,
  and data pulses. Restrained and dark by design: small emissive nodes,
  faint accent edges, a few traveling pulses. No postprocessing, no
  heavy models. Entrance reads as a system coming online, not decoration.
*/

const COLORS = {
  node: new THREE.Color("#c3ccd6"),
  accent: new THREE.Color("#5e8bff"),
  accentStrong: new THREE.Color("#88a8ff"),
  edge: new THREE.Color("#5e8bff"),
  bg: new THREE.Color("#08090a"),
};

const NODE_RADIUS = 0.055;
const HALO_SCALE = 3.2;
const REVEAL_DURATION = 1.1;
const NODE_STAGGER = 0.045;
const PULSE_COUNT = 9;

const easeOut = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);

/** Soft radial sprite so pulse points read as glints, not squares. */
function useGlintTexture() {
  return useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2,
    );
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(200,216,255,0.65)");
    g.addColorStop(1, "rgba(120,150,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

function Graph() {
  const graph = useMemo(() => buildSystemGraph(), []);
  const glint = useGlintTexture();

  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.InstancedMesh>(null);
  const haloRef = useRef<THREE.InstancedMesh>(null);
  const edgeRef = useRef<THREE.LineSegments>(null);
  const pulseRef = useRef<THREE.Points>(null);

  const startRef = useRef<number | null>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Parallax is driven from a window listener (not canvas pointer events)
  // so the decorative layer can stay pointer-events:none and never
  // intercept clicks or scrolling on the hero content above it.
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // Pulses: a subset of edges carrying data, each with its own speed/phase.
  const pulses = useMemo(() => {
    const out: Array<{ a: THREE.Vector3; b: THREE.Vector3; speed: number; phase: number }> = [];
    const step = Math.max(1, Math.floor(graph.edges.length / PULSE_COUNT));
    for (let i = 0; i < graph.edges.length && out.length < PULSE_COUNT; i += step) {
      const [ai, bi] = graph.edges[i];
      out.push({
        a: graph.nodes[ai],
        b: graph.nodes[bi],
        speed: 0.12 + (i % 3) * 0.05,
        phase: (i * 0.37) % 1,
      });
    }
    return out;
  }, [graph]);

  const pulsePositions = useMemo(
    () => new Float32Array(pulses.length * 3),
    [pulses.length],
  );

  // Assign per-node colors once.
  const setColors = (mesh: THREE.InstancedMesh, accentColor: THREE.Color) => {
    graph.nodes.forEach((_, i) => {
      const c = graph.accentNodes.has(i) ? accentColor : COLORS.node;
      mesh.setColorAt(i, c);
    });
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  };

  useFrame((state) => {
    if (startRef.current === null) {
      startRef.current = state.clock.elapsedTime;
      if (coreRef.current) setColors(coreRef.current, COLORS.accentStrong);
      if (haloRef.current) setColors(haloRef.current, COLORS.accent);
    }
    const t = state.clock.elapsedTime - startRef.current;

    // Staggered node entrance + gentle breathing once revealed.
    const core = coreRef.current;
    const halo = haloRef.current;
    if (core && halo) {
      for (let i = 0; i < graph.nodes.length; i++) {
        const p = easeOut((t - i * NODE_STAGGER) / REVEAL_DURATION);
        const breathe = 1 + Math.sin(t * 0.8 + i) * 0.06;
        const n = graph.nodes[i];

        dummy.position.copy(n);
        dummy.scale.setScalar(p * breathe);
        dummy.updateMatrix();
        core.setMatrixAt(i, dummy.matrix);

        dummy.scale.setScalar(p * HALO_SCALE * (0.9 + Math.sin(t * 0.6 + i) * 0.12));
        dummy.updateMatrix();
        halo.setMatrixAt(i, dummy.matrix);
      }
      core.instanceMatrix.needsUpdate = true;
      halo.instanceMatrix.needsUpdate = true;
    }

    // Edges fade in after the nodes begin appearing.
    if (edgeRef.current) {
      const mat = edgeRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = easeOut((t - 0.5) / 1.2) * 0.16;
    }

    // Data pulses travel along their edges.
    if (pulseRef.current) {
      const attr = pulseRef.current.geometry.getAttribute(
        "position",
      ) as THREE.BufferAttribute;
      const reveal = easeOut((t - 0.9) / 1.2);
      pulses.forEach((pulse, i) => {
        const frac = (t * pulse.speed + pulse.phase) % 1;
        const x = THREE.MathUtils.lerp(pulse.a.x, pulse.b.x, frac);
        const y = THREE.MathUtils.lerp(pulse.a.y, pulse.b.y, frac);
        const z = THREE.MathUtils.lerp(pulse.a.z, pulse.b.z, frac);
        attr.setXYZ(i, x, y, z);
      });
      attr.needsUpdate = true;
      (pulseRef.current.material as THREE.PointsMaterial).opacity = reveal * 0.9;
    }

    // Slow drift + subtle pointer parallax — the system feels alive, not spinning.
    if (groupRef.current) {
      const g = groupRef.current;
      g.rotation.y += 0.0009;
      const targetX = pointer.current.y * 0.12;
      g.rotation.x += (targetX - g.rotation.x) * 0.04;
      g.rotation.z += (pointer.current.x * 0.03 - g.rotation.z) * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Glow halos (additive, behind cores) */}
      <instancedMesh
        ref={haloRef}
        args={[undefined, undefined, graph.nodes.length]}
        frustumCulled={false}
      >
        <sphereGeometry args={[NODE_RADIUS, 12, 12]} />
        <meshBasicMaterial
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </instancedMesh>

      {/* Core nodes */}
      <instancedMesh
        ref={coreRef}
        args={[undefined, undefined, graph.nodes.length]}
        frustumCulled={false}
      >
        <sphereGeometry args={[NODE_RADIUS, 14, 14]} />
        <meshStandardMaterial
          emissive={COLORS.node}
          emissiveIntensity={0.9}
          metalness={0.1}
          roughness={0.5}
          toneMapped={false}
        />
      </instancedMesh>

      {/* Service connections (one draw call) */}
      <lineSegments ref={edgeRef} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[graph.edgePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={COLORS.edge}
          transparent
          opacity={0}
          depthWrite={false}
          toneMapped={false}
        />
      </lineSegments>

      {/* Data pulses */}
      <points ref={pulseRef} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[pulsePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          map={glint}
          color={COLORS.accentStrong}
          size={0.22}
          sizeAttenuation
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </points>
    </group>
  );
}

interface SystemGraphSceneProps {
  /** When false, the render loop is parked (off-screen) to save GPU. */
  active: boolean;
}

export default function SystemGraphScene({ active }: SystemGraphSceneProps) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7], fov: 42 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <fog attach="fog" args={[COLORS.bg, 6.5, 13]} />
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 6, 8]} intensity={1.4} />
      <Graph />
    </Canvas>
  );
}
