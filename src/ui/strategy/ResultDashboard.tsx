import { Target, TrendingUp, Clock, Activity, AlertTriangle, CheckCircle } from 'lucide-react';
import type { StrategyResult } from '../../strategy/strategyEngine';

interface ResultDashboardProps {
  result: StrategyResult;
}

export function ResultDashboard({ result }: ResultDashboardProps) {
  const decisionColors = {
    ATTACK: {
      bg: 'bg-tactical-red/20',
      border: 'border-tactical-red',
      text: 'text-tactical-red',
      glow: 'glow-red',
      icon: '⚔️',
      gradient: 'from-tactical-red/30 to-tactical-red/10',
    },
    DEFEND: {
      bg: 'bg-tactical-blue/20',
      border: 'border-tactical-blue',
      text: 'text-tactical-blue',
      glow: 'glow-blue',
      icon: '🛡️',
      gradient: 'from-tactical-blue/30 to-tactical-blue/10',
    },
    NEUTRAL: {
      bg: 'bg-tactical-olive-900/20',
      border: 'border-tactical-olive-500',
      text: 'text-tactical-olive-300',
      glow: '',
      icon: '⚖️',
      gradient: 'from-tactical-olive-900/30 to-tactical-olive-900/10',
    },
  };

  const theme = decisionColors[result.decision];

  return (
    <div className="space-y-6">
      {/* Main Decision Card */}
      <div className={`tactical-panel p-8 border-2 ${theme.border} ${theme.glow}`}>
        <div className="text-center space-y-4">
          <div className="text-xs text-gray-500 uppercase tracking-widest">
            STRATEGIC RECOMMENDATION
          </div>
          
          <div className={`text-7xl font-bold ${theme.text} tracking-tight flex items-center justify-center gap-4`}>
            <span className="text-8xl">{theme.icon}</span>
            {result.decision}
          </div>
          
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <TrendingUp className="w-4 h-4" />
              <span>Confidence:</span>
              <span className={`font-bold ${theme.text}`}>{result.confidence}%</span>
            </div>
            
            <div className="w-px h-4 bg-tactical-border" />
            
            <div className="flex items-center gap-2 text-gray-400">
              <Target className="w-4 h-4" />
              <span>Score:</span>
              <span className={`font-mono font-bold ${theme.text}`}>
                {result.score > 0 ? '+' : ''}{Math.round(result.score)}
              </span>
            </div>
          </div>

          {/* Confidence Bar */}
          <div className="w-full max-w-md mx-auto">
            <div className="h-3 bg-black/40 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${theme.gradient} transition-all duration-1000`}
                style={{ width: `${result.confidence}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tactical Analysis Grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Attack Score */}
        <div className="tactical-panel p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-tactical-red" />
            <span className="text-xs text-gray-400 uppercase tracking-wide">Attack</span>
          </div>
          <div className="text-2xl font-mono font-bold text-white">
            {result.alternativeScores.attack > 0 ? '+' : ''}{Math.round(result.alternativeScores.attack)}
          </div>
          <div className="mt-2 h-1 bg-black/40 rounded overflow-hidden">
            <div 
              className="h-full bg-tactical-red"
              style={{ 
                width: `${Math.min(100, Math.max(0, ((result.alternativeScores.attack + 100) / 200) * 100))}%` 
              }}
            />
          </div>
        </div>

        {/* Defend Score */}
        <div className="tactical-panel p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-tactical-blue" />
            <span className="text-xs text-gray-400 uppercase tracking-wide">Defend</span>
          </div>
          <div className="text-2xl font-mono font-bold text-white">
            {result.alternativeScores.defend > 0 ? '+' : ''}{Math.round(result.alternativeScores.defend)}
          </div>
          <div className="mt-2 h-1 bg-black/40 rounded overflow-hidden">
            <div 
              className="h-full bg-tactical-blue"
              style={{ 
                width: `${Math.min(100, Math.max(0, ((result.alternativeScores.defend + 100) / 200) * 100))}%` 
              }}
            />
          </div>
        </div>

        {/* Retreat Score */}
        <div className="tactical-panel p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-tactical-olive-500" />
            <span className="text-xs text-gray-400 uppercase tracking-wide">Retreat</span>
          </div>
          <div className="text-2xl font-mono font-bold text-white">
            {result.alternativeScores.retreat > 0 ? '+' : ''}{Math.round(result.alternativeScores.retreat)}
          </div>
          <div className="mt-2 h-1 bg-black/40 rounded overflow-hidden">
            <div 
              className="h-full bg-tactical-olive-500"
              style={{ 
                width: `${Math.min(100, Math.max(0, ((result.alternativeScores.retreat + 100) / 200) * 100))}%` 
              }}
            />
          </div>
        </div>
      </div>

      {/* Reasoning Panel */}
      <div className="tactical-panel p-6">
        <div className="flex items-center gap-2 border-b border-tactical-olive-700 pb-3 mb-4">
          <CheckCircle className="w-5 h-5 text-tactical-olive-400" />
          <h3 className="text-lg font-bold text-tactical-olive-300 tracking-wide">
            TACTICAL REASONING
          </h3>
        </div>

        <div className="space-y-3">
          {result.reasoning.map((reason, index) => (
            <div 
              key={index}
              className="flex items-start gap-3 text-sm p-3 bg-black/20 rounded border border-tactical-olive-800/50 hover:border-tactical-olive-700 transition-colors"
            >
              <div className="text-lg mt-0.5">
                {reason.startsWith('🟢') && '🟢'}
                {reason.startsWith('🟡') && '🟡'}
                {reason.startsWith('🟠') && '🟠'}
                {reason.startsWith('🔴') && '🔴'}
                {reason.startsWith('✓') && <CheckCircle className="w-4 h-4 text-tactical-olive-400" />}
                {reason.startsWith('⚠') && <AlertTriangle className="w-4 h-4 text-tactical-orange" />}
              </div>
              <div className="text-gray-300 leading-relaxed flex-1">
                {reason.replace(/^[🟢🟡🟠🔴✓⚠]\s*/, '')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="tactical-panel p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-400 uppercase">Nodes Evaluated</span>
          </div>
          <div className="text-3xl font-mono font-bold text-tactical-olive-300">
            {result.nodesEvaluated.toLocaleString()}
          </div>
          <div className="text-xs text-gray-600 mt-1">
            positions analyzed in decision tree
          </div>
        </div>

        <div className="tactical-panel p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-400 uppercase">Computation Time</span>
          </div>
          <div className="text-3xl font-mono font-bold text-tactical-olive-300">
            {result.executionTimeMs}ms
          </div>
          <div className="text-xs text-gray-600 mt-1">
            {result.executionTimeMs < 100 ? '⚡ Lightning fast' :
             result.executionTimeMs < 500 ? '✓ Optimal speed' :
             result.executionTimeMs < 1000 ? '⏱️ Deep analysis' :
             '🔍 Maximum depth'}
          </div>
        </div>
      </div>
    </div>
  );
}