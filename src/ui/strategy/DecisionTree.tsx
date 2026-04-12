// import { useState, useEffect } from 'react';
// import { Play, Pause, RotateCcw, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';
// import type { DecisionTreeNode } from '../../strategy/strategyEngine';

// interface DecisionTreeProps {
//   tree: DecisionTreeNode;
//   usePruning: boolean;
// }

// export function DecisionTree({ tree, usePruning }: DecisionTreeProps) {
//   const [animationStep, setAnimationStep] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [speed, setSpeed] = useState(1000);
//   const [isFullscreen, setIsFullscreen] = useState(false);

//   const [flattenedNodes, setFlattenedNodes] = useState<DecisionTreeNode[]>([]);

//   useEffect(() => {
//     const nodes: DecisionTreeNode[] = [];

//     function flatten(node: DecisionTreeNode) {
//       nodes.push(node);
//       node.children.forEach(child => flatten(child));
//     }

//     flatten(tree);
//     nodes.sort((a, b) => a.evaluationOrder - b.evaluationOrder);
//     setFlattenedNodes(nodes);
//   }, [tree]);

//   useEffect(() => {
//     setAnimationStep(0);
//     setIsPlaying(false);
//   }, [usePruning]);

//   useEffect(() => {
//     if (!isPlaying) return;

//     if (animationStep >= flattenedNodes.length - 1) {
//       setIsPlaying(false);
//       return;
//     }

//     const timer = setTimeout(() => {
//       setAnimationStep(prev => prev + 1);
//     }, speed);

//     return () => clearTimeout(timer);
//   }, [isPlaying, animationStep, flattenedNodes.length, speed]);

//   const currentNode = flattenedNodes[animationStep];
//   const visitedNodes = new Set(flattenedNodes.slice(0, animationStep + 1).map(n => n.id));

//   return (
//     <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-black p-6' : 'tactical-panel p-6'} space-y-6`}>

//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <h3 className="text-lg font-bold text-green-400">
//           DECISION TREE VISUALIZATION
//         </h3>

//         <button
//           onClick={() => setIsFullscreen(!isFullscreen)}
//           className="p-2 bg-gray-800 rounded hover:bg-gray-700"
//         >
//           {isFullscreen ? <Minimize2 /> : <Maximize2 />}
//         </button>
//       </div>

//       {/* CONTROLS */}
//       <div className="flex gap-3 items-center flex-wrap">

//         <button onClick={() => setIsPlaying(!isPlaying)} className="btn">
//           {isPlaying ? <Pause /> : <Play />}
//         </button>

//         <button onClick={() => {
//           setAnimationStep(0);
//           setIsPlaying(false);
//         }} className="btn">
//           <RotateCcw />
//         </button>

//         <button
//           onClick={() => setAnimationStep(s => Math.min(s + 1, flattenedNodes.length - 1))}
//           className="btn"
//         >
//           <ChevronRight />
//         </button>

//         <select
//           value={speed}
//           onChange={(e) => setSpeed(Number(e.target.value))}
//           className="bg-gray-800 px-2 py-1 rounded"
//         >
//           <option value={2000}>Slow</option>
//           <option value={1000}>Normal</option>
//           <option value={500}>Fast</option>
//         </select>
//       </div>

//       {/* TREE CONTAINER */}
//       <div className="w-full h-[70vh] flex items-center justify-center overflow-hidden">
//         {/* <div className="scale-[0.9] origin-top"> */}
//         <div className="scale-[0.75] md:scale-[0.9] origin-top">
//           <TreeNode
//             node={tree}
//             visitedNodes={visitedNodes}
//             currentNodeId={currentNode?.id}
//             usePruning={usePruning}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= TREE NODE ================= */

// function TreeNode({
//   node,
//   visitedNodes,
//   currentNodeId,
//   usePruning
// }: {
//   node: DecisionTreeNode;
//   visitedNodes: Set<string>;
//   currentNodeId?: string;
//   usePruning: boolean;
// }) {

//   const isVisited = visitedNodes.has(node.id);
//   const isCurrent = node.id === currentNodeId;
//   const isPruned = usePruning && node.isPruned;

