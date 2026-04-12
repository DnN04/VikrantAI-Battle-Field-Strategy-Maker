import type { DecisionTreeNode } from '../../strategy/strategyEngine';

interface Props {
  result: DecisionTreeNode | null;
}

export function ReasoningPanel({ result }: Props) {
  if (!result) {
    return (
      <div className="tactical-panel p-6 text-gray-500">
        Run analysis to see AI reasoning...
      </div>
    );
  }

  const score = result.score;

  return (
    <div className="tactical-panel p-6 space-y-5">
      
      <h3 className="text-lg font-bold text-tactical-olive-300">
        🧠 AI REASONING
      </h3>

      {/* Final Decision */}
      <div className="bg-black/40 p-4 rounded">
        <div className="text-sm text-gray-400">Final Decision</div>
        <div className="text-xl font-bold text-white mt-1">
          {result.action}
        </div>
      </div>

      {/* Score */}
      <div className="bg-black/40 p-4 rounded">
        <div className="text-sm text-gray-400">Evaluation Score</div>
        <div className="text-lg font-mono text-white">
          {Math.round(score)}
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-black/40 p-4 rounded">
        <div className="text-sm text-gray-400 mb-2">Explanation</div>

        <ul className="text-sm text-gray-300 space-y-2">
          {score > 0 && <li>✅ AI has strategic advantage</li>}
          {score < 0 && <li>⚠️ Enemy advantage detected</li>}
          {score === 0 && <li>⚖️ Balanced battlefield</li>}

          <li>📊 Minimax evaluated future possibilities</li>
          <li>🔍 Best outcome selected assuming optimal enemy play</li>

          {result.isMaximizing
            ? <li>🤖 AI tried to maximize gain</li>
            : <li>🎯 Enemy tried to minimize AI advantage</li>
          }
        </ul>
      </div>

      {/* Alpha Beta Info */}
      {(result.alpha !== undefined && result.beta !== undefined) && (
        <div className="bg-black/40 p-4 rounded">
          <div className="text-sm text-gray-400 mb-2">
            Alpha-Beta Insight
          </div>
          <div className="text-sm text-gray-300">
            Alpha: {result.alpha}, Beta: {result.beta}
          </div>
        </div>
      )}
    </div>
  );
}