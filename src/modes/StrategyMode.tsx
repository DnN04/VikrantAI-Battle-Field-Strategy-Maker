// import { useState } from 'react';
// import { Brain, RotateCcw } from 'lucide-react';

// import { InputPanel, type StrategyInput } from '../ui/strategy/InputPanel';
// import { ResultDashboard } from '../ui/strategy/ResultDashboard';
// import { DecisionTree } from '../ui/strategy/DecisionTree';

// import { generateStrategy, type StrategyResult } from '../strategy/strategyEngine';
// import { getInitialState, type TerrainType } from '../core/BattleState';

// export function StrategyMode() {
//   const [result, setResult] = useState<StrategyResult | null>(null);
//   const [isProcessing, setIsProcessing] = useState(false);

//   // ✅ Clean terrain normalization (NO bugs)
//   const normalizeTerrain = (t: string): TerrainType => {
//     const map: Record<string, TerrainType> = {
//       PLAIN: 'PLAINS',
//       PLAINS: 'PLAINS',
//       FOREST: 'FOREST',
//       HILL: 'HILLS',
//       HILLS: 'HILLS',
//       WATER: 'WATER',
//     };

//     return map[t] ?? 'PLAINS';
//   };

//   const getTerrain = (t: string): 'PLAINS' | 'FOREST' | 'HILLS' | 'WATER' => {
//   const val = t.toLowerCase();

//   if (val.includes('forest')) return 'FOREST';
//   if (val.includes('hill')) return 'HILLS';
//   if (val.includes('water')) return 'WATER';

//   return 'PLAINS'; // default
// };
//   const handleGenerate = async (input: StrategyInput) => {
//     setIsProcessing(true);

//     await new Promise(resolve => setTimeout(resolve, 300));

//     try {
//       const state = getInitialState();

//       // ✅ Apply strengths
//       state.aiUnit.strength = input.aiUnits;
//       state.enemyUnit.strength = input.enemyUnits;

//       // ✅ Fixed positions (can upgrade later)
//       const aiPos: [number, number] = [1, 1];
//       const enemyPos: [number, number] = [3, 3];

//       state.aiUnit.position = aiPos;
//       state.enemyUnit.position = enemyPos;

//       // ✅ Apply terrain ONLY to unit positions
//       const terrainType = normalizeTerrain(input.terrain);

//       state.terrain[aiPos[0]][aiPos[1]].type = terrainType;
//       state.terrain[enemyPos[0]][enemyPos[1]].type = terrainType;

//       // ✅ Run AI
//       const strategyResult = generateStrategy(state, 3, true);

//       setResult(strategyResult);
//     } catch (error) {
//       console.error('Strategy generation failed:', error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handleReset = () => {
//     setResult(null);
//   };

//   return (
//     <div className="min-h-screen bg-tactical-bg-primary">

//       {/* Header */}
//       <div className="bg-tactical-bg-secondary border-b border-tactical-olive-700 sticky top-0 z-50">
//         <div className="max-w-[1800px] mx-auto px-6 py-4 flex justify-between items-center">

//           <div className="flex items-center gap-4">
//             <Brain className="w-8 h-8 text-tactical-olive-400" />
//             <div>
//               <h1 className="text-2xl font-bold text-tactical-olive-300">
//                 Tactical Strategy Analyzer
//               </h1>
//               <p className="text-sm text-gray-500">
//                 Minimax Decision Engine
//               </p>
//             </div>
//           </div>

//           {result && (
//             <button
//               onClick={handleReset}
//               className="px-4 py-2 bg-tactical-olive-700 hover:bg-tactical-olive-600 text-white rounded flex items-center gap-2"
//             >
//               <RotateCcw className="w-4 h-4" />
//               New Analysis
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Main */}
//       <div className="max-w-[1800px] mx-auto px-6 py-6">
//         {!result ? (
//           <div className="max-w-3xl mx-auto text-center">

