// import { useState, useEffect } from 'react';
// import { Play, Pause, RotateCcw, ChevronRight } from 'lucide-react';
// import type { DecisionTreeNode } from '../../strategy/strategyEngine';

// interface DecisionTreeProps {
//   tree: DecisionTreeNode;
//   usePruning: boolean;
// }

// export function DecisionTree({ tree, usePruning }: DecisionTreeProps) {
//   const [animationStep, setAnimationStep] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [speed, setSpeed] = useState(1000); // ms per step

//   // Flatten tree for step-by-step animation
//   const [flattenedNodes, setFlattenedNodes] = useState<DecisionTreeNode[]>([]);

//   useEffect(() => {
//     const nodes: DecisionTreeNode[] = [];
    
//     function flatten(node: DecisionTreeNode) {
//       nodes.push(node);
//       node.children.forEach(child => flatten(child));
//     }
    
//     flatten(tree);
    
//     // Sort by evaluation order
//     nodes.sort((a, b) => a.evaluationOrder - b.evaluationOrder);
//     setFlattenedNodes(nodes);
//   }, [tree]);

//   // Animation control
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

//   const handlePlayPause = () => {
//     if (animationStep >= flattenedNodes.length - 1) {
//       setAnimationStep(0);
//     }
//     setIsPlaying(!isPlaying);
//   };

//   const handleReset = () => {
//     setAnimationStep(0);
//     setIsPlaying(false);
//   };

//   const handleStepForward = () => {
//     setAnimationStep(prev => Math.min(prev + 1, flattenedNodes.length - 1));
//   };

//   const currentNode = flattenedNodes[animationStep];
//   const visitedNodes = new Set(flattenedNodes.slice(0, animationStep + 1).map(n => n.id));

//   return (
//     <div className="tactical-panel p-6 space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between border-b border-tactical-olive-700 pb-4">
//         <div>
//           <h3 className="text-lg font-bold text-tactical-olive-300 tracking-wide">
//             DECISION TREE EXPLORATION
//           </h3>
//           <p className="text-xs text-gray-500 mt-1">
//             Step-by-step visualization of minimax algorithm
//           </p>
//         </div>
        
//         <div className="flex items-center gap-2">
//           <span className="text-xs text-gray-500">Speed:</span>
//           <select
//             value={speed}
//             onChange={(e) => setSpeed(Number(e.target.value))}
//             className="bg-black/40 border border-tactical-border rounded px-2 py-1 text-white text-xs"
//           >
//             <option value={2000}>Slow</option>
//             <option value={1000}>Normal</option>
//             <option value={500}>Fast</option>
//             <option value={200}>Very Fast</option>
//           </select>
//         </div>
//       </div>

//       {/* Animation Controls */}
//       <div className="flex items-center gap-4">
//         <button
//           onClick={handlePlayPause}
//           className="px-4 py-2 bg-tactical-olive-700 hover:bg-tactical-olive-600 text-white rounded flex items-center gap-2 transition-colors"
//         >
//           {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
//           {isPlaying ? 'Pause' : 'Play'}
//         </button>

//         <button
//           onClick={handleReset}
//           className="px-4 py-2 bg-black/40 hover:bg-black/60 text-white rounded flex items-center gap-2 transition-colors"
//         >
//           <RotateCcw className="w-4 h-4" />
//           Reset
//         </button>

//         <button
//           onClick={handleStepForward}
//           disabled={animationStep >= flattenedNodes.length - 1}
//           className="px-4 py-2 bg-black/40 hover:bg-black/60 text-white rounded flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           <ChevronRight className="w-4 h-4" />
//           Step
//         </button>

