import { Brain, Target, Clock, Activity } from 'lucide-react';
import type { AIDecision } from '../core/aiAgent';

interface DecisionPanelProps {
  lastDecision: AIDecision | null;
}

export function DecisionPanel({ lastDecision }: DecisionPanelProps) {
  if (!lastDecision) {
    return (
      <div className="tactical-panel p-4">
        <div className="flex items-center gap-2 border-b border-tactical-olive-700 pb-2 mb-4">
          <Brain className="w-4 h-4 text-tactical-olive-400" />
          <h3 className="text-lg font-bold text-tactical-olive-300 tracking-wide">
            AI DECISION
          </h3>
        </div>
        <div className="text-center text-gray-500 text-sm py-8">
          Awaiting AI decision...
        </div>
      </div>
    );
  }
  
  const actionColors = {
    ATTACK: 'text-tactical-red',
    DEFEND: 'text-tactical-blue',
    RETREAT: 'text-tactical-olive-400',
  };
  
  const actionIcons = {
    ATTACK: '⚔️',
    DEFEND: '🛡️',
    RETREAT: '🏃',
  };
  
  return (
    <div className="tactical-panel p-4">
      <div className="flex items-center gap-2 border-b border-tactical-olive-700 pb-2 mb-4">
        <Brain className="w-4 h-4 text-tactical-olive-400" />
        <h3 className="text-lg font-bold text-tactical-olive-300 tracking-wide">
          AI DECISION
        </h3>
      </div>
      
      <div className="space-y-3">
        {/* Action */}
        <div className="bg-black/30 rounded p-3 border border-tactical-olive-800">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-400 uppercase tracking-wide">Action</span>
          </div>
          <div className={`text-2xl font-bold ${actionColors[lastDecision.action]}`}>
            {actionIcons[lastDecision.action]} {lastDecision.action}
          </div>
        </div>
        
        {/* Score */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-black/30 rounded p-2 border border-tactical-olive-800">
            <div className="text-[10px] text-gray-400 uppercase mb-1">Score</div>
            <div className="text-lg font-mono font-bold text-white">
              {lastDecision.score > 0 ? '+' : ''}{Math.round(lastDecision.score)}
            </div>
          </div>
          
          <div className="bg-black/30 rounded p-2 border border-tactical-olive-800">
            <div className="text-[10px] text-gray-400 uppercase mb-1">Time</div>
            <div className="text-lg font-mono font-bold text-tactical-olive-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {lastDecision.elapsedMs}ms
            </div>
          </div>
        </div>
        
        {/* Nodes Evaluated */}
        <div className="bg-black/30 rounded p-3 border border-tactical-olive-800">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-400 uppercase tracking-wide">
              Nodes Evaluated
            </span>
          </div>
          <div className="text-xl font-mono font-bold text-tactical-blue">
            {lastDecision.nodesEvaluated.toLocaleString()}
          </div>
          <div className="text-[10px] text-gray-500 mt-1">
            positions analyzed in game tree
          </div>
        </div>
        
        {/* Performance Indicator */}
        <div className="text-xs text-gray-500 text-center pt-2 border-t border-tactical-border">
          {lastDecision.elapsedMs < 100 ? '⚡ Lightning fast' : 
           lastDecision.elapsedMs < 500 ? '✓ Optimal speed' :
           lastDecision.elapsedMs < 1000 ? '⏱️ Deep analysis' :
           '🔍 Maximum depth'}
        </div>
      </div>
    </div>
  );
}
