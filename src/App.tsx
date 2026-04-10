import { RotateCcw, Info, Code } from 'lucide-react';
import { BattlefieldGrid } from './ui/BattlefieldGrid';
import { StatusPanel } from './ui/StatusPanel';
import { DecisionPanel } from './ui/DecisionPanel';
import { GameLog } from './ui/GameLog';
import { DepthSlider } from './ui/DepthSlider';
import { AlphaBetaToggle } from './ui/AlphaBetaToggle';
import { ModeSelector } from './ui/ModeSelector';
import { ActionButtons } from './ui/ActionButtons';
import { StatsBar } from './ui/StatsBar';
import { UnitSelector } from './ui/UnitSelector';
import { useGameEngine } from './hooks/useGameEngine';
import { useState } from 'react';

function App() {
  const {
    gameState,
    lastDecision,
    gameLog,
    stats,
    isGameOver,
    winner,
    mode,
    depth,
    usePruning,
    aiUnitType,
    enemyUnitType,
    makeHumanMove,
    resetGame,
    setMode,
    setDepth,
    setUsePruning,
    changeUnitTypes,
  } = useGameEngine();

  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="min-h-screen bg-tactical-bg-primary scanline">
      {/* Header */}
      <div className="bg-tactical-bg-secondary border-b border-tactical-olive-700 sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-tactical-olive-300 tracking-tight flex items-center gap-3">
                <span className="text-4xl">⚔️</span>
                BATTLEFIELD STRATEGY AI
              </h1>
              <div className="text-xs text-gray-500 bg-black/30 px-2 py-1 rounded">
                v1.0 | Minimax + Alpha-Beta
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="px-3 py-2 rounded bg-black/30 hover:bg-black/50 text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
              >
                <Info className="w-4 h-4" />
                Info
              </button>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded bg-black/30 hover:bg-black/50 text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
              >
                <Code className="w-4 h-4" />
                Docs
              </a>
              <button
                onClick={resetGame}
                className="px-4 py-2 rounded bg-tactical-olive-700 hover:bg-tactical-olive-600 text-white font-semibold transition-colors flex items-center gap-2 text-sm"
              >
                <RotateCcw className="w-4 h-4" />
                New Game
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      {showInfo && (
        <div className="bg-tactical-olive-900/30 border-b border-tactical-olive-700">
          <div className="max-w-[1800px] mx-auto px-6 py-3">
            <div className="text-sm text-gray-400">
              <strong className="text-tactical-olive-300">About:</strong> Tactical AI demonstration using Minimax algorithm with Alpha-Beta pruning. 
              Features terrain-aware combat, 3 unit types, line-of-sight mechanics, and real-time algorithm performance metrics.
              <button 
                onClick={() => setShowInfo(false)}
                className="ml-4 text-xs text-gray-600 hover:text-gray-400"
              >
                [Close]
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-4">
          
          {/* Left Sidebar - Controls */}
          <div className="col-span-3 space-y-4">
            <ModeSelector 
              mode={mode} 
              onModeChange={setMode}
              disabled={gameState.turn > 1}
            />
            
            <UnitSelector
              aiUnitType={aiUnitType}
              enemyUnitType={enemyUnitType}
              onChangeUnitTypes={changeUnitTypes}
              disabled={gameState.turn > 1}
            />
            
            <DepthSlider 
              value={depth} 
              onChange={setDepth}
              disabled={isGameOver}
            />
            
            <AlphaBetaToggle 
              checked={usePruning} 
              onCheckedChange={setUsePruning}
              disabled={isGameOver}
            />
            
            <StatsBar stats={stats} />
          </div>

          {/* Center - Battlefield */}
          <div className="col-span-6 flex flex-col items-center gap-4">
            <StatusPanel 
              aiUnit={gameState.aiUnit}
              enemyUnit={gameState.enemyUnit}
              turn={gameState.turn}
            />
            
            <BattlefieldGrid state={gameState} />
            
            {/* Game Over Banner */}
            {isGameOver && (
              <div className="tactical-panel p-6 w-full text-center">
                <div className="text-3xl font-bold mb-2">
                  {winner === 'AI' && '🏆 AI VICTORY!'}
                  {winner === 'Enemy' && '💀 ENEMY VICTORY!'}
                  {winner === 'Draw' && '🤝 DRAW!'}
                </div>
                <div className="text-sm text-gray-400 mb-4">
                  Game ended after {gameState.turn} turns
                </div>
                <button
                  onClick={resetGame}
                  className="px-6 py-3 rounded bg-tactical-olive-600 hover:bg-tactical-olive-500 text-white font-bold transition-colors"
                >
                  Play Again
                </button>
              </div>
            )}
          </div>

          {/* Right Sidebar - Info */}
          <div className="col-span-3 space-y-4">
            <DecisionPanel lastDecision={lastDecision} />
            
            {/* Human Action Buttons */}
            {mode === 'human' && !isGameOver && !gameState.isAiTurn && (
              <ActionButtons onAction={makeHumanMove} />
            )}
            
            {/* Waiting Message for Human Mode */}
            {mode === 'human' && !isGameOver && gameState.isAiTurn && (
              <div className="tactical-panel p-4 text-center">
                <div className="text-sm text-gray-400 mb-2">AI is thinking...</div>
                <div className="flex justify-center">
                  <div className="w-2 h-2 bg-tactical-olive-500 rounded-full animate-pulse" />
                </div>
              </div>
            )}
            
            <GameLog entries={gameLog} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-tactical-olive-800 bg-tactical-bg-secondary mt-12">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <div>
              Built with React + TypeScript + Tailwind CSS
            </div>
            <div>
              Educational AI Demonstration | PRD Compliant
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