//   return (
//     <div className="flex flex-col items-center relative">

//       {/* NODE */}
//       <div
//         className={`
//           px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg
//           ${isCurrent ? 'ring-2 ring-green-400 scale-110' : ''}
//           ${
//             isPruned
//               ? 'bg-orange-500/30 text-orange-200'
//               : isVisited
//               ? node.isMaximizing
//                 ? 'bg-blue-500/30 text-blue-200'
//                 : 'bg-red-500/30 text-red-200'
//               : 'bg-gray-700 text-gray-400'
//           }
//         `}
//       >
//         {node.action || 'ROOT'}

//         {isVisited && !isPruned && (
//           <div className="text-[10px] mt-1">
//             {Math.round(node.score)}
//           </div>
//         )}
//       </div>

//       {/* CHILDREN */}
//       {node.children.length > 0 && (
//         <div className="flex flex-col items-center mt-4">

//           {/* vertical line */}
//           <div className="w-px h-6 bg-gray-500" />

//           {/* children row */}
//           {/* <div className="flex justify-center gap-16 relative"> */}
//             <div className="flex justify-center gap-6 md:gap-10 relative">

//             {/* horizontal line */}
//             <div className="absolute top-0 left-0 right-0 h-px bg-gray-500" />

//             {node.children.map(child => (
//               <div key={child.id} className="flex flex-col items-center">

//                 <div className="w-px h-6 bg-gray-500" />

//                 <TreeNode
//                   node={child}
//                   visitedNodes={visitedNodes}
//                   currentNodeId={currentNodeId}
//                   usePruning={usePruning}
//                 />
//               </div>
//             ))}

//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Maximize2, Minimize2, Target } from 'lucide-react';
import type { DecisionTreeNode } from '../../strategy/strategyEngine';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface LayoutNode extends Omit<DecisionTreeNode, 'children'> {
  lx: number;           // computed layout x (center)
  ly: number;           // computed layout y (top)
  lw: number;           // computed subtree width
  children: LayoutNode[]; // override so the whole tree is LayoutNode[]
}

interface DecisionTreeProps {
  tree: DecisionTreeNode;
  usePruning: boolean;
}

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────
const NODE_W   = 88;
const NODE_H   = 44;
const V_GAP    = 70;
const H_GAP    = 18;
const FIT_PAD  = 52;

// ─────────────────────────────────────────────
// Layout engine  (runs outside React render)
// ─────────────────────────────────────────────
function cloneLayout(node: DecisionTreeNode): LayoutNode {
  return {
    ...node,
    lx: 0, ly: 0, lw: NODE_W,
    children: node.children.map(cloneLayout),
  } as LayoutNode;
}

function measureWidths(node: LayoutNode): void {
  if (!node.children.length) { node.lw = NODE_W; return; }
  node.children.forEach(measureWidths);
  const total = node.children.reduce((s, c) => s + c.lw, 0)
              + (node.children.length - 1) * H_GAP;
  node.lw = Math.max(NODE_W, total);
}

function assignPositions(node: LayoutNode, ox: number, oy: number): void {
  node.ly = oy;
  if (!node.children.length) { node.lx = ox + node.lw / 2; return; }
  let cx = ox;
  node.children.forEach(child => {
    assignPositions(child, cx, oy + NODE_H + V_GAP);
    cx += child.lw + H_GAP;
  });
  const first = node.children[0];
  const last  = node.children[node.children.length - 1];
  node.lx = (first.lx + last.lx) / 2;
}

function flattenByEvalOrder(node: LayoutNode, out: LayoutNode[] = []): LayoutNode[] {
  out.push(node);
  node.children.forEach(c => flattenByEvalOrder(c, out));
  out.sort((a, b) => a.evaluationOrder - b.evaluationOrder);
  return out;
}

function treeBounds(node: LayoutNode): { minX: number; maxX: number; minY: number; maxY: number } {
  let minX = node.lx - NODE_W / 2, maxX = node.lx + NODE_W / 2;
  let minY = node.ly, maxY = node.ly + NODE_H;
  node.children.forEach(c => {
    const b = treeBounds(c);
    minX = Math.min(minX, b.minX); maxX = Math.max(maxX, b.maxX);
    minY = Math.min(minY, b.minY); maxY = Math.max(maxY, b.maxY);
  });
  return { minX, maxX, minY, maxY };
}

// ─────────────────────────────────────────────
// Draw helpers
// ─────────────────────────────────────────────
function hexToRgba(hex: string, a: number) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${a})`;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────
export function DecisionTree({ tree, usePruning }: DecisionTreeProps) {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const wrapRef     = useRef<HTMLDivElement>(null);
  const panRef      = useRef({ x: 0, y: 0 });
  const zoomRef     = useRef(1);
  const dragRef     = useRef({ active: false, sx: 0, sy: 0 });
  const rafRef      = useRef<number>(0);
  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [layoutRoot, setLayoutRoot]   = useState<LayoutNode | null>(null);
  const [flatNodes,  setFlatNodes]    = useState<LayoutNode[]>([]);
  const [animStep,   setAnimStep]     = useState(0);
  const [visited,    setVisited]      = useState<Set<string>>(new Set());
  const [currentId,  setCurrentId]    = useState<string>('');
  const [playing,    setPlaying]      = useState(false);
  const [speed,      setSpeed]        = useState(900);
  const [fullscreen, setFullscreen]   = useState(false);
  const [zoomLevel,  setZoomLevel]    = useState(1);

  // ── Build layout whenever tree/pruning changes ────────────────
  useEffect(() => {
    const root = cloneLayout(tree);
    measureWidths(root);
    assignPositions(root, 0, 0);
    const flat = flattenByEvalOrder(root);
    setLayoutRoot(root);
    setFlatNodes(flat);
    setAnimStep(0);
    setVisited(new Set([flat[0]?.id ?? '']));
    setCurrentId(flat[0]?.id ?? '');
    setPlaying(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, [tree, usePruning]);

  // ── Fit view after layout ────────────────────────────────────
  const fitView = useCallback(() => {
    if (!layoutRoot || !canvasRef.current) return;
    const cv  = canvasRef.current;
    const b   = treeBounds(layoutRoot);
    const tw  = b.maxX - b.minX;
    const th  = b.maxY - b.minY;
    const cw  = cv.width  - FIT_PAD * 2;
    const ch  = cv.height - FIT_PAD * 2;
    const z   = Math.min(cw / tw, ch / th, 1.6);
    panRef.current.x = FIT_PAD - b.minX * z + (cw - tw * z) / 2;
    panRef.current.y = FIT_PAD - b.minY * z + (ch - th * z) / 2;
    zoomRef.current = z;
    setZoomLevel(z);
    schedDraw();
  }, [layoutRoot]);

  useEffect(() => { if (layoutRoot) setTimeout(fitView, 40); }, [layoutRoot, fitView]);

  // ── Canvas resize ────────────────────────────────────────────
  useEffect(() => {
    const obs = new ResizeObserver(() => {
      if (!canvasRef.current || !wrapRef.current) return;
      canvasRef.current.width  = wrapRef.current.clientWidth;
      canvasRef.current.height = wrapRef.current.clientHeight;
      schedDraw();
    });
    if (wrapRef.current) obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, []);

  // ── Draw ──────────────────────────────────────────────────────
  const schedDraw = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(draw);
  }, []);

  // Keep draw in a stable ref so canvas handlers can call it
  const stateRef = useRef({ visited, currentId, usePruning, layoutRoot });
  useEffect(() => {
    stateRef.current = { visited, currentId, usePruning, layoutRoot };
    schedDraw();
  }, [visited, currentId, usePruning, layoutRoot]);

  function draw() {
    const cv  = canvasRef.current;
    if (!cv) return;
    const gctx = cv.getContext('2d')!;
    if (!gctx) return;
    const { visited, currentId, usePruning, layoutRoot } = stateRef.current;
    const W = cv.width, H = cv.height;
    const pan = panRef.current, z = zoomRef.current;

    // Background grid
    gctx.clearRect(0, 0, W, H);
    gctx.fillStyle = '#0a0f0a';
    gctx.fillRect(0, 0, W, H);

    // Subtle dot grid
    const gridStep = 32 * z;
    const offX = ((pan.x % gridStep) + gridStep) % gridStep;
    const offY = ((pan.y % gridStep) + gridStep) % gridStep;
    gctx.fillStyle = 'rgba(100,160,90,0.06)';
    for (let gx = offX; gx < W; gx += gridStep)
      for (let gy = offY; gy < H; gy += gridStep)
        gctx.fillRect(gx - 1, gy - 1, 2, 2);

    if (!layoutRoot) return;

    function wx(lx: number) { return lx * z + pan.x; }
    function wy(ly: number) { return ly * z + pan.y; }

    // Draw edges first (back pass)
    function drawEdges(node: LayoutNode) {
      node.children.forEach(child => {
        const isPruned = usePruning && child.isPruned;
        const isVisited = visited.has(child.id);

        gctx.save();
        if (isPruned) {
          gctx.setLineDash([4 * z, 4 * z]);
          gctx.strokeStyle = 'rgba(245,158,11,0.3)';
          gctx.lineWidth = 1;
        } else if (isVisited) {
          gctx.setLineDash([]);
          gctx.strokeStyle = node.isMaximizing
            ? 'rgba(56,189,248,0.25)'
            : 'rgba(248,113,113,0.25)';
          gctx.lineWidth = Math.max(1, 1.5 * z);
        } else {
          gctx.setLineDash([]);
          gctx.strokeStyle = 'rgba(255,255,255,0.06)';
          gctx.lineWidth = Math.max(0.5, 0.8 * z);
        }

        const x1 = wx(node.lx), y1 = wy(node.ly + NODE_H);
        const x2 = wx(child.lx),   y2 = wy(child.ly);
        const mid = (y1 + y2) / 2;

        gctx.beginPath();
        gctx.moveTo(x1, y1);
        gctx.bezierCurveTo(x1, mid, x2, mid, x2, y2);
        gctx.stroke();
        gctx.restore();

        drawEdges(child);
      });
    }

    // Draw nodes (front pass)
    function drawNode(node: LayoutNode) {
      const isVisited = visited.has(node.id);
      const isCurrent = node.id === currentId;
      const isPruned  = usePruning && node.isPruned;
      const isMax     = node.isMaximizing;

      const nx = wx(node.lx - NODE_W / 2);
      const ny = wy(node.ly);
      const nw = NODE_W * z;
      const nh = NODE_H * z;
      const r  = 8 * z;

      // Glow for current node
      if (isCurrent) {
        gctx.save();
        gctx.shadowColor  = '#4ade80';
        gctx.shadowBlur   = 24 * z;
        roundRect(gctx, nx - 2, ny - 2, nw + 4, nh + 4, r + 2);
        gctx.fillStyle = 'rgba(74,222,128,0.1)';
        gctx.fill();
        gctx.restore();
      }

      // Node fill
      let fillColor: string, strokeColor: string, glowColor: string;
      if (isPruned) {
        fillColor   = '#1a0f00';
        strokeColor = '#f59e0b';
        glowColor   = '#f59e0b';
      } else if (!isVisited) {
        fillColor   = '#111814';
        strokeColor = 'rgba(255,255,255,0.08)';
        glowColor   = 'transparent';
      } else if (isCurrent) {
        fillColor   = '#0d2a12';
        strokeColor = '#4ade80';
        glowColor   = '#4ade80';
      } else if (isMax) {
        fillColor   = '#071929';
        strokeColor = '#38bdf8';
        glowColor   = '#38bdf8';
      } else {
        fillColor   = '#1f0505';
        strokeColor = '#f87171';
        glowColor   = '#f87171';
      }

      roundRect(gctx, nx, ny, nw, nh, r);
      gctx.fillStyle = fillColor;
      gctx.fill();

      // Accent top line
      if (isVisited && !isPruned) {
        gctx.save();
        gctx.beginPath();
        gctx.moveTo(nx + r, ny);
        gctx.lineTo(nx + nw - r, ny);
        gctx.strokeStyle = hexToRgba(strokeColor, 0.8);
        gctx.lineWidth   = 1.5;
        gctx.stroke();
        gctx.restore();
      }

      // Border
      roundRect(gctx, nx, ny, nw, nh, r);
      gctx.strokeStyle = strokeColor;
      gctx.lineWidth   = isCurrent ? 1.5 : 0.8;
      gctx.stroke();

      // Corner indicator dot
      if (isVisited && !isPruned && !isCurrent) {
        gctx.beginPath();
        gctx.arc(nx + nw - 6 * z, ny + 6 * z, 3 * z, 0, Math.PI * 2);
        gctx.fillStyle = hexToRgba(glowColor, 0.7);
        gctx.fill();
      }

      // Text
      const fMain = Math.max(9, 11 * z);
      const fSub  = Math.max(8, 9.5 * z);
      const cx    = nx + nw / 2;
      const cy    = ny + nh / 2;

      gctx.textAlign    = 'center';
      gctx.textBaseline = 'middle';

      if (isPruned) {
        gctx.font      = `600 ${fMain}px 'JetBrains Mono', 'Fira Code', monospace`;
        gctx.fillStyle = '#f59e0b';
        gctx.fillText('✂ PRUNED', cx, cy);
      } else if (!isVisited) {
        gctx.font      = `400 ${fMain}px 'JetBrains Mono', 'Fira Code', monospace`;
        gctx.fillStyle = 'rgba(255,255,255,0.2)';
        gctx.fillText(node.action || 'ROOT', cx, cy);
      } else {
        const label = node.action || 'ROOT';
        const score = Math.round(node.score);
        const scoreStr = (score > 0 ? '+' : '') + score;

        gctx.font      = `600 ${fSub}px 'JetBrains Mono', 'Fira Code', monospace`;
        gctx.fillStyle = isCurrent ? '#a0f0b0' : hexToRgba(strokeColor, 0.9);
        gctx.fillText(label, cx, cy - fSub * 0.65);

        gctx.font      = `700 ${fMain * 1.05}px 'JetBrains Mono', 'Fira Code', monospace`;
        gctx.fillStyle = isCurrent ? '#4ade80' : strokeColor;
        gctx.fillText(scoreStr, cx, cy + fSub * 0.65);
      }

      node.children.forEach(c => drawNode(c));
    }

    drawEdges(layoutRoot);
    drawNode(layoutRoot);

    // Scan line overlay
    const grad = gctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0,   'rgba(0,255,80,0.012)');
    grad.addColorStop(0.5, 'rgba(0,0,0,0)');
    grad.addColorStop(1,   'rgba(0,255,80,0.008)');
    gctx.fillStyle = grad;
    gctx.fillRect(0, 0, W, H);
  }

  // ── Pan & zoom interaction ────────────────────────────────────
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;

    const onDown = (e: MouseEvent) => {
      dragRef.current = { active: true, sx: e.clientX - panRef.current.x, sy: e.clientY - panRef.current.y };
      cv.style.cursor = 'grabbing';
    };
    const onMove = (e: MouseEvent) => {
      if (!dragRef.current.active) return;
      panRef.current.x = e.clientX - dragRef.current.sx;
      panRef.current.y = e.clientY - dragRef.current.sy;
      schedDraw();
    };
    const onUp = () => { dragRef.current.active = false; cv.style.cursor = 'grab'; };

    cv.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      cv.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [schedDraw]);

  // ── Animation steps ───────────────────────────────────────────
  const goToStep = useCallback((next: number) => {
    if (!flatNodes.length) return;
    const clamped = Math.max(0, Math.min(next, flatNodes.length - 1));
    setAnimStep(clamped);
    const newVisited = new Set(flatNodes.slice(0, clamped + 1).map(n => n.id));
    setVisited(newVisited);
    setCurrentId(flatNodes[clamped]?.id ?? '');

    // Auto-pan to keep current node visible
    const node = flatNodes[clamped];
    if (node && canvasRef.current) {
      const cv = canvasRef.current;
      const z  = zoomRef.current;
      const sx = node.lx * z + panRef.current.x;
      const sy = node.ly * z + panRef.current.y;
      const margin = 80;
      if (sx < margin || sx > cv.width - margin || sy < margin || sy > cv.height - margin) {
        panRef.current.x += cv.width  / 2 - sx;
        panRef.current.y += cv.height / 2 - sy;
      }
    }
  }, [flatNodes]);

  // Autoplay
  useEffect(() => {
    if (!playing) return;
    if (animStep >= flatNodes.length - 1) { setPlaying(false); return; }
    timerRef.current = setTimeout(() => goToStep(animStep + 1), speed);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [playing, animStep, flatNodes.length, speed, goToStep]);

  const togglePlay = () => {
    if (animStep >= flatNodes.length - 1) goToStep(0);
    setPlaying(p => !p);
  };
  const reset = () => { setPlaying(false); goToStep(0); setTimeout(fitView, 20); };

  const currentNode = flatNodes[animStep];
  const progress    = flatNodes.length ? ((animStep + 1) / flatNodes.length) * 100 : 0;

  const scoreDisplay = currentNode && visited.has(currentNode.id)
    ? (currentNode.score > 0 ? '+' : '') + Math.round(currentNode.score)
    : '—';

  // ─────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────
  return (
    <div
      className={fullscreen
        ? 'fixed inset-0 z-50 flex flex-col'
        : 'flex flex-col rounded-xl overflow-hidden border border-[#1a2f1a]'}
      style={{ background: '#080d08', fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
    >
      {/* ── Top bar ────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-2.5"
           style={{ background: '#0a110a', borderBottom: '1px solid #1a2a1a' }}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#4ade80' }} />
            <span className="text-xs font-bold tracking-widest" style={{ color: '#4ade80' }}>
              {usePruning ? 'α-β PRUNING' : 'MINIMAX'}
            </span>
          </div>
          <span className="text-xs" style={{ color: '#2d4a2d' }}>DECISION TREE EXPLORER</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fitView}
            className="p-1.5 rounded transition-colors"
            style={{ color: '#4a7a4a', background: 'transparent' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#0f1f0f')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            title="Fit to view"
          ><Target size={14} /></button>
          <div className="w-px h-4" style={{ background: '#1a2a1a' }} />
          <button
            onClick={() => setFullscreen(f => !f)}
            className="p-1.5 rounded transition-colors"
            style={{ color: '#4a7a4a', background: 'transparent' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#0f1f0f')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >{fullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}</button>
        </div>
      </div>

      {/* ── Canvas ─────────────────────────────────────── */}
      <div ref={wrapRef} className="flex-1 relative" style={{ minHeight: fullscreen ? 0 : 420, cursor: 'grab' }}>
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
        <div className="absolute bottom-3 right-3 text-xs" style={{ color: '#1d3a1d', pointerEvents: 'none' }}>
          drag to pan · {(zoomLevel * 100).toFixed(0)}%
        </div>
      </div>

      {/* ── Info strip ─────────────────────────────────── */}
      <div className="grid gap-px" style={{ gridTemplateColumns: 'repeat(5, 1fr)', background: '#0f1f0f' }}>
        {[
          { label: 'NODE',  val: currentNode?.action || 'ROOT' },
          { label: 'DEPTH', val: String(currentNode?.depth ?? 0) },
          { label: 'SCORE', val: scoreDisplay },
          { label: 'TYPE',  val: currentNode
              ? (usePruning && currentNode.isPruned) ? 'PRUNED'
              : !currentNode.action ? 'ROOT'
              : currentNode.isMaximizing ? 'MAX' : 'MIN'
              : '—' },
          { label: 'α / β', val: usePruning && currentNode
              ? `${currentNode.alpha <= -999990 ? '-∞' : Math.round(currentNode.alpha)} / ${currentNode.beta >= 999990 ? '+∞' : Math.round(currentNode.beta)}`
              : '— / —' },
        ].map(({ label, val }) => (
          <div key={label} className="flex flex-col items-center justify-center py-2 px-1"
               style={{ background: '#08100a' }}>
            <span className="text-[9px] tracking-widest mb-0.5" style={{ color: '#2d4a2d' }}>{label}</span>
            <span className="text-xs font-bold truncate max-w-full text-center"
                  style={{ color: label === 'TYPE' && val === 'MAX' ? '#38bdf8'
                               : label === 'TYPE' && val === 'MIN' ? '#f87171'
                               : label === 'TYPE' && val === 'PRUNED' ? '#f59e0b'
                               : '#4ade80' }}>
              {val}
            </span>
          </div>
        ))}
      </div>

      {/* ── Controls ───────────────────────────────────── */}
      <div className="flex items-center gap-3 px-4 py-3"
           style={{ background: '#0a110a', borderTop: '1px solid #0f1f0f' }}>

        {/* Playback buttons */}
        <div className="flex items-center gap-1.5">
          <CtrlBtn onClick={() => goToStep(animStep - 1)} disabled={animStep === 0}>
            <ChevronLeft size={14} />
          </CtrlBtn>
          <button
            onClick={togglePlay}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold tracking-wide transition-all"
            style={{ background: playing ? '#0f2a0f' : '#1a3a1a', color: '#4ade80',
                     border: '1px solid #2a5a2a', minWidth: 72 }}
          >
            {playing ? <Pause size={12} /> : <Play size={12} />}
            {playing ? 'PAUSE' : 'PLAY'}
          </button>
          <CtrlBtn onClick={() => goToStep(animStep + 1)} disabled={animStep >= flatNodes.length - 1}>
            <ChevronRight size={14} />
          </CtrlBtn>
          <CtrlBtn onClick={reset}><RotateCcw size={14} /></CtrlBtn>
        </div>

        {/* Progress bar */}
        <div className="flex-1 flex flex-col gap-1">
          <div className="h-1 rounded-full overflow-hidden" style={{ background: '#0f1f0f' }}>
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #166534, #4ade80)' }}
            />
          </div>
          <div className="flex justify-between text-[9px] tracking-widest" style={{ color: '#2d4a2d' }}>
            <span>STEP {animStep + 1}</span>
            <span>OF {flatNodes.length}</span>
          </div>
        </div>

        {/* Speed */}
        <select
          value={speed}
          onChange={e => setSpeed(Number(e.target.value))}
          className="text-xs px-2 py-1.5 rounded outline-none"
          style={{ background: '#0f1f0f', border: '1px solid #1a2a1a', color: '#4a7a4a',
                   fontFamily: 'inherit' }}
        >
          <option value={2000}>SLOW</option>
          <option value={900}>NORMAL</option>
          <option value={350}>FAST</option>
          <option value={100}>TURBO</option>
        </select>
      </div>

      {/* ── Legend ─────────────────────────────────────── */}
      <div className="flex items-center gap-5 px-4 py-2"
           style={{ background: '#080d08', borderTop: '1px solid #0a150a' }}>
        <span className="text-[9px] tracking-widest" style={{ color: '#1d3a1d' }}>LEGEND</span>
        {[
          { color: '#4ade80', label: 'CURRENT' },
          { color: '#38bdf8', label: 'MAX'     },
          { color: '#f87171', label: 'MIN'     },
          { color: '#f59e0b', label: 'PRUNED'  },
          { color: '#2d4a2d', label: 'PENDING' },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full border" style={{ background: hexToRgba(color, 0.25), borderColor: color }} />
            <span className="text-[9px] tracking-widest" style={{ color: '#2d4a2d' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Small control button helper
// ─────────────────────────────────────────────
function CtrlBtn({ children, onClick, disabled }: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center justify-center w-7 h-7 rounded transition-all"
      style={{
        background: 'transparent',
        border: '1px solid #1a2a1a',
        color: disabled ? '#1d3a1d' : '#4a7a4a',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = '#0f1f0f'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
    >
      {children}
    </button>
  );
}