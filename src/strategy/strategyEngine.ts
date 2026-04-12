// import type { BattleState, Action } from '../core/BattleState';
// import { minimax } from '../core/minimax';
// import { MINIMAX_CONFIG } from '../core/constants';
// import { applyAction } from '../core/actions';

// export type StrategyDecision = 'ATTACK' | 'DEFEND' | 'NEUTRAL';

// export interface DecisionTreeNode {
//   id: string;
//   state: BattleState;
//   action: Action | null;
//   score: number;
//   depth: number;
//   isMaximizing: boolean;
//   children: DecisionTreeNode[];
//   isPruned: boolean;
//   alpha: number;
//   beta: number;
//   evaluationOrder: number; // For animation
// }

// export interface StrategyResult {
//   decision: StrategyDecision;
//   confidence: number; // 0-100
//   score: number;
//   reasoning: string[];
//   alternativeScores: {
//     attack: number;
//     defend: number;
//     retreat: number;
//   };
//   nodesEvaluated: number;
//   decisionTree: DecisionTreeNode;
//   executionTimeMs: number;
// }

// /**
//  * Generate strategic decision with full tree capture
//  */
// export function generateStrategy(
//   state: BattleState,
//   depth: number,
//   usePruning: boolean
// ): StrategyResult {
//   const startTime = performance.now();
  
//   // Capture decision tree
//   const tree = buildDecisionTree(state, depth, usePruning);
  
//   // Evaluate all three actions
//   const scores = {
//     attack: evaluateAction(state, 'ATTACK', depth, usePruning),
//     defend: evaluateAction(state, 'DEFEND', depth, usePruning),
//     retreat: evaluateAction(state, 'RETREAT', depth, usePruning),
//   };
  
//   // Determine best action
//   const bestAction = Object.entries(scores).reduce((best, [action, score]) => 
//     score > best.score ? { action: action as Action, score } : best,
//     { action: 'DEFEND' as Action, score: -Infinity }
//   );
  
//   // Map to strategic decision
//   const decision = mapToStrategy(bestAction.action, bestAction.score, scores);
  
//   // Calculate confidence based on score differential
//   const scoreDiff = Math.abs(bestAction.score - getSecondBest(scores, bestAction.action));
//   const confidence = Math.min(100, Math.max(0, (scoreDiff / 50) * 100));
  
//   // Generate reasoning
//   const reasoning = generateReasoning(state, decision, scores, bestAction.score);
  
//   const executionTimeMs = Math.round(performance.now() - startTime);
  
//   return {
//     decision,
//     confidence: Math.round(confidence),
//     score: bestAction.score,
//     reasoning,
//     alternativeScores: scores,
//     nodesEvaluated: tree.evaluationOrder,
//     decisionTree: tree,
//     executionTimeMs,
//   };
// }

// /**
//  * Build complete decision tree for visualization
//  */
// function buildDecisionTree(
//   state: BattleState,
//   maxDepth: number,
//   usePruning: boolean
// ): DecisionTreeNode {
//   let evaluationCounter = 0;
  
//   function buildNode(
//     currentState: BattleState,
//     depth: number,
//     alpha: number,
//     beta: number,
//     isMaximizing: boolean,
//     parentAction: Action | null
//   ): DecisionTreeNode {
//     evaluationCounter++;
//     const nodeId = `node-${evaluationCounter}`;
    
//     const node: DecisionTreeNode = {
//       id: nodeId,
//       state: currentState,
//       action: parentAction,
//       score: 0,
//       depth: maxDepth - depth,
//       isMaximizing,
//       children: [],
//       isPruned: false,
//       alpha,
//       beta,
//       evaluationOrder: evaluationCounter,
//     };
    
//     // Terminal node
//     if (depth === 0 || currentState.aiUnit.strength <= 0 || currentState.enemyUnit.strength <= 0) {
//       const nodesCount = { value: 0 };
//       const result = minimax(currentState, 0, alpha, beta, isMaximizing, nodesCount, false);
//       node.score = result.score;
//       return node;
//     }
    
//     // Expand children
//     const actions: Action[] = ['ATTACK', 'DEFEND', 'RETREAT'];
    
//     if (isMaximizing) {
//       let maxScore = -MINIMAX_CONFIG.INFINITY;
      