//         <div className="flex-1">
//           <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
//             <span>Progress</span>
//             <span>{animationStep + 1} / {flattenedNodes.length}</span>
//           </div>
//           <div className="h-2 bg-black/40 rounded-full overflow-hidden">
//             <div 
//               className="h-full bg-gradient-to-r from-tactical-olive-700 to-tactical-olive-500 transition-all duration-300"
//               style={{ width: `${((animationStep + 1) / flattenedNodes.length) * 100}%` }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Current Node Info */}
//       {currentNode && (
//         <div className="grid grid-cols-2 gap-4">
//           <div className="tactical-panel p-4 bg-tactical-bg-tertiary">
//             <div className="text-xs text-gray-400 mb-2">Current Node</div>
//             <div className="space-y-2 text-sm">
//               <div className="flex justify-between">
//                 <span className="text-gray-400">Depth:</span>
//                 <span className="text-white font-mono">{currentNode.depth}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-400">Action:</span>
//                 <span className="text-white font-semibold">
//                   {currentNode.action || 'ROOT'}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-400">Score:</span>
//                 <span className={`font-mono font-bold ${
//                   currentNode.score > 0 ? 'text-tactical-blue' : 
//                   currentNode.score < 0 ? 'text-tactical-red' : 
//                   'text-gray-400'
//                 }`}>
//                   {currentNode.score > 0 ? '+' : ''}{Math.round(currentNode.score)}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-400">Type:</span>
//                 <span className={`font-semibold ${
//                   currentNode.isMaximizing ? 'text-tactical-blue' : 'text-tactical-red'
//                 }`}>
//                   {currentNode.isMaximizing ? 'MAX' : 'MIN'}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="tactical-panel p-4 bg-tactical-bg-tertiary">
//             <div className="text-xs text-gray-400 mb-2">Alpha-Beta Bounds</div>
//             <div className="space-y-2 text-sm">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-400">Alpha (α):</span>
//                 <span className="text-tactical-blue font-mono font-bold">
//                   {currentNode.alpha === -999999 ? '-∞' : Math.round(currentNode.alpha)}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-400">Beta (β):</span>
//                 <span className="text-tactical-red font-mono font-bold">
//                   {currentNode.beta === 999999 ? '+∞' : Math.round(currentNode.beta)}
//                 </span>
//               </div>
//               {currentNode.isPruned && (
//                 <div className="mt-3 px-3 py-2 bg-tactical-orange/20 border border-tactical-orange rounded text-xs text-tactical-orange font-semibold">
//                   ✂️ PRUNED - Not evaluated
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Simplified Tree Visualization */}
//       <div className="bg-black/20 rounded-lg p-6 overflow-x-auto">
//         <div className="min-w-max">
//           <TreeNode 
//             node={tree} 
//             visitedNodes={visitedNodes}
//             currentNodeId={currentNode?.id}
//             depth={0}
//           />
//         </div>
//       </div>

//       {/* Legend */}
//       <div className="grid grid-cols-4 gap-3 text-xs">
//         <div className="flex items-center gap-2">
//           <div className="w-3 h-3 rounded bg-tactical-blue" />
//           <span className="text-gray-400">Maximizing (AI)</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="w-3 h-3 rounded bg-tactical-red" />
//           <span className="text-gray-400">Minimizing (Enemy)</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="w-3 h-3 rounded bg-gray-700" />
//           <span className="text-gray-400">Not yet explored</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="w-3 h-3 rounded bg-tactical-orange border-2 border-tactical-orange" />
//           <span className="text-gray-400">Pruned</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Recursive tree node component
// function TreeNode({ 
//   node, 
//   visitedNodes, 
//   currentNodeId,
//   depth 
// }: { 
//   node: DecisionTreeNode; 
//   visitedNodes: Set<string>;
//   currentNodeId?: string;
//   depth: number;
// }) {
//   const isVisited = visitedNodes.has(node.id);
//   const isCurrent = node.id === currentNodeId;
//   const isPruned = node.isPruned;

//   return (
//     <div className="flex flex-col items-center">
//       {/* Node */}
//       <div className={`
//         relative px-4 py-2 rounded border-2 text-xs font-mono transition-all
//         ${isCurrent ? 'ring-2 ring-tactical-olive-500 scale-110' : ''}
//         ${isPruned ? 'bg-tactical-orange/20 border-tactical-orange' :
//           isVisited ? 
//             node.isMaximizing ? 'bg-tactical-blue/20 border-tactical-blue' : 'bg-tactical-red/20 border-tactical-red'
//           : 'bg-gray-900/50 border-gray-700'
//         }
//       `}>
//         <div className={`font-bold ${
//           isPruned ? 'text-tactical-orange' :
//           isVisited ? 'text-white' : 'text-gray-600'
//         }`}>
//           {node.action || 'ROOT'}
//         </div>
//         {isVisited && !isPruned && (
//           <div className="text-gray-400 mt-1">
//             {node.score > 0 ? '+' : ''}{Math.round(node.score)}
//           </div>
//         )}
//         {isPruned && (
//           <div className="text-tactical-orange text-[10px] mt-1">PRUNED</div>
//         )}
//       </div>

