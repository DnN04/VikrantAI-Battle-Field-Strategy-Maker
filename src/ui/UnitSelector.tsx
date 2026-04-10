import { Users } from 'lucide-react';
import type { UnitType } from '../core/BattleState';
import { UNIT_TYPES } from '../core/constants';

interface UnitSelectorProps {
  aiUnitType: UnitType;
  enemyUnitType: UnitType;
  onChangeUnitTypes: (ai: UnitType, enemy: UnitType) => void;
  disabled?: boolean;
}

export function UnitSelector({ 
  aiUnitType, 
  enemyUnitType, 
  onChangeUnitTypes, 
  disabled 
}: UnitSelectorProps) {
  const unitTypes: UnitType[] = ['INFANTRY', 'ARMOR', 'ARTILLERY'];
  
  return (
    <div className="tactical-panel p-4">
      <div className="flex items-center gap-2 mb-3">
        <Users className="w-4 h-4 text-tactical-olive-400" />
        <h3 className="text-sm font-bold text-tactical-olive-300 tracking-wide">
          UNIT SELECTION
        </h3>
      </div>
      
      <div className="space-y-4">
        {/* AI Unit */}
        <div>
          <label className="text-xs text-tactical-blue mb-2 block font-semibold">
            AI Unit
          </label>
          <div className="grid grid-cols-3 gap-1">
            {unitTypes.map((type) => {
              const unitInfo = UNIT_TYPES[type];
              return (
                <button
                  key={type}
                  onClick={() => onChangeUnitTypes(type, enemyUnitType)}
                  disabled={disabled}
                  className={`
                    py-2 px-1 rounded border text-xs font-semibold transition-all
                    ${aiUnitType === type
                      ? 'bg-tactical-blue/20 border-tactical-blue text-tactical-blue'
                      : 'bg-black/20 border-tactical-border text-gray-500 hover:border-gray-600'
                    }
                    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-base">{unitInfo.symbol}</span>
                    <span className="text-[10px]">{unitInfo.name}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Enemy Unit */}
        <div>
          <label className="text-xs text-tactical-red mb-2 block font-semibold">
            Enemy Unit
          </label>
          <div className="grid grid-cols-3 gap-1">
            {unitTypes.map((type) => {
              const unitInfo = UNIT_TYPES[type];
              return (
                <button
                  key={type}
                  onClick={() => onChangeUnitTypes(aiUnitType, type)}
                  disabled={disabled}
                  className={`
                    py-2 px-1 rounded border text-xs font-semibold transition-all
                    ${enemyUnitType === type
                      ? 'bg-tactical-red/20 border-tactical-red text-tactical-red'
                      : 'bg-black/20 border-tactical-border text-gray-500 hover:border-gray-600'
                    }
                    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-base">{unitInfo.symbol}</span>
                    <span className="text-[10px]">{unitInfo.name}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Unit Info */}
        <div className="text-[10px] text-gray-600 bg-black/20 rounded p-2 space-y-1">
          <div><span className="text-white">👤 Infantry:</span> Balanced, forest bonus</div>
          <div><span className="text-white">🛡️ Armor:</span> Strong attack, plains bonus</div>
          <div><span className="text-white">💥 Artillery:</span> Long range, hills bonus</div>
        </div>
      </div>
    </div>
  );
}
