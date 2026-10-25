"use client";

import { ContactShadows, Float, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// A stylised developer at a desk, built entirely from primitives so nothing is
// downloaded at runtime: hoodie, headphones and glasses, typing on a laptop,
// with holographic code panels floating around. The head follows the pointer.

const C = {
  skin: "#c98d6a",
  hair: "#1b1220",
  hoodie: "#1e2a47",
  hoodieDark: "#16203a",
  cyan: "#22d3ee",
  violet: "#8b5cf6",
  desk: "#0f172a",
  metal: "#334155",
};

const codeLines: [string, string][] = [
  ["const ", "#c4b5fd"],
  ["workflow = defineWorkflow({", "#e2e8f0"],
  ["  steps: [\"submit\", \"review\", \"approve\"],", "#67e8f9"],
  ["  roles: [\"engineer\", \"manager\"],", "#67e8f9"],
  ["});", "#e2e8f0"],
  ["", ""],
  ["await api.post(\"/reports\", daily);", "#86efac"],
  ["", ""],
  ["SELECT unit, SUM(qty)", "#fcd34d"],
  ["  FROM report_cells", "#fcd34d"],
  [" GROUP BY unit;", "#fcd34d"],
  ["", ""],
  ["@Get(\"tags/:tag\")", "#c4b5fd"],
  ["resolve(@Param(\"tag\") t: string) {", "#e2e8f0"],
  ["  return this.tags.parse(t);", "#67e8f9"],
  ["}", "#e2e8f0"],
];

/** Scrolling code drawn into a canvas, used as a glowing texture. */
function useCodeTexture(animate: boolean) {
  const { canvas, texture } = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 320;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return { canvas, texture };
  }, []);

  const offset = useRef(0);
  const last = useRef(0);

  const draw = () => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "rgba(4, 10, 20, 0.92)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(34, 211, 238, 0.6)";
    ctx.lineWidth = 3;
    ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);
    ctx.font = "20px Consolas, 'Courier New', monospace";
    const lh = 26;
    const start = Math.floor(offset.current);
    for (let i = 0; i < 12; i++) {
      const [text, color] = codeLines[(start + i) % codeLines.length];
      const y = 34 + i * lh;
      ctx.fillStyle = "rgba(100, 116, 139, 0.8)";
      ctx.fillText(String(((start + i) % codeLines.length) + 1).padStart(2, " "), 14, y);
      ctx.fillStyle = color || "#e2e8f0";
      ctx.fillText(text, 54, y);
    }
    const blink = Math.floor(performance.now() / 500) % 2 === 0;
    if (blink) {
      ctx.fillStyle = "#00f0ff";
      ctx.fillRect(54, 34 + 11 * lh - 18, 11, 22);
    }
    texture.needsUpdate = true;
  };

  useEffect(draw, []); // eslint-disable-line react-hooks/exhaustive-deps

  useFrame((_, dt) => {
    if (!animate) return;
    last.current += dt;
    if (last.current < 0.12) return;
    last.current = 0;
    offset.current += 0.25;
    draw();
  });

  return texture;
}

/** A glyph such as </> drawn into a canvas, for the floating panels. */
function useGlyphTexture(glyph: string, color: string) {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "rgba(4, 10, 20, 0.85)";
      ctx.beginPath();
      ctx.roundRect(8, 8, 240, 240, 36);
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 6;
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 24;
      ctx.font = "bold 96px Consolas, 'Courier New', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(glyph, 128, 136);
    }
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, [glyph, color]);
}