//       for (const action of actions) {
//         const childState = applyAction(currentState, action);
        
//         const child = buildNode(childState, depth - 1, alpha, beta, false, action);
//         node.children.push(child);
        
//         maxScore = Math.max(maxScore, child.score);
//         alpha = Math.max(alpha, child.score);
        
//         // Pruning
//         if (usePruning && beta <= alpha) {
//           // Mark remaining children as pruned
//           const remainingActions = actions.slice(actions.indexOf(action) + 1);
//           for (const prunedAction of remainingActions) {
//             evaluationCounter++;
//             node.children.push({
//               id: `pruned-${evaluationCounter}`,
//               state: currentState,
//               action: prunedAction,
//               score: 0,
//               depth: maxDepth - depth + 1,
//               isMaximizing: false,
//               children: [],
//               isPruned: true,
//               alpha,
//               beta,
//               evaluationOrder: evaluationCounter,
//             });
//           }
//           break;
//         }
//       }
      
//       node.score = maxScore;
//     } else {
//       let minScore = MINIMAX_CONFIG.INFINITY;
      
//       for (const action of actions) {
//         // const { applyAction } = require('../core/actions');
//         const childState = applyAction(currentState, action);
        
//         const child = buildNode(childState, depth - 1, alpha, beta, true, action);
//         node.children.push(child);
        
//         minScore = Math.min(minScore, child.score);
//         beta = Math.min(beta, child.score);
        
//         // Pruning
//         if (usePruning && beta <= alpha) {
//           const remainingActions = actions.slice(actions.indexOf(action) + 1);
//           for (const prunedAction of remainingActions) {
//             evaluationCounter++;
//             node.children.push({
//               id: `pruned-${evaluationCounter}`,
//               state: currentState,
//               action: prunedAction,
//               score: 0,
//               depth: maxDepth - depth + 1,
//               isMaximizing: true,
//               children: [],
//               isPruned: true,
//               alpha,
//               beta,
//               evaluationOrder: evaluationCounter,
//             });
//           }
//           break;
//         }
//       }
      
//       node.score = minScore;
//     }
    
//     return node;
//   }
  
//   return buildNode(state, maxDepth, -MINIMAX_CONFIG.INFINITY, MINIMAX_CONFIG.INFINITY, true, null);
// }

// /**
//  * Evaluate single action
//  */
// function evaluateAction(state: BattleState, action: Action, depth: number, usePruning: boolean): number {
// //   const { applyAction } = require('../core/actions');
//   const newState = applyAction(state, action);
//   const nodesCount = { value: 0 };
//   const result = minimax(newState, depth - 1, -MINIMAX_CONFIG.INFINITY, MINIMAX_CONFIG.INFINITY, false, nodesCount, usePruning);
//   return result.score;
// }

// /**
//  * Map action to strategic decision
//  */
// function mapToStrategy(action: Action, score: number, allScores: { attack: number; defend: number; retreat: number }): StrategyDecision {
//   // If score is very negative, defensive
//   if (score < -20) {
//     return 'DEFEND';
//   }
  
//   // If score is very positive, offensive
//   if (score > 20) {
//     return 'ATTACK';
//   }
  
//   // If all scores are similar, neutral
//   const scoreRange = Math.max(...Object.values(allScores)) - Math.min(...Object.values(allScores));
//   if (scoreRange < 10) {
//     return 'NEUTRAL';
//   }
  
//   // Otherwise map directly
//   if (action === 'ATTACK') return 'ATTACK';
//   if (action === 'DEFEND' || action === 'RETREAT') return 'DEFEND';
  
//   return 'NEUTRAL';
// }

// /**
//  * Get second best score
//  */
// function getSecondBest(scores: { attack: number; defend: number; retreat: number }, bestAction: Action): number {
//   const sortedScores = Object.entries(scores)
//     .filter(([action]) => action !== bestAction.toLowerCase())
//     .map(([_, score]) => score)
//     .sort((a, b) => b - a);
  
//   return sortedScores[0] || 0;
// }

// /**
//  * Generate human-readable reasoning
//  */
// function generateReasoning(
//   state: BattleState,
//   decision: StrategyDecision,
//   scores: { attack: number; defend: number; retreat: number },
//   finalScore: number
// ): string[] {
//   const reasoning: string[] = [];
  
