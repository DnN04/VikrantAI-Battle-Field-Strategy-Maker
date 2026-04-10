import type { BattleState, Action } from './BattleState';
import { heuristic } from './heuristic';
import { getPossibleActions, applyAction } from './actions';
import { MINIMAX_CONFIG } from './constants';

export interface MinimaxResult {
  score: number;
  action: Action | null;
  nodesEvaluated: number;
}

/**
 * Minimax algorithm with optional Alpha-Beta pruning
 * 
 * @param state - Current game state
 * @param depth - Remaining depth to search
 * @param alpha - Alpha value for pruning (best maximizer score)
 * @param beta - Beta value for pruning (best minimizer score)
 * @param isMaximizing - True if maximizing player (AI), false if minimizing (enemy)
 * @param nodesCount - Mutable counter for nodes evaluated
 * @param usePruning - Whether to use alpha-beta pruning
 */
export function minimax(
  state: BattleState,
  depth: number,
  alpha: number,
  beta: number,
  isMaximizing: boolean,
  nodesCount: { value: number },
  usePruning: boolean = true
): MinimaxResult {
  nodesCount.value++;
  
  // Terminal conditions
  const isTerminal = 
    depth === 0 || 
    state.aiUnit.strength <= 0 || 
    state.enemyUnit.strength <= 0 ||
    state.turn >= 50;
  
  if (isTerminal) {
    return {
      score: heuristic(state),
      action: null,
      nodesEvaluated: nodesCount.value,
    };
  }
  
  const actions = getPossibleActions(state);
  
  if (isMaximizing) {
    // AI's turn - maximize score
    let maxScore = -MINIMAX_CONFIG.INFINITY;
    let bestAction: Action | null = null;
    
    for (const action of actions) {
      const childState = applyAction(state, action);
      const result = minimax(
        childState,
        depth - 1,
        alpha,
        beta,
        false,
        nodesCount,
        usePruning
      );
      
      if (result.score > maxScore) {
        maxScore = result.score;
        bestAction = action;
      }
      
      if (usePruning) {
        alpha = Math.max(alpha, result.score);
        if (beta <= alpha) {
          break; // Beta cutoff
        }
      }
    }
    
    return {
      score: maxScore,
      action: bestAction,
      nodesEvaluated: nodesCount.value,
    };
  } else {
    // Enemy's turn - minimize score
    let minScore = MINIMAX_CONFIG.INFINITY;
    let bestAction: Action | null = null;
    
    for (const action of actions) {
      const childState = applyAction(state, action);
      const result = minimax(
        childState,
        depth - 1,
        alpha,
        beta,
        true,
        nodesCount,
        usePruning
      );
      
      if (result.score < minScore) {
        minScore = result.score;
        bestAction = action;
      }
      
      if (usePruning) {
        beta = Math.min(beta, result.score);
        if (beta <= alpha) {
          break; // Alpha cutoff
        }
      }
    }
    
    return {
      score: minScore,
      action: bestAction,
      nodesEvaluated: nodesCount.value,
    };
  }
}

/**
 * Minimax with iterative deepening (optional enhancement)
 * Searches progressively deeper, allowing for time-bounded search
 */
export function iterativeDeepeningMinimax(
  state: BattleState,
  maxDepth: number,
  timeLimit: number, // milliseconds
  usePruning: boolean = true
): MinimaxResult {
  const startTime = performance.now();
  let bestResult: MinimaxResult = {
    score: 0,
    action: null,
    nodesEvaluated: 0,
  };
  
  for (let depth = 1; depth <= maxDepth; depth++) {
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
    
    bestResult = result;
    
    // Check time limit
    const elapsed = performance.now() - startTime;
    if (elapsed >= timeLimit) {
      break;
    }
  }
  
  return bestResult;
}