function Developer({ animate, pointer }: { animate: boolean; pointer: React.RefObject<{ x: number; y: number }> }) {
  const head = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const leftHand = useRef<THREE.Group>(null);
  const rightHand = useRef<THREE.Group>(null);
  const eyes = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const p = pointer.current ?? { x: 0, y: 0 };
    if (head.current) {
      const ty = animate ? p.x * 0.55 : 0.25;
      const tx = animate ? -p.y * 0.25 + Math.sin(t * 1.3) * 0.03 : 0.08;
      head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, ty, 0.08);
      head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, tx, 0.08);
    }
    if (!animate) return;
    if (body.current) body.current.position.y = Math.sin(t * 1.6) * 0.012;
    if (leftHand.current) leftHand.current.position.y = Math.max(0, Math.sin(t * 13)) * 0.035;
    if (rightHand.current) rightHand.current.position.y = Math.max(0, Math.sin(t * 13 + 1.9)) * 0.035;
    if (eyes.current) {
      const blink = t % 4.2 < 0.12 ? 0.1 : 1;
      eyes.current.scale.y = blink;
    }
  });

  const hoodie = <meshStandardMaterial color={C.hoodie} roughness={0.85} />;
  const skin = <meshStandardMaterial color={C.skin} roughness={0.6} />;

  return (
    <group position={[0, 0, -0.2]}>
      {/* Chair */}
      <mesh position={[0, 0.52, -0.05]} castShadow>
        <cylinderGeometry args={[0.36, 0.36, 0.08, 32]} />
        <meshStandardMaterial color="#111827" roughness={0.5} />
      </mesh>
      <RoundedBox args={[0.7, 0.75, 0.08]} radius={0.04} position={[0, 0.98, -0.42]} rotation={[-0.12, 0, 0]}>
        <meshStandardMaterial color="#111827" roughness={0.5} />
      </RoundedBox>
      <mesh position={[0, 0.26, -0.05]}>
        <cylinderGeometry args={[0.04, 0.04, 0.48, 12]} />
        <meshStandardMaterial color={C.metal} metalness={0.6} roughness={0.3} />
      </mesh>

      <group ref={body}>
        {/* Legs, mostly under the desk */}
        {[-0.13, 0.13].map((x) => (
          <group key={x}>
            <mesh position={[x, 0.6, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
              <capsuleGeometry args={[0.09, 0.3, 6, 16]} />
              <meshStandardMaterial color="#0b1222" roughness={0.9} />
            </mesh>
            <mesh position={[x, 0.36, 0.34]}>
              <capsuleGeometry args={[0.08, 0.3, 6, 16]} />
              <meshStandardMaterial color="#0b1222" roughness={0.9} />
            </mesh>
          </group>
        ))}

        {/* Torso in a hoodie */}
        <mesh position={[0, 0.95, -0.05]} castShadow>
          <capsuleGeometry args={[0.27, 0.36, 8, 24]} />
          {hoodie}
        </mesh>
        <mesh position={[0, 1.2, -0.15]} rotation={[0.3, 0, 0]}>
          <torusGeometry args={[0.2, 0.07, 12, 24, Math.PI]} />
          <meshStandardMaterial color={C.hoodieDark} roughness={0.9} />
        </mesh>
        {[-0.06, 0.06].map((x) => (
          <mesh key={x} position={[x, 1.02, 0.22]}>
            <cylinderGeometry args={[0.008, 0.008, 0.18, 6]} />
            <meshStandardMaterial color={C.cyan} emissive={C.cyan} emissiveIntensity={1.2} />
          </mesh>
        ))}
        {/* Logo on the chest */}
        <mesh position={[0, 0.98, 0.215]}>
          <circleGeometry args={[0.06, 24]} />
          <meshStandardMaterial color={C.violet} emissive={C.violet} emissiveIntensity={1.4} />
        </mesh>

        {/* Arms reaching to the keyboard */}
        {[
          { side: -1, ref: leftHand },
          { side: 1, ref: rightHand },
        ].map(({ side, ref }) => (
          <group key={side}>
            <mesh position={[side * 0.31, 1.0, 0.02]} rotation={[0.5, 0, side * 0.15]}>
              <capsuleGeometry args={[0.075, 0.26, 6, 16]} />
              {hoodie}
            </mesh>
            <mesh position={[side * 0.27, 0.86, 0.26]} rotation={[1.35, 0, side * -0.25]}>
              <capsuleGeometry args={[0.065, 0.26, 6, 16]} />
              {hoodie}
            </mesh>
            <group ref={ref}>
              <mesh position={[side * 0.17, 0.83, 0.44]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                {skin}
              </mesh>
            </group>
          </group>
        ))}

        {/* Head */}
        <group ref={head} position={[0, 1.42, -0.04]}>
          <mesh position={[0, -0.14, 0]}>
            <cylinderGeometry args={[0.07, 0.08, 0.12, 16]} />
            {skin}
          </mesh>
          <mesh castShadow>
            <sphereGeometry args={[0.25, 32, 32]} />
            {skin}
          </mesh>
          {/* Hair cap and bun */}
          <mesh position={[0, 0.05, -0.03]} scale={[1.06, 0.95, 1.06]}>
            <sphereGeometry args={[0.25, 32, 32, 0, Math.PI * 2, 0, Math.PI / 1.9]} />
            <meshStandardMaterial color={C.hair} roughness={0.7} />
          </mesh>
          <mesh position={[0, -0.02, -0.17]} scale={[1.05, 1.1, 0.7]}>
            <sphereGeometry args={[0.24, 24, 24]} />
            <meshStandardMaterial color={C.hair} roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.2, -0.2]}>
            <sphereGeometry args={[0.1, 20, 20]} />
            <meshStandardMaterial color={C.hair} roughness={0.7} />
          </mesh>

          {/* Eyes */}
          <group ref={eyes} position={[0, 0.0, 0.22]}>
            {[-0.085, 0.085].map((x) => (
              <mesh key={x} position={[x, 0, 0]}>
                <sphereGeometry args={[0.026, 12, 12]} />
                <meshStandardMaterial color="#0b0b12" />
              </mesh>
            ))}
          </group>
          {/* Smile */}
          <mesh position={[0, -0.1, 0.225]} rotation={[0, 0, Math.PI]}>
            <torusGeometry args={[0.045, 0.008, 8, 16, Math.PI]} />
            <meshStandardMaterial color="#7c2d12" />
          </mesh>

          {/* Glasses */}
          <group position={[0, 0.0, 0.245]}>
            {[-0.085, 0.085].map((x) => (
              <mesh key={x} position={[x, 0, 0]}>
                <torusGeometry args={[0.058, 0.009, 8, 28]} />
                <meshStandardMaterial color="#0f172a" emissive={C.cyan} emissiveIntensity={0.35} metalness={0.5} />
              </mesh>
            ))}
            <mesh>
              <boxGeometry args={[0.05, 0.01, 0.01]} />
              <meshStandardMaterial color="#0f172a" />
            </mesh>
          </group>

          {/* Headphones */}
          <mesh position={[0, 0.02, -0.01]} rotation={[0, 0, 0]}>
            <torusGeometry args={[0.28, 0.022, 10, 40, Math.PI]} />
            <meshStandardMaterial color="#0f172a" metalness={0.4} roughness={0.4} />
          </mesh>
          {[-1, 1].map((s) => (
            <group key={s} position={[s * 0.27, -0.01, -0.01]} rotation={[0, 0, (s * Math.PI) / 2]}>
              <mesh>
                <cylinderGeometry args={[0.085, 0.085, 0.07, 24]} />
                <meshStandardMaterial color="#0f172a" metalness={0.4} roughness={0.4} />
              </mesh>
              <mesh position={[0, s * 0.037, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.06, 0.008, 8, 28]} />
                <meshStandardMaterial color={C.cyan} emissive={C.cyan} emissiveIntensity={2} />
              </mesh>
            </group>
          ))}
        </group>
      </group>
    </group>
  );
}

function Desk({ animate }: { animate: boolean }) {
  const steam = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!animate || !steam.current) return;
    const t = clock.getElapsedTime();
    steam.current.children.forEach((c, i) => {
      const k = (t * 0.35 + i / 3) % 1;
      c.position.y = k * 0.25;
      c.scale.setScalar(0.6 + k);
      ((c as THREE.Mesh).material as THREE.MeshStandardMaterial).opacity = 0.35 * (1 - k);
    });
  });

  return (
    <group>
      <RoundedBox args={[2.1, 0.07, 0.95]} radius={0.025} position={[0, 0.78, 0.45]} receiveShadow castShadow>
        <meshStandardMaterial color={C.desk} roughness={0.45} metalness={0.2} />
      </RoundedBox>
      {/* Glowing front edge */}
      <mesh position={[0, 0.78, 0.93]}>
        <boxGeometry args={[2.1, 0.012, 0.012]} />
        <meshStandardMaterial color={C.cyan} emissive={C.cyan} emissiveIntensity={2.5} />
      </mesh>
      {[-0.95, 0.95].map((x) => (
        <mesh key={x} position={[x, 0.38, 0.45]}>
          <boxGeometry args={[0.05, 0.76, 0.8]} />
          <meshStandardMaterial color="#0b1220" roughness={0.5} />
        </mesh>
      ))}

      {/* Laptop, screen facing the developer */}
      <group position={[0, 0.82, 0.5]}>
        <RoundedBox args={[0.62, 0.025, 0.42]} radius={0.01}>
          <meshStandardMaterial color="#1f2937" metalness={0.7} roughness={0.3} />
        </RoundedBox>
        <group position={[0, 0.0, 0.2]} rotation={[-1.85, 0, 0]}>
          <RoundedBox args={[0.62, 0.02, 0.4]} radius={0.01} position={[0, 0, 0.2]}>
            <meshStandardMaterial color="#1f2937" metalness={0.7} roughness={0.3} />
          </RoundedBox>
          {/* Glowing logo on the lid, facing the camera */}
          <mesh position={[0, 0.012, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.05, 24]} />
            <meshStandardMaterial color={C.cyan} emissive={C.cyan} emissiveIntensity={2} side={THREE.DoubleSide} />
          </mesh>
        </group>
        {/* Light spilling from the screen onto the face */}
        <pointLight position={[0, 0.25, -0.1]} color={C.cyan} intensity={1.6} distance={1.4} />
      </group>

      {/* Mug with steam */}
      <group position={[0.72, 0.82, 0.55]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.07, 0.06, 0.15, 24]} />
          <meshStandardMaterial color={C.violet} emissive={C.violet} emissiveIntensity={0.35} roughness={0.4} />
        </mesh>
        <mesh position={[0.075, 0.01, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.04, 0.012, 8, 16]} />
          <meshStandardMaterial color={C.violet} roughness={0.4} />
        </mesh>
        <group ref={steam} position={[0, 0.1, 0]}>
          {[0, 1, 2].map((i) => (
            <mesh key={i}>
              <sphereGeometry args={[0.025, 10, 10]} />
              <meshStandardMaterial color="#e2e8f0" transparent opacity={0.25} />
            </mesh>
          ))}
        </group>
      </group>

      {/* Plant */}
      <group position={[-0.78, 0.82, 0.62]}>
        <mesh>
          <cylinderGeometry args={[0.07, 0.055, 0.12, 16]} />
          <meshStandardMaterial color="#334155" roughness={0.6} />
        </mesh>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i} position={[Math.sin(i * 1.3) * 0.04, 0.13 + (i % 2) * 0.04, Math.cos(i * 1.3) * 0.04]} rotation={[Math.sin(i) * 0.5, i, Math.cos(i) * 0.5]}>
            <sphereGeometry args={[0.05, 10, 10]} />
            <meshStandardMaterial color="#22c55e" emissive="#16a34a" emissiveIntensity={0.3} roughness={0.6} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Holograms({ animate }: { animate: boolean }) {
  const code = useCodeTexture(animate);
  const tagTex = useGlyphTexture("</>", C.cyan);
  const braceTex = useGlyphTexture("{ }", "#a855f7");
  const atom = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    if (animate && atom.current) atom.current.rotation.y += dt * 0.8;
  });

  const speed = animate ? 1.6 : 0;
  return (
    <group>
      <Float speed={speed} rotationIntensity={0.25} floatIntensity={0.5}>
        <mesh position={[1.0, 1.7, 0.1]} rotation={[0, -0.45, 0]}>
          <planeGeometry args={[1.15, 0.72]} />
          <meshBasicMaterial map={code} transparent opacity={0.95} toneMapped={false} side={THREE.DoubleSide} />
        </mesh>
      </Float>
      <Float speed={speed * 1.2} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh position={[-1.25, 1.95, 0.1]} rotation={[0, 0.5, 0]}>
          <planeGeometry args={[0.5, 0.5]} />
          <meshBasicMaterial map={tagTex} transparent toneMapped={false} side={THREE.DoubleSide} />
        </mesh>
      </Float>
      <Float speed={speed * 0.9} rotationIntensity={0.5} floatIntensity={0.7}>
        <mesh position={[-1.05, 1.2, 0.75]} rotation={[0, 0.6, 0]}>
          <planeGeometry args={[0.38, 0.38]} />
          <meshBasicMaterial map={braceTex} transparent toneMapped={false} side={THREE.DoubleSide} />
        </mesh>
      </Float>
      <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.6}>
        <group ref={atom} position={[0.1, 2.12, -0.3]} scale={0.5}>
          <mesh>
            <sphereGeometry args={[0.09, 20, 20]} />
            <meshStandardMaterial color={C.cyan} emissive={C.cyan} emissiveIntensity={2.5} />
          </mesh>
          {[0, Math.PI / 3, (2 * Math.PI) / 3].map((r) => (
            <mesh key={r} rotation={[Math.PI / 2, r, 0]} scale={[1, 0.38, 1]}>
              <torusGeometry args={[0.4, 0.012, 8, 64]} />
              <meshStandardMaterial color={C.cyan} emissive={C.cyan} emissiveIntensity={1.8} />
            </mesh>
          ))}
        </group>
      </Float>
    </group>
  );
}