//   // Overall assessment
//   if (finalScore > 50) {
//     reasoning.push('🟢 Strong tactical advantage detected');
//   } else if (finalScore > 0) {
//     reasoning.push('🟡 Slight advantage in current position');
//   } else if (finalScore > -50) {
//     reasoning.push('🟠 Disadvantageous position');
//   } else {
//     reasoning.push('🔴 Critical disadvantage - defensive action recommended');
//   }
  
//   // Decision rationale
//   switch (decision) {
//     case 'ATTACK':
//       reasoning.push('✓ Offensive strategy recommended: favorable position for engagement');
//       if (scores.attack - scores.defend > 20) {
//         reasoning.push('✓ Attack significantly outscores defensive options');
//       }
//       break;
    
//     case 'DEFEND':
//       reasoning.push('✓ Defensive strategy recommended: preserve strength and position');
//       if (finalScore < 0) {
//         reasoning.push('✓ Enemy has tactical advantage - avoid direct engagement');
//       }
//       break;
    
//     case 'NEUTRAL':
//       reasoning.push('✓ Neutral stance recommended: no clear advantage in aggressive action');
//       reasoning.push('✓ Similar outcomes across all actions - maintain flexibility');
//       break;
//   }
  
//   // Unit & terrain factors
//   const aiTerrain = state.terrain[state.aiUnit.position[0]][state.aiUnit.position[1]];
//   const enemyTerrain = state.terrain[state.enemyUnit.position[0]][state.enemyUnit.position[1]];
  
//   if (aiTerrain.type === 'HILLS' && state.aiUnit.type === 'ARTILLERY') {
//     reasoning.push('✓ Artillery on high ground - significant range advantage');
//   }
  
//   if (enemyTerrain.type === 'FOREST') {
//     reasoning.push('⚠ Enemy in forest cover - attack effectiveness reduced');
//   }
  
//   // Strength comparison
//   const strengthDiff = state.aiUnit.strength - state.enemyUnit.strength;
//   if (Math.abs(strengthDiff) > 30) {
//     reasoning.push(strengthDiff > 0 
//       ? '✓ Significant strength advantage over enemy' 
//       : '⚠ Enemy has significant strength advantage');
//   }
  
//   return reasoning;
// }
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

export function generateStrategy(
  state: BattleState,
  depth: number,
  usePruning: boolean
): StrategyResult {
  const startTime = performance.now();

  // ✅ Normalize terrain (FIXES FOREST ISSUE)
  state.terrain.forEach(row =>
    row.forEach(cell => {
    //   cell.type = cell.type.toUpperCase();
      cell.type = cell.type.toUpperCase() as typeof cell.type;
    })
  );

  const tree = buildDecisionTree(state, depth, usePruning);

  const scores = {
    attack: evaluateAction(state, 'ATTACK', depth, usePruning),
    defend: evaluateAction(state, 'DEFEND', depth, usePruning),
    retreat: evaluateAction(state, 'RETREAT', depth, usePruning),
  };

  console.log("Scores:", scores); // 🔥 debug

  const bestAction = Object.entries(scores).reduce((best, [action, score]) =>
    score > best.score ? { action: action as Action, score } : best,
    { action: 'DEFEND' as Action, score: -Infinity }
  );

  const decision = mapToStrategy(bestAction.action, bestAction.score, scores);

  const scoreDiff = Math.abs(bestAction.score - getSecondBest(scores, bestAction.action));
  const confidence = Math.min(100, Math.max(0, (scoreDiff / 50) * 100));

  const reasoning = generateReasoning(state, decision, scores, bestAction.score);

  const executionTimeMs = Math.round(performance.now() - startTime);

  return {
    decision,
    confidence: Math.round(confidence),
    score: bestAction.score,
    reasoning,
    alternativeScores: scores,
    nodesEvaluated: tree.evaluationOrder,
    decisionTree: tree,
    executionTimeMs,
  };
}

