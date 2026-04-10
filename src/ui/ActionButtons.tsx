import { Swords, Shield, ArrowLeft } from 'lucide-react';
import type { Action } from '../core/BattleState';

interface ActionButtonsProps {
  onAction: (action: Action) => void;
  disabled?: boolean;
}

export function ActionButtons({ onAction, disabled }: ActionButtonsProps) {
  return (
    <div className="tactical-panel p-4">
      <div className="mb-3">
        <h3 className="text-sm font-bold text-tactical-olive-300 tracking-wide mb-1">
          YOUR TURN
        </h3>
        <p className="text-xs text-gray-500">Choose your action</p>
      </div>
      
      <div className="space-y-2">
        <button
          onClick={() => onAction('ATTACK')}
          disabled={disabled}
          className="
            w-full py-3 px-4 rounded border-2 border-tactical-red/50 
            bg-tactical-red/10 hover:bg-tactical-red/20 
            text-tactical-red font-bold text-sm transition-all
            hover:border-tactical-red hover:glow-red
            disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center justify-center gap-2
          "
        >
          <Swords className="w-4 h-4" />
          ATTACK ⚔️
        </button>
        
        <button
          onClick={() => onAction('DEFEND')}
          disabled={disabled}
          className="
            w-full py-3 px-4 rounded border-2 border-tactical-blue/50 
            bg-tactical-blue/10 hover:bg-tactical-blue/20 
            text-tactical-blue font-bold text-sm transition-all
            hover:border-tactical-blue hover:glow-blue
            disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center justify-center gap-2
          "
        >
          <Shield className="w-4 h-4" />
          DEFEND 🛡️
        </button>
        
        <button
          onClick={() => onAction('RETREAT')}
          disabled={disabled}
          className="
            w-full py-3 px-4 rounded border-2 border-tactical-olive-600/50 
            bg-tactical-olive-900/10 hover:bg-tactical-olive-900/20 
            text-tactical-olive-400 font-bold text-sm transition-all
            hover:border-tactical-olive-500
            disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center justify-center gap-2
          "
        >
          <ArrowLeft className="w-4 h-4" />
          RETREAT 🏃
        </button>
      </div>
      
      <div className="mt-3 text-xs text-gray-600 bg-black/20 rounded p-2">
        <div className="space-y-1">
          <div><span className="text-tactical-red">⚔️ Attack:</span> Damage enemy based on range & terrain</div>
          <div><span className="text-tactical-blue">🛡️ Defend:</span> Restore stamina, counter if close</div>
          <div><span className="text-tactical-olive-400">🏃 Retreat:</span> Move away, recover health</div>
        </div>
      </div>
    </div>
  );
}