//             <h2 className="text-3xl font-bold text-white mb-2">
//               Configure Battlefield
//             </h2>

//             <p className="text-gray-400 mb-6">
//               Provide inputs to generate optimal AI strategy
//             </p>

//             <InputPanel onRun={handleGenerate} />

//             {isProcessing && (
//               <p className="mt-4 text-gray-400">Processing strategy...</p>
//             )}
//           </div>
//         ) : (
//           <div className="grid grid-cols-12 gap-6">

//             {/* Left */}
//             <div className="col-span-5">
//               <ResultDashboard result={result} />
//             </div>

//             {/* Right */}
//             <div className="col-span-7">
//               <DecisionTree
//                 tree={result.decisionTree}
//                 usePruning={true}
//               />
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Footer */}
//       <div className="border-t border-tactical-olive-800 bg-tactical-bg-secondary mt-12">
//         <div className="max-w-[1800px] mx-auto px-6 py-4 text-xs text-gray-600 flex justify-between">
//           <span>Strategy Mode</span>
//           <span>Minimax AI</span>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';
import { Brain, RotateCcw } from 'lucide-react';

import { InputPanel, type StrategyInput } from '../ui/strategy/InputPanel';
import { ResultDashboard } from '../ui/strategy/ResultDashboard';
import { DecisionTree } from '../ui/strategy/DecisionTree';

import { generateStrategy, type StrategyResult } from '../strategy/strategyEngine';
import { getInitialState } from '../core/BattleState';

export function StrategyMode() {
  const [result, setResult] = useState<StrategyResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleGenerate = async (input: StrategyInput) => {
    setIsProcessing(true);

    await new Promise(resolve => setTimeout(resolve, 300));

    try {
      const state = getInitialState();

      // ✅ Strengths (safe)
      state.aiUnit.strength = input.aiUnits ?? 100;
      state.enemyUnit.strength = input.enemyUnits ?? 100;

      // ✅ Fixed positions
      const aiPos: [number, number] = [1, 1];
      const enemyPos: [number, number] = [3, 3];

      state.aiUnit.position = aiPos;
      state.enemyUnit.position = enemyPos;

      // ✅ SIMPLE TERRAIN FIX (NO TS ISSUES)
      let terrainType: 'PLAINS' | 'FOREST' | 'HILLS' | 'WATER' = 'PLAINS';

      if (input.terrain === 'FOREST') terrainType = 'FOREST';
      else if (input.terrain === 'HILLS') terrainType = 'HILLS';
      else if (input.terrain === 'WATER') terrainType = 'WATER';

      state.terrain[aiPos[0]][aiPos[1]].type = terrainType;
      state.terrain[enemyPos[0]][enemyPos[1]].type = terrainType;

      // ✅ RUN AI
      const strategyResult = generateStrategy(state, 3, true);

      setResult(strategyResult);
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-tactical-bg-primary">

      {/* Header */}
      <div className="bg-tactical-bg-secondary border-b border-tactical-olive-700 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Brain className="w-8 h-8 text-tactical-olive-400" />
          <div>
            <h1 className="text-xl font-bold text-tactical-olive-300">
              Tactical Strategy Analyzer
            </h1>
          </div>
        </div>

        {result && (
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-tactical-olive-700 text-white rounded flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        )}
      </div>

      {/* Body */}
      <div className="p-6">
        {!result ? (
          <div className="max-w-2xl mx-auto text-center">

            <h2 className="text-2xl text-white mb-4">
              Configure Battlefield
            </h2>

            <InputPanel onRun={handleGenerate} />

            {isProcessing && (
              <p className="text-gray-400 mt-4">Processing...</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-6">

            <div className="col-span-5">
              <ResultDashboard result={result} />
            </div>

            <div className="col-span-7">
              <DecisionTree tree={result.decisionTree} usePruning={true} />
            </div>

          </div>
        )}
      </div>
    </div>
  );
}