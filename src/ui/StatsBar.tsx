import { Activity, TrendingDown } from 'lucide-react';
import type { GameStats } from '../hooks/useGameEngine';

interface StatsBarProps {
  stats: GameStats;
}

export function StatsBar({ stats }: StatsBarProps) {
  const { withPruningNodes, withoutPruningNodes, pruningEfficiency } = stats;
  
  if (withPruningNodes === 0 && withoutPruningNodes === 0) {
    return (
      <div className="tactical-panel p-4">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-4 h-4 text-tactical-olive-400" />
          <h3 className="text-sm font-bold text-tactical-olive-300 tracking-wide">
            PERFORMANCE
          </h3>
        </div>
        <div className="text-center text-gray-600 text-xs py-4">
          Stats will appear after first AI move
        </div>
      </div>
    );
  }
  
  return (
    <div className="tactical-panel p-4">
      <div className="flex items-center gap-2 mb-3">
        <Activity className="w-4 h-4 text-tactical-olive-400" />
        <h3 className="text-sm font-bold text-tactical-olive-300 tracking-wide">
          PERFORMANCE
        </h3>
      </div>
      
      <div className="space-y-3">
        {/* With Pruning */}
        {withPruningNodes > 0 && (
          <div className="bg-black/30 rounded p-2 border border-tactical-olive-800">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-400">With Pruning</span>
              <span className="text-xs font-mono text-tactical-olive-400">
                {withPruningNodes.toLocaleString()}
              </span>
            </div>
            <div className="h-2 bg-black/40 rounded overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-tactical-olive-600 to-tactical-olive-400"
                style={{ 
                  width: withoutPruningNodes > 0 
                    ? `${(withPruningNodes / withoutPruningNodes) * 100}%` 
                    : '100%' 
                }}
              />
            </div>
          </div>
        )}
        
        {/* Without Pruning */}
        {withoutPruningNodes > 0 && (
          <div className="bg-black/30 rounded p-2 border border-gray-800">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-400">Without Pruning</span>
              <span className="text-xs font-mono text-gray-500">
                {withoutPruningNodes.toLocaleString()}
              </span>
            </div>
            <div className="h-2 bg-black/40 rounded overflow-hidden">
              <div className="h-full bg-gradient-to-r from-gray-600 to-gray-500 w-full" />
            </div>
          </div>
        )}
        
        {/* Efficiency */}
        {pruningEfficiency > 0 && (
          <div className="bg-tactical-olive-900/20 rounded p-3 border border-tactical-olive-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-tactical-olive-400" />
                <span className="text-xs text-gray-400">Efficiency</span>
              </div>
              <div className="text-2xl font-bold text-tactical-olive-300 font-mono">
                {pruningEfficiency}%
              </div>
            </div>
            <div className="text-[10px] text-gray-500 mt-1">
              nodes saved by alpha-beta pruning
            </div>
          </div>
        )}
        
        {/* Savings Info */}
        {withPruningNodes > 0 && withoutPruningNodes > 0 && (
          <div className="text-xs text-gray-500 bg-black/20 rounded p-2">
            Saved {(withoutPruningNodes - withPruningNodes).toLocaleString()} node evaluations
          </div>
        )}
      </div>
    </div>
  );
}
