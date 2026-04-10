import { Scissors } from 'lucide-react';

interface AlphaBetaToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function AlphaBetaToggle({ checked, onCheckedChange, disabled }: AlphaBetaToggleProps) {
  return (
    <div className="tactical-panel p-4">
      <div className="flex items-center gap-2 mb-3">
        <Scissors className="w-4 h-4 text-tactical-olive-400" />
        <h3 className="text-sm font-bold text-tactical-olive-300 tracking-wide">
          ALPHA-BETA PRUNING
        </h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">Optimization</span>
          <button
            onClick={() => onCheckedChange(!checked)}
            disabled={disabled}
            className={`
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors
              ${checked ? 'bg-tactical-olive-600' : 'bg-gray-700'}
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <span
              className={`
                inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                ${checked ? 'translate-x-6' : 'translate-x-1'}
              `}
            />
          </button>
        </div>
        
        <div className={`
          text-center py-2 rounded font-mono text-sm font-bold
          ${checked ? 'bg-tactical-olive-900/50 text-tactical-olive-300' : 'bg-gray-900/50 text-gray-500'}
        `}>
          {checked ? 'ENABLED ✓' : 'DISABLED'}
        </div>
        
        <div className="text-xs text-gray-500 bg-black/20 rounded p-2">
          {checked ? (
            <>
              <div className="text-tactical-olive-400 font-semibold mb-1">
                ✓ Pruning Active
              </div>
              <div>
                Skips branches that won't affect outcome. Dramatically reduces nodes evaluated while finding the same best move.
              </div>
            </>
          ) : (
            <>
              <div className="text-gray-400 font-semibold mb-1">
                ⚠️ Pruning Disabled
              </div>
              <div>
                Evaluates entire game tree. Slower but useful for comparing algorithm efficiency.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
