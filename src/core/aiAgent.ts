import { minimax } from './minimax';
import type { BattleState, Action } from './BattleState';
import { MINIMAX_CONFIG } from './constants';

export interface GetBestActionOptions {
  depth: number;
  usePruning: boolean;
}

export interface AIDecision {
  action: Action;
  score: number;
  nodesEvaluated: number;
  elapsedMs: number;
}

/**
 * AI Agent - High-level interface for getting best action
 * This is what the UI calls to get AI decisions
 */
export function getBestAction(
  state: BattleState,
  options: GetBestActionOptions
): AIDecision {
  const { depth, usePruning } = options;
  const startTime = performance.now();
  
  const nodesCount = { value: 0 };
  
  const result = minimax(
    state,
    depth,
    -MINIMAX_CONFIG.INFINITY,
    MINIMAX_CONFIG.INFINITY,
    true,
    nodesCount,
    usePruning
  );
  
  const elapsedMs = Math.round(performance.now() - startTime);
  
  return {
    action: result.action || 'DEFEND', // Fallback to DEFEND if no action found
    score: result.score,
    nodesEvaluated: result.nodesEvaluated,
    elapsedMs,
  };
}
