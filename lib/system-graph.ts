import * as THREE from "three";

/*
  Pure geometry for the hero "living architecture" graph.
  Deterministic (seeded) so the layout is stable and the scene file
  stays focused on rendering. No three rendering objects here —
  just positions and topology.
*/

export interface SystemGraph {
  nodes: THREE.Vector3[];
  /** Index of each node flagged as an accent ("intelligence") node. */
  accentNodes: Set<number>;
  /** Edges as index pairs [i, j] with i < j (deduped). */
  edges: Array<[number, number]>;
  /** Flat [x,y,z, x,y,z, ...] for a single LineSegments draw call. */
  edgePositions: Float32Array;
}

/** mulberry32 — tiny deterministic PRNG. */
function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface BuildOptions {
  count?: number;
  /** Nearest-neighbor links per node (edges may merge, so effective avg is lower). */
  neighbors?: number;
  /** Overall radius of the cloud. */
  radius?: number;
  /** Fraction of nodes rendered in accent color. */
  accentRatio?: number;
  seed?: number;
}

/**
 * Builds a loose distributed-systems graph: nodes spread on a
 * flattened ellipsoid (Fibonacci distribution + jitter), linked to
 * their nearest neighbors so the topology reads as a real network.
 */
export function buildSystemGraph({
  count = 22,
  neighbors = 2,
  radius = 2.6,
  accentRatio = 0.22,
  seed = 7,
}: BuildOptions = {}): SystemGraph {
  const random = rng(seed);
  const nodes: THREE.Vector3[] = [];

  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // 1 .. -1
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;

    const jitter = () => (random() - 0.5) * 0.5;
    const x = Math.cos(theta) * r * radius * 1.15 + jitter();
    const yy = y * radius * 0.72 + jitter();
    // Compress depth so the network reads as layered, not a ball.
    const z = Math.sin(theta) * r * radius * 0.85 + jitter();
    nodes.push(new THREE.Vector3(x, yy, z));
  }

  const accentNodes = new Set<number>();
  const accentTarget = Math.max(1, Math.round(count * accentRatio));
  while (accentNodes.size < accentTarget) {
    accentNodes.add(Math.floor(random() * count));
  }

  // Nearest-neighbor edges, deduped via i<j key set.
  const edgeKeys = new Set<string>();
  const edges: Array<[number, number]> = [];
  for (let i = 0; i < count; i++) {
    const dists: Array<{ j: number; d: number }> = [];
    for (let j = 0; j < count; j++) {
      if (j === i) continue;
      dists.push({ j, d: nodes[i].distanceToSquared(nodes[j]) });
    }
    dists.sort((a, b) => a.d - b.d);
    for (let k = 0; k < neighbors && k < dists.length; k++) {
      const j = dists[k].j;
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (edgeKeys.has(key)) continue;
      edgeKeys.add(key);
      edges.push(i < j ? [i, j] : [j, i]);
    }
  }

  const edgePositions = new Float32Array(edges.length * 6);
  edges.forEach(([a, b], e) => {
    edgePositions.set(
      [nodes[a].x, nodes[a].y, nodes[a].z, nodes[b].x, nodes[b].y, nodes[b].z],
      e * 6,
    );
  });

  return { nodes, accentNodes, edges, edgePositions };
}
