import { Users, Bot } from 'lucide-react';
import type { GameMode } from '../hooks/useGameEngine';

interface ModeSelectorProps {
  mode: GameMode;
  onModeChange: (mode: GameMode) => void;
  disabled?: boolean;
}

export function ModeSelector({ mode, onModeChange, disabled }: ModeSelectorProps) {
  return (
    <div className="tactical-panel p-4">
      <div className="flex items-center gap-2 mb-3">
        <Users className="w-4 h-4 text-tactical-olive-400" />
        <h3 className="text-sm font-bold text-tactical-olive-300 tracking-wide">
          GAME MODE
        </h3>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onModeChange('human')}
          disabled={disabled}
          className={`
            py-3 px-4 rounded border-2 transition-all font-semibold text-sm
            ${mode === 'human' 
              ? 'bg-tactical-blue/20 border-tactical-blue text-tactical-blue glow-blue' 
              : 'bg-black/20 border-tactical-border text-gray-500 hover:border-gray-600'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          <div className="flex flex-col items-center gap-1">
            <Users className="w-5 h-5" />
            <span>Human</span>
            <span className="text-[10px] opacity-70">vs AI</span>
          </div>
        </button>
        
        <button
          onClick={() => onModeChange('ai')}
          disabled={disabled}
          className={`
            py-3 px-4 rounded border-2 transition-all font-semibold text-sm
            ${mode === 'ai' 
              ? 'bg-tactical-olive-900/30 border-tactical-olive-500 text-tactical-olive-300' 
              : 'bg-black/20 border-tactical-border text-gray-500 hover:border-gray-600'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          <div className="flex flex-col items-center gap-1">
            <Bot className="w-5 h-5" />
            <span>AI</span>
            <span className="text-[10px] opacity-70">vs AI</span>
          </div>
        </button>
      </div>
      
      <div className="mt-3 text-xs text-gray-500 bg-black/20 rounded p-2">
        {mode === 'human' ? (
          <>
            <div className="text-tactical-blue font-semibold mb-1">Human vs AI</div>
            <div>You control the enemy unit. Make strategic decisions against the AI.</div>
          </>
        ) : (
          <>
            <div className="text-tactical-olive-400 font-semibold mb-1">AI vs AI</div>
            <div>Watch two AI agents battle using minimax. Perfect for algorithm demonstration.</div>
          </>
        )}
      </div>
    </div>
  );
}