function Platform({ animate }: { animate: boolean }) {
  const ring = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (animate && ring.current) ring.current.rotation.z += dt * 0.25;
  });
  return (
    <group position={[0, 0.001, 0.2]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[1.7, 64]} />
        <meshStandardMaterial color="#070b14" roughness={0.9} />
      </mesh>
      <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, 0]}>
        <ringGeometry args={[1.62, 1.68, 96, 1, 0, Math.PI * 1.6]} />
        <meshBasicMaterial color={C.cyan} toneMapped={false} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <ringGeometry args={[1.45, 1.47, 96]} />
        <meshBasicMaterial color={C.violet} transparent opacity={0.6} toneMapped={false} />
      </mesh>
    </group>
  );
}

export default function DeveloperScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [inView, setInView] = useState(true);
  const animate = useMemo(() => typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);

  // Track the pointer across the whole window, so the developer looks toward
  // the visitor's cursor anywhere on the hero, not only over the canvas.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      pointer.current.x = THREE.MathUtils.clamp(((e.clientX - r.left) / r.width) * 2 - 1, -1.5, 1.5);
      pointer.current.y = THREE.MathUtils.clamp(((e.clientY - r.top) / r.height) * 2 - 1, -1.5, 1.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting));
    if (wrap.current) io.observe(wrap.current);
    return () => {
      window.removeEventListener("pointermove", onMove);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={wrap} className="dev3d__canvas">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [2.5, 2.25, 4.0], fov: 36 }}
        frameloop={!animate ? "demand" : inView ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ camera }) => camera.lookAt(0, 1.3, 0.2)}
      >
        <ambientLight intensity={0.5} />
        {/* Soft fill from the viewer, so the face is never lost in shadow */}
        <pointLight position={[1.6, 1.9, 2.6]} color="#e0f2fe" intensity={2.2} distance={6} />
        <directionalLight position={[3, 5, 4]} intensity={1.1} castShadow shadow-mapSize={[1024, 1024]} />
        <pointLight position={[-2.5, 2.5, -1.5]} color={C.violet} intensity={6} distance={7} />
        <pointLight position={[2.5, 1.2, 2]} color={C.cyan} intensity={3} distance={6} />
        <group rotation={[0, -0.35, 0]}>
          <Platform animate={animate} />
          <Desk animate={animate} />
          <Developer animate={animate} pointer={pointer} />
          <Holograms animate={animate} />
        </group>
        <ContactShadows position={[0, 0.002, 0.2]} opacity={0.6} scale={5} blur={2.4} far={2} />
      </Canvas>
    </div>
  );
}