function buildDecisionTree(
  state: BattleState,
  maxDepth: number,
  usePruning: boolean
): DecisionTreeNode {
  let evaluationCounter = 0;

  function buildNode(
    currentState: BattleState,
    depth: number,
    alpha: number,
    beta: number,
    isMaximizing: boolean,
    parentAction: Action | null
  ): DecisionTreeNode {
    evaluationCounter++;

    const node: DecisionTreeNode = {
      id: `node-${evaluationCounter}`,
      state: currentState,
      action: parentAction,
      score: 0,
      depth: maxDepth - depth,
      isMaximizing,
      children: [],
      isPruned: false,
      alpha,
      beta,
      evaluationOrder: evaluationCounter,
    };

    if (depth === 0) {
      const nodesCount = { value: 0 };
      const result = minimax(currentState, 0, alpha, beta, isMaximizing, nodesCount, false);
      node.score = result.score;
      return node;
    }

    const actions: Action[] = ['ATTACK', 'DEFEND', 'RETREAT'];

    if (isMaximizing) {
      let maxScore = -MINIMAX_CONFIG.INFINITY;

      for (const action of actions) {
        const childState = applyAction(currentState, action);
        const child = buildNode(childState, depth - 1, alpha, beta, false, action);

        node.children.push(child);
        maxScore = Math.max(maxScore, child.score);
        alpha = Math.max(alpha, child.score);

        if (usePruning && beta <= alpha) break;
      }

      node.score = maxScore;
    } else {
      let minScore = MINIMAX_CONFIG.INFINITY;

      for (const action of actions) {
        const childState = applyAction(currentState, action);
        const child = buildNode(childState, depth - 1, alpha, beta, true, action);

        node.children.push(child);
        minScore = Math.min(minScore, child.score);
        beta = Math.min(beta, child.score);

        if (usePruning && beta <= alpha) break;
      }

      node.score = minScore;
    }

    return node;
  }

  return buildNode(state, maxDepth, -MINIMAX_CONFIG.INFINITY, MINIMAX_CONFIG.INFINITY, true, null);
}

function evaluateAction(state: BattleState, action: Action, depth: number, usePruning: boolean): number {
  const newState = applyAction(state, action);
  const nodesCount = { value: 0 };
  const result = minimax(
    newState,
    depth - 1,
    -MINIMAX_CONFIG.INFINITY,
    MINIMAX_CONFIG.INFINITY,
    false,
    nodesCount,
    usePruning
  );
  return result.score;
}

function mapToStrategy(action: Action, score: number, allScores: { attack: number; defend: number; retreat: number }): StrategyDecision {
  if (score < -20) return 'DEFEND';
  if (score > 20) return 'ATTACK';

  const scoreRange = Math.max(...Object.values(allScores)) - Math.min(...Object.values(allScores));
  if (scoreRange < 10) return 'NEUTRAL';

  if (action === 'ATTACK') return 'ATTACK';
  return 'DEFEND';
}

function getSecondBest(scores: { attack: number; defend: number; retreat: number }, bestAction: Action): number {
  const sorted = Object.entries(scores)
    .filter(([action]) => action !== bestAction.toLowerCase())
    .map(([_, score]) => score)
    .sort((a, b) => b - a);

  return sorted[0] || 0;
}

function generateReasoning(
  state: BattleState,
  decision: StrategyDecision,
  scores: { attack: number; defend: number; retreat: number },
  finalScore: number
): string[] {
  const reasoning: string[] = [];

  if (finalScore > 50) reasoning.push('🟢 Strong tactical advantage');
  else if (finalScore > 0) reasoning.push('🟡 Slight advantage');
  else if (finalScore > -50) reasoning.push('🟠 Weak position');
  else reasoning.push('🔴 Critical danger');

  switch (decision) {
    case 'ATTACK':
      reasoning.push('✓ Offensive move recommended');
      break;
    case 'DEFEND':
      reasoning.push('✓ Defensive stance advised');
      break;
    case 'NEUTRAL':
      reasoning.push('✓ Balanced situation');
      break;
  }

  const aiTerrain = state.terrain[state.aiUnit.position[0]][state.aiUnit.position[1]].type;
  const enemyTerrain = state.terrain[state.enemyUnit.position[0]][state.enemyUnit.position[1]].type;

  if ((aiTerrain as string) === 'HILL') {
    reasoning.push('✓ High ground advantage');
  }

  if (enemyTerrain === 'FOREST') {
    reasoning.push('⚠ Enemy hidden in forest');
  }

  return reasoning;
}