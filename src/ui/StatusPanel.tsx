import { Shield, Zap, TrendingUp } from 'lucide-react';
import { UNIT_TYPES } from '../core/constants';
import type { Unit } from '../core/BattleState';

interface StatusPanelProps {
  aiUnit: Unit;
  enemyUnit: Unit;
  turn: number;
}

export function StatusPanel({ aiUnit, enemyUnit, turn }: StatusPanelProps) {
  const aiUnitType = UNIT_TYPES[aiUnit.type];
  const enemyUnitType = UNIT_TYPES[enemyUnit.type];
  
  return (
    <div className="tactical-panel p-4 space-y-4">
      <div className="flex items-center justify-between border-b border-tactical-olive-700 pb-2">
        <h3 className="text-lg font-bold text-tactical-olive-300 tracking-wide">
          TACTICAL STATUS
        </h3>
        <div className="text-sm text-gray-400">
          Turn: <span className="text-white font-mono">{turn}</span>
        </div>
      </div>
      
      {/* AI Unit */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-tactical-blue glow-blue" />
          <span className="text-sm font-semibold text-tactical-blue">
            AI UNIT: {aiUnitType.name} {aiUnitType.symbol}
          </span>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Shield className="w-3 h-3" />
            <span>Strength</span>
          </div>
          <div className="relative h-6 bg-black/40 rounded overflow-hidden">
            <div 
              className="absolute h-full bg-gradient-to-r from-tactical-blue to-blue-500 transition-all duration-300"
              style={{ width: `${Math.max(0, aiUnit.strength)}%` }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-xs font-mono text-white font-bold">
              {Math.round(aiUnit.strength)}/100
            </span>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Zap className="w-3 h-3" />
            <span>Stamina</span>
          </div>
          <div className="relative h-4 bg-black/40 rounded overflow-hidden">
            <div 
              className="absolute h-full bg-gradient-to-r from-tactical-olive-600 to-tactical-olive-400 transition-all duration-300"
              style={{ width: `${Math.max(0, aiUnit.stamina)}%` }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-white">
              {Math.round(aiUnit.stamina)}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-500">
          <div>Range: {aiUnitType.attackRange}</div>
          <div>Move: {aiUnitType.movementRange}</div>
          <div>ATK: {aiUnitType.attackPower}</div>
          <div>DEF: {aiUnitType.defensePower}</div>
        </div>
      </div>
      
      {/* Enemy Unit */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-tactical-red glow-red" />
          <span className="text-sm font-semibold text-tactical-red">
            ENEMY: {enemyUnitType.name} {enemyUnitType.symbol}
          </span>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Shield className="w-3 h-3" />
            <span>Strength</span>
          </div>
          <div className="relative h-6 bg-black/40 rounded overflow-hidden">
            <div 
              className="absolute h-full bg-gradient-to-r from-tactical-red to-red-600 transition-all duration-300"
              style={{ width: `${Math.max(0, enemyUnit.strength)}%` }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-xs font-mono text-white font-bold">
              {Math.round(enemyUnit.strength)}/100
            </span>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Zap className="w-3 h-3" />
            <span>Stamina</span>
          </div>
          <div className="relative h-4 bg-black/40 rounded overflow-hidden">
            <div 
              className="absolute h-full bg-gradient-to-r from-tactical-olive-600 to-tactical-olive-400 transition-all duration-300"
              style={{ width: `${Math.max(0, enemyUnit.stamina)}%` }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-white">
              {Math.round(enemyUnit.stamina)}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-500">
          <div>Range: {enemyUnitType.attackRange}</div>
          <div>Move: {enemyUnitType.movementRange}</div>
          <div>ATK: {enemyUnitType.attackPower}</div>
          <div>DEF: {enemyUnitType.defensePower}</div>
        </div>
      </div>
      
      {/* Battle Advantage */}
      <div className="pt-2 border-t border-tactical-border">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
          <TrendingUp className="w-3 h-3" />
          <span>Advantage</span>
        </div>
        <div className="relative h-2 bg-black/40 rounded overflow-hidden">
          <div 
            className="absolute h-full bg-gradient-to-r from-tactical-red via-gray-500 to-tactical-blue transition-all duration-300"
            style={{ 
              transform: `translateX(${((aiUnit.strength - enemyUnit.strength) / 200) * 100}%)` 
            }}
          />
        </div>
      </div>
    </div>
  );
}
