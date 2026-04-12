import type { BattleState, Action } from '../core/BattleState';
import { minimax } from '../core/minimax';
import { MINIMAX_CONFIG } from '../core/constants';
import { applyAction } from '../core/actions';

export type StrategyDecision = 'ATTACK' | 'DEFEND' | 'NEUTRAL';

export interface DecisionTreeNode {
  id: string;
  state: BattleState;
  action: Action | null;
  score: number;
  depth: number;
  isMaximizing: boolean;
  children: DecisionTreeNode[];
  isPruned: boolean;
  alpha: number;
  beta: number;
  evaluationOrder: number;
}

export interface StrategyResult {
  decision: StrategyDecision;
  confidence: number;
  score: number;
  reasoning: string[];
  alternativeScores: {
    attack: number;
    defend: number;
    retreat: number;
  };
  nodesEvaluated: number;
  decisionTree: DecisionTreeNode;
  executionTimeMs: number;
}

/**
 * MAIN FUNCTION
 */
export function generateStrategy(
  state: BattleState,
  depth: number,
  usePruning: boolean
): StrategyResult {
  const startTime = performance.now();

  const tree = buildDecisionTree(state, depth, usePruning);

  const scores = {
    attack: evaluateAction(state, 'ATTACK', depth, usePruning),
    defend: evaluateAction(state, 'DEFEND', depth, usePruning),
    retreat: evaluateAction(state, 'RETREAT', depth, usePruning),
  };

  // ✅ Get best action
  const bestAction = Object.entries(scores).reduce(
    (best, [action, score]) =>
      score > best.score ? { action: action as Action, score } : best,
    { action: 'DEFEND' as Action, score: -Infinity }
  );

  const decision = mapToStrategy(bestAction.action, bestAction.score, scores);

  const scoreDiff = Math.abs(
    bestAction.score - getSecondBest(scores, bestAction.action)
  );

  const confidence = Math.min(100, (scoreDiff / 50) * 100);

  const reasoning = generateReasoning(
    state,
    decision,
    scores,
    bestAction.score
  );

  return {
    decision,
    confidence: Math.round(confidence),
    score: bestAction.score,
    reasoning,
    alternativeScores: scores,
    nodesEvaluated: tree.evaluationOrder,
    decisionTree: tree,
    executionTimeMs: Math.round(performance.now() - startTime),
  };
}

/**
 * BUILD TREE (for visualization)
 */
function buildDecisionTree(
  state: BattleState,
  maxDepth: number,
  usePruning: boolean
): DecisionTreeNode {
  let counter = 0;

  function build(
    current: BattleState,
    depth: number,
    alpha: number,
    beta: number,
    isMax: boolean,
    action: Action | null
  ): DecisionTreeNode {
    counter++;

    const node: DecisionTreeNode = {
      id: `node-${counter}`,
      state: current,
      action,
      score: 0,
      depth: maxDepth - depth,
      isMaximizing: isMax,
      children: [],
      isPruned: false,
      alpha,
      beta,
      evaluationOrder: counter,
    };

    if (depth === 0) {
      const count = { value: 0 };
      node.score = minimax(current, 0, alpha, beta, isMax, count, false).score;
      return node;
    }

    const actions: Action[] = ['ATTACK', 'DEFEND', 'RETREAT'];

    if (isMax) {
      let best = -MINIMAX_CONFIG.INFINITY;

      for (const act of actions) {
        const child = build(
          applyAction(current, act),
          depth - 1,
          alpha,
          beta,
          false,
          act
        );

        node.children.push(child);
        best = Math.max(best, child.score);
        alpha = Math.max(alpha, child.score);

        if (usePruning && beta <= alpha) break;
      }

      node.score = best;
    } else {
      let best = MINIMAX_CONFIG.INFINITY;

      for (const act of actions) {
        const child = build(
          applyAction(current, act),
          depth - 1,
          alpha,
          beta,
          true,
          act
        );

        node.children.push(child);
        best = Math.min(best, child.score);
        beta = Math.min(beta, child.score);

        if (usePruning && beta <= alpha) break;
      }

      node.score = best;
    }

    return node;
  }

  return build(
    state,
    maxDepth,
    -MINIMAX_CONFIG.INFINITY,
    MINIMAX_CONFIG.INFINITY,
    true,
    null
  );
}

/**
 * Evaluate one action
 */
function evaluateAction(
  state: BattleState,
  action: Action,
  depth: number,
  usePruning: boolean
): number {
  const next = applyAction(state, action);
  const count = { value: 0 };

  return minimax(
    next,
    depth - 1,
    -MINIMAX_CONFIG.INFINITY,
    MINIMAX_CONFIG.INFINITY,
    false,
    count,
    usePruning
  ).score;
}

/**
 * FINAL DECISION LOGIC (balanced)
 */
function mapToStrategy(
  action: Action,
  score: number,
  scores: { attack: number; defend: number; retreat: number }
): StrategyDecision {
  const { attack, defend, retreat } = scores;

  if (score < -20) return 'DEFEND';

  if (score > 40 && attack === score) return 'ATTACK';

  const range = Math.max(attack, defend, retreat) - Math.min(attack, defend, retreat);

  if (range < 15) return 'NEUTRAL';

  if (action === 'ATTACK') return 'ATTACK';
  if (action === 'DEFEND') return 'DEFEND';

  return 'NEUTRAL';
}

/**
 * Second best score
 */
function getSecondBest(
  scores: { attack: number; defend: number; retreat: number },
  best: Action
): number {
  return Object.entries(scores)
    .filter(([a]) => a !== best.toLowerCase())
    .map(([, s]) => s)
    .sort((a, b) => b - a)[0] || 0;
}

/**
 * Reasoning (simple + clean)
 */
function generateReasoning(
  state: BattleState,
  decision: StrategyDecision,
  scores: any,
  score: number
): string[] {
  const r: string[] = [];

  if (score > 50) r.push('🟢 Strong advantage');
  else if (score > 0) r.push('🟡 Slight advantage');
  else if (score > -50) r.push('🟠 Weak position');
  else r.push('🔴 Critical danger');

  if (decision === 'ATTACK') r.push('✓ Attack is optimal');
  if (decision === 'DEFEND') r.push('✓ Defense is safer');
  if (decision === 'NEUTRAL') r.push('✓ Situation balanced');

  return r;
}