//       {/* Children */}
//       {node.children.length > 0 && (
//         <>
//           <div className="h-4 w-px bg-tactical-border" />
//           <div className="flex gap-8">
//             {node.children.map((child, index) => (
//               <div key={child.id} className="flex flex-col items-center">
//                 {index < node.children.length - 1 && (
//                   <div className="absolute w-full h-px bg-tactical-border" />
//                 )}
//                 <TreeNode 
//                   node={child} 
//                   visitedNodes={visitedNodes}
//                   currentNodeId={currentNodeId}
//                   depth={depth + 1}
//                 />
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronRight } from 'lucide-react';
import type { DecisionTreeNode } from '../../strategy/strategyEngine';

interface DecisionTreeProps {
  tree: DecisionTreeNode;
  usePruning: boolean;
}

export function DecisionTree({ tree, usePruning }: DecisionTreeProps) {
  const [animationStep, setAnimationStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);

  const [flattenedNodes, setFlattenedNodes] = useState<DecisionTreeNode[]>([]);

  useEffect(() => {
    const nodes: DecisionTreeNode[] = [];

    function flatten(node: DecisionTreeNode) {
      nodes.push(node);
      node.children.forEach(child => flatten(child));
    }

    flatten(tree);
    nodes.sort((a, b) => a.evaluationOrder - b.evaluationOrder);
    setFlattenedNodes(nodes);
  }, [tree]);

  // reset when pruning mode changes
  useEffect(() => {
    setAnimationStep(0);
    setIsPlaying(false);
  }, [usePruning]);

  useEffect(() => {
    if (!isPlaying) return;

    if (animationStep >= flattenedNodes.length - 1) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      setAnimationStep(prev => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [isPlaying, animationStep, flattenedNodes.length, speed]);

  const handlePlayPause = () => {
    if (animationStep >= flattenedNodes.length - 1) {
      setAnimationStep(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setAnimationStep(0);
    setIsPlaying(false);
  };

  const handleStepForward = () => {
    setAnimationStep(prev => Math.min(prev + 1, flattenedNodes.length - 1));
  };

  const currentNode = flattenedNodes[animationStep];
  const visitedNodes = new Set(flattenedNodes.slice(0, animationStep + 1).map(n => n.id));

  return (
    <div className="tactical-panel p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-tactical-olive-700 pb-4">
        <div>
          <h3 className="text-lg font-bold text-tactical-olive-300 tracking-wide">
            DECISION TREE EXPLORATION
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {usePruning ? 'Alpha-Beta Pruning Visualization' : 'Minimax Visualization'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Speed:</span>
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="bg-black/40 border border-tactical-border rounded px-2 py-1 text-white text-xs"
          >
            <option value={2000}>Slow</option>
            <option value={1000}>Normal</option>
            <option value={500}>Fast</option>
            <option value={200}>Very Fast</option>
          </select>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button onClick={handlePlayPause} className="px-4 py-2 bg-tactical-olive-700 hover:bg-tactical-olive-600 text-white rounded flex items-center gap-2">
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        <button onClick={handleReset} className="px-4 py-2 bg-black/40 hover:bg-black/60 text-white rounded flex items-center gap-2">
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>

        <button
          onClick={handleStepForward}
          disabled={animationStep >= flattenedNodes.length - 1}
          className="px-4 py-2 bg-black/40 hover:bg-black/60 text-white rounded flex items-center gap-2 disabled:opacity-50"
        >
          <ChevronRight className="w-4 h-4" />
          Step
        </button>

        <div className="flex-1">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Progress</span>
            <span>{animationStep + 1} / {flattenedNodes.length}</span>
          </div>
          <div className="h-2 bg-black/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-tactical-olive-700 to-tactical-olive-500"
              style={{ width: `${((animationStep + 1) / flattenedNodes.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Current Node */}
      {currentNode && (
        <div className="grid grid-cols-2 gap-4">
          
          {/* Node Info */}
          <div className="tactical-panel p-4 bg-tactical-bg-tertiary">
            <div className="text-xs text-gray-400 mb-2">Current Node</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Depth:</span>
                <span>{currentNode.depth}</span>
              </div>
              <div className="flex justify-between">
                <span>Action:</span>
                <span>{currentNode.action || 'ROOT'}</span>
              </div>
              <div className="flex justify-between">
                <span>Score:</span>
                <span>
                  {currentNode.score > 0 ? '+' : ''}
                  {Math.round(currentNode.score)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Type:</span>
                <span>{currentNode.isMaximizing ? 'MAX' : 'MIN'}</span>
              </div>
            </div>
          </div>

          {/* Alpha Beta */}
          <div className="tactical-panel p-4 bg-tactical-bg-tertiary">
            <div className="text-xs text-gray-400 mb-2">
              {usePruning ? 'Alpha-Beta Bounds' : 'Evaluation'}
            </div>

            <div className="space-y-2 text-sm">
              {usePruning && (
                <>
                  <div className="flex justify-between">
                    <span>Alpha:</span>
                    <span>{currentNode.alpha === -999999 ? '-∞' : Math.round(currentNode.alpha)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Beta:</span>
                    <span>{currentNode.beta === 999999 ? '+∞' : Math.round(currentNode.beta)}</span>
                  </div>
                </>
              )}

              {usePruning && currentNode.isPruned && (
                <div className="mt-2 text-xs text-orange-400">
                  ✂️ PRUNED
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tree */}
      <div className="bg-black/20 rounded-lg p-6 overflow-x-auto">
        <TreeNode
          node={tree}
          visitedNodes={visitedNodes}
          currentNodeId={currentNode?.id}
          depth={0}
          usePruning={usePruning}
        />
      </div>

      {/* Legend */}
      <div className="grid grid-cols-4 gap-3 text-xs">
        <div className="flex gap-2"><div className="w-3 h-3 bg-blue-500" />Max</div>
        <div className="flex gap-2"><div className="w-3 h-3 bg-red-500" />Min</div>
        <div className="flex gap-2"><div className="w-3 h-3 bg-gray-700" />Unvisited</div>
        {usePruning && (
          <div className="flex gap-2"><div className="w-3 h-3 bg-orange-500" />Pruned</div>
        )}
      </div>
    </div>
  );
}

function TreeNode({
  node,
  visitedNodes,
  currentNodeId,
  depth,
  usePruning
}: {
  node: DecisionTreeNode;
  visitedNodes: Set<string>;
  currentNodeId?: string;
  depth: number;
  usePruning: boolean;
}) {
  const isVisited = visitedNodes.has(node.id);
  const isCurrent = node.id === currentNodeId;
  const isPruned = usePruning && node.isPruned;

  return (
    <div className="flex flex-col items-center">
      
      <div className={`
        px-4 py-2 rounded border text-xs
        ${isCurrent ? 'ring-2 ring-green-400 scale-110' : ''}
        ${isPruned ? 'bg-orange-200 border-orange-500' :
          isVisited ? (node.isMaximizing ? 'bg-blue-200' : 'bg-red-200')
          : 'bg-gray-800'
        }
      `}>
        {node.action || 'ROOT'}
        {isVisited && !isPruned && (
          <div>{Math.round(node.score)}</div>
        )}
        {isPruned && <div>PRUNED</div>}
      </div>

      {node.children.length > 0 && (
        <div className="flex gap-6 mt-2">
          {node.children.map(child => (
            <TreeNode
              key={child.id}
              node={child}
              visitedNodes={visitedNodes}
              currentNodeId={currentNodeId}
              depth={depth + 1}
              usePruning={usePruning}
            />
          ))}
        </div>
      )}
    </div>
  );
}