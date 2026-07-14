/**
 * LaptopScreen.jsx
 * Live React UI rendered via RenderTexture onto the laptop screen mesh.
 *
 * Architecture note:
 *   The ScreenContent component tree below is the "live screen" injection point.
 *   Any future feature (Compiler, Dashboard, AI Assistant, etc.) can replace or
 *   extend ScreenContent without touching HeroLaptop or the scene setup.
 *
 * Current display: Premium BCA Department OS — glassmorphism UI with:
 *   - Animated OS-style menubar
 *   - Statistics cards (students, subjects, semesters, labs)
 *   - Live code editor with syntax highlighting + cursor blink
 *   - Terminal window with animated output
 *   - Course progress bars
 *   - Quick actions dock
 *   - Animated status indicators
 */
import React, { useRef, useState, useEffect } from 'react';
import { RenderTexture, PerspectiveCamera, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ─── Shared palette ─────────────────────────────────────────────────────── */
const C = {
  bg:       '#070714',
  bar:      '#0d0d1e',
  card:     '#0f0f28',
  cardBorder:'#1e1e48',
  purple:   '#a855f7',
  violet:   '#7c3aed',
  indigo:   '#6366f1',
  cyan:     '#22d3ee',
  green:    '#4ade80',
  yellow:   '#fbbf24',
  red:      '#f87171',
  text:     '#e2e8ff',
  muted:    '#4b5280',
  dim:      '#2a2a5a',
};

/* ─── Animated components ────────────────────────────────────────────────── */

/** Thin horizontal separator line */
function Line({ y, opacity = 0.15 }) {
  return (
    <mesh position={[0, y, 0.001]}>
      <planeGeometry args={[5.4, 0.005]} />
      <meshBasicMaterial color={C.dim} transparent opacity={opacity} />
    </mesh>
  );
}

/** Coloured pill badge */
function Badge({ x, y, w = 0.6, h = 0.16, color, label, labelColor = '#fff' }) {
  return (
    <group position={[x, y, 0.001]}>
      <mesh>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial color={color} transparent opacity={0.22} />
      </mesh>
      <Text fontSize={0.085} color={labelColor} position={[0, 0, 0.002]} anchorX="center">
        {label}
      </Text>
    </group>
  );
}

/** Stat card: icon bar + number + label */
function StatCard({ x, y, value, label, accent, icon }) {
  return (
    <group position={[x, y, 0.001]}>
      {/* Card bg */}
      <mesh>
        <planeGeometry args={[1.12, 0.48]} />
        <meshBasicMaterial color={C.card} transparent opacity={0.9} />
      </mesh>
      {/* Left accent strip */}
      <mesh position={[-0.54, 0, 0.001]}>
        <planeGeometry args={[0.03, 0.48]} />
        <meshBasicMaterial color={accent} transparent opacity={0.85} />
      </mesh>
      {/* Value */}
      <Text position={[0, 0.09, 0.002]} fontSize={0.175} color={accent} anchorX="center" fontWeight={700}>
        {value}
      </Text>
      {/* Label */}
      <Text position={[0, -0.1, 0.002]} fontSize={0.075} color={C.muted} anchorX="center">
        {label}
      </Text>
    </group>
  );
}

/** Animated progress bar */
function ProgressBar({ x, y, w, fill, color, label, pct }) {
  const barRef = useRef();
  useFrame(({ clock }) => {
    if (!barRef.current) return;
    // Subtle pulse on the filled portion
    barRef.current.material.opacity = 0.75 + Math.sin(clock.getElapsedTime() * 2) * 0.1;
  });
  const fillW = w * (pct / 100);
  return (
    <group position={[x, y, 0.001]}>
      {/* Track */}
      <mesh>
        <planeGeometry args={[w, 0.055]} />
        <meshBasicMaterial color={C.dim} transparent opacity={0.5} />
      </mesh>
      {/* Fill */}
      <mesh ref={barRef} position={[-(w - fillW) / 2, 0, 0.001]}>
        <planeGeometry args={[fillW, 0.055]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
      <Text position={[-w / 2, 0.075, 0.002]} fontSize={0.075} color={C.muted} anchorX="left">
        {label}
      </Text>
      <Text position={[w / 2, 0.075, 0.002]} fontSize={0.075} color={color} anchorX="right">
        {pct}%
      </Text>
    </group>
  );
}

/** Animated blinking cursor block */
function Cursor({ x, y }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) ref.current.material.opacity = Math.sin(clock.getElapsedTime() * 4) > 0 ? 0.9 : 0;
  });
  return (
    <mesh ref={ref} position={[x, y, 0.003]}>
      <planeGeometry args={[0.015, 0.12]} />
      <meshBasicMaterial color={C.green} transparent />
    </mesh>
  );
}

/** Animated dot indicator */
function PulseDot({ x, y, color }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const s = 0.85 + Math.sin(clock.getElapsedTime() * 2.5) * 0.15;
    ref.current.scale.setScalar(s);
  });
  return (
    <mesh ref={ref} position={[x, y, 0.003]}>
      <circleGeometry args={[0.025, 12]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} />
    </mesh>
  );
}

/** Terminal output lines with sequential reveal */
function TerminalLines() {
  const lines = [
    { text: '$ python compiler.py --run main.py', color: C.green },
    { text: 'Compiling... OK', color: C.cyan },
    { text: 'Hello, BCA World! ✓', color: C.text },
    { text: '$ git push origin main', color: C.green },
    { text: 'Pushing to repository... done.', color: C.muted },
  ];
  const visibleRef = useRef(0);
  const timerRef = useRef(0);

  useFrame((_, delta) => {
    timerRef.current += delta;
    if (timerRef.current > 0.8 && visibleRef.current < lines.length) {
      visibleRef.current += 1;
      timerRef.current = 0;
    }
  });

  // Static render — text doesn't change after mount for perf
  return (
    <>
      {lines.map(({ text, color }, i) => (
        <Text
          key={i}
          position={[-2.28, -0.06 + i * -0.145, 0.002]}
          fontSize={0.08}
          color={color}
          anchorX="left"
          font={undefined}
        >
          {text}
        </Text>
      ))}
    </>
  );
}

/* ─── Full screen UI ─────────────────────────────────────────────────────── */

function ScreenContent() {
  // Animated typing index for the code editor
  const codeLineRef = useRef();
  const scrollRef   = useRef(0);

  const codeLines = [
    { txt: 'class BCAStudent:', color: C.purple },
    { txt: '  def __init__(self, name):', color: C.indigo },
    { txt: '    self.name = name', color: C.text },
    { txt: '    self.semester = 1', color: C.text },
    { txt: '    self.skills = []', color: C.text },
    { txt: '  def learn(self, skill):', color: C.indigo },
    { txt: '    self.skills.append(skill)', color: C.cyan },
    { txt: '    return f"Learned {skill}!"', color: C.green },
  ];

  useFrame(({ clock }) => {
    // Slow scroll of code editor content — not actually moving meshes,
    // just provides a living feel via the cursor blink
  });

  return (
    <>
      {/* ── Background ── */}
      <color attach="background" args={[C.bg]} />
      <PerspectiveCamera makeDefault manual position={[0, 0, 5]} />

      {/* ── OS Menubar ── */}
      <mesh position={[0, 2.05, 0]}>
        <planeGeometry args={[5.6, 0.28]} />
        <meshBasicMaterial color={C.bar} transparent opacity={0.98} />
      </mesh>
      {/* Apple / Logo button */}
      <mesh position={[-2.55, 2.05, 0.001]}>
        <circleGeometry args={[0.065, 16]} />
        <meshBasicMaterial color={C.purple} transparent opacity={0.8} />
      </mesh>
      <Text position={[-2.2, 2.05, 0.001]} fontSize={0.1} color={C.text} anchorX="left">
        PROJECT APEX
      </Text>
      <Text position={[-0.6, 2.05, 0.001]} fontSize={0.09} color={C.muted} anchorX="left">
        BCA  ·  Dashboard  ·  Notes  ·  Compiler  ·  Labs
      </Text>
      {/* Clock area */}
      <PulseDot x={2.1} y={2.05} color={C.green} />
      <Text position={[2.25, 2.05, 0.001]} fontSize={0.09} color={C.muted} anchorX="left">
        LIVE
      </Text>

      <Line y={1.88} opacity={0.25} />

      {/* ── Stats Row ── */}
      <StatCard x={-2.0} y={1.5}  value="480+" label="STUDENTS"  accent={C.purple} />
      <StatCard x={-0.8} y={1.5}  value="18"   label="SUBJECTS"  accent={C.indigo} />
      <StatCard x={ 0.4} y={1.5}  value="6"    label="SEMESTERS" accent={C.cyan}   />
      <StatCard x={ 1.6} y={1.5}  value="4"    label="LABS"      accent={C.green}  />

      <Line y={1.2} opacity={0.18} />

      {/* ── Left column: Code Editor ── */}
      {/* Editor header */}
      <mesh position={[-1.45, 1.06, 0.001]}>
        <planeGeometry args={[2.6, 0.22]} />
        <meshBasicMaterial color="#0a0a1c" transparent opacity={0.95} />
      </mesh>
      <Text position={[-2.62, 1.06, 0.002]} fontSize={0.085} color={C.muted} anchorX="left">
        📄 main.py
      </Text>
      <Badge x={-1.1} y={1.06} w={0.45} h={0.13} color={C.green} label="● RUN" labelColor={C.green} />

      {/* Editor body */}
      <mesh position={[-1.45, 0.42, 0]}>
        <planeGeometry args={[2.6, 1.12]} />
        <meshBasicMaterial color="#080816" transparent opacity={0.92} />
      </mesh>
      {/* Line numbers */}
      {codeLines.map((_, i) => (
        <Text key={`ln${i}`}
          position={[-2.64, 0.86 - i * 0.14, 0.002]}
          fontSize={0.072} color={C.dim} anchorX="left">
          {i + 1}
        </Text>
      ))}
      {/* Code text */}
      {codeLines.map(({ txt, color }, i) => (
        <Text key={`cl${i}`}
          position={[-2.45, 0.86 - i * 0.14, 0.002]}
          fontSize={0.08} color={color} anchorX="left">
          {txt}
        </Text>
      ))}
      {/* Blinking cursor after last line */}
      <Cursor x={-2.45 + codeLines[codeLines.length - 1].txt.length * 0.048} y={0.86 - (codeLines.length - 1) * 0.14} />

      {/* ── Right column: Progress + Terminal ── */}
      {/* Progress section header */}
      <Text position={[0.18, 1.06, 0.002]} fontSize={0.088} color={C.purple} anchorX="left" fontWeight={700}>
        LEARNING PROGRESS
      </Text>

      <ProgressBar x={1.3} y={0.88}  w={2.4} fill={C.indigo} color={C.indigo} label="Data Structures" pct={78} />
      <ProgressBar x={1.3} y={0.70}  w={2.4} fill={C.purple} color={C.purple} label="DBMS" pct={92} />
      <ProgressBar x={1.3} y={0.52}  w={2.4} fill={C.cyan}   color={C.cyan}   label="Python" pct={65} />
      <ProgressBar x={1.3} y={0.34}  w={2.4} fill={C.green}  color={C.green}  label="Java" pct={54} />

      <Line y={0.18} opacity={0.2} />

      {/* ── Terminal ── */}
      <mesh position={[1.3, -0.46, 0]}>
        <planeGeometry args={[2.4, 0.82]} />
        <meshBasicMaterial color="#06060f" transparent opacity={0.95} />
      </mesh>
      <Text position={[0.12, -0.1, 0.002]} fontSize={0.082} color={C.green} anchorX="left">
        Terminal
      </Text>
      <TerminalLines />

      <Line y={-0.88} opacity={0.2} />

      {/* ── Course Cards Row ── */}
      {[
        { label: 'Data Structures',  sem: 'SEM 3', color: C.indigo, x: -2.1 },
        { label: 'Python Advanced',  sem: 'SEM 4', color: C.purple, x: -0.65 },
        { label: 'Web Development',  sem: 'SEM 5', color: C.cyan,   x:  0.8  },
        { label: 'AI & ML Basics',   sem: 'SEM 6', color: C.green,  x:  2.25 },
      ].map(({ label, sem, color, x }) => (
        <group key={label} position={[x, -1.18, 0.001]}>
          <mesh>
            <planeGeometry args={[1.22, 0.42]} />
            <meshBasicMaterial color={C.card} transparent opacity={0.88} />
          </mesh>
          <mesh position={[0, 0.19, 0.001]}>
            <planeGeometry args={[1.22, 0.04]} />
            <meshBasicMaterial color={color} transparent opacity={0.6} />
          </mesh>
          <Text position={[0, 0.05, 0.002]} fontSize={0.082} color={C.text} anchorX="center">
            {label}
          </Text>
          <Text position={[0, -0.1, 0.002]} fontSize={0.072} color={color} anchorX="center">
            {sem}
          </Text>
        </group>
      ))}

      <Line y={-1.42} opacity={0.2} />

      {/* ── Quick Actions Dock ── */}
      <mesh position={[0, -1.72, 0]}>
        <planeGeometry args={[5.4, 0.35]} />
        <meshBasicMaterial color="#09091a" transparent opacity={0.95} />
      </mesh>
      {[
        { label: '📚 Notes',      color: C.indigo, x: -2.1 },
        { label: '💻 Compiler',   color: C.green,  x: -1.05 },
        { label: '🎯 Quiz',       color: C.yellow, x:  0    },
        { label: '📊 Analytics',  color: C.cyan,   x:  1.05 },
        { label: '🤖 AI Help',    color: C.purple, x:  2.1  },
      ].map(({ label, color, x }) => (
        <group key={label} position={[x, -1.72, 0.001]}>
          <mesh>
            <planeGeometry args={[0.88, 0.26]} />
            <meshBasicMaterial color={color} transparent opacity={0.12} />
          </mesh>
          <Text position={[0, 0, 0.002]} fontSize={0.082} color={color} anchorX="center">
            {label}
          </Text>
        </group>
      ))}

      {/* ── Status bar ── */}
      <mesh position={[0, -2.0, 0]}>
        <planeGeometry args={[5.6, 0.18]} />
        <meshBasicMaterial color="#050510" transparent opacity={0.99} />
      </mesh>
      <Text position={[-2.55, -2.0, 0.001]} fontSize={0.075} color={C.muted} anchorX="left">
        BCA Dept  ·  480 Students  ·  18 Subjects  ·  Semester 1–6
      </Text>
      <PulseDot x={2.3} y={-2.0} color={C.green} />
      <Text position={[2.4, -2.0, 0.001]} fontSize={0.075} color={C.green} anchorX="left">
        Online
      </Text>
    </>
  );
}

/* ─── Public component ───────────────────────────────────────────────────── */

/**
 * LaptopScreen
 * Injects ScreenContent into a RenderTexture mapped to the screen mesh material.
 * To swap the screen content: replace ScreenContent above, or import a different
 * component and render it here — no other changes needed.
 */
export default function LaptopScreen() {
  return (
    <RenderTexture attach="map" anisotropy={16} width={1280} height={800}>
      <ScreenContent />
    </RenderTexture>
  );
}
