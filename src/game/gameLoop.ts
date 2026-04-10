import type { BattleState, Action } from '../core/BattleState';
import { applyAction } from '../core/actions';

export interface TurnResult {
  newState: BattleState;
  logEntry: string;
}

/**
 * Process a turn - apply action and generate log entry
 */
export function processTurn(state: BattleState, action: Action): TurnResult {
  const newState = applyAction(state, action);
  
  const actor = state.isAiTurn ? 'AI' : 'Enemy';
  const actorUnit = state.isAiTurn ? state.aiUnit : state.enemyUnit;
  const targetUnit = state.isAiTurn ? state.enemyUnit : state.aiUnit;
  
  let logEntry = '';
  
  switch (action) {
    case 'ATTACK':
      logEntry = `Turn ${state.turn}: ${actor} (${actorUnit.type}) attacked! Enemy HP: ${Math.round(targetUnit.strength)} → ${Math.round(newState.isAiTurn ? newState.enemyUnit.strength : newState.aiUnit.strength)}`;
      break;
    case 'DEFEND':
      logEntry = `Turn ${state.turn}: ${actor} (${actorUnit.type}) took defensive stance. Stamina restored.`;
      break;
    case 'RETREAT':
      logEntry = `Turn ${state.turn}: ${actor} (${actorUnit.type}) retreated to recover. HP: ${Math.round(actorUnit.strength)} → ${Math.round(newState.isAiTurn ? newState.enemyUnit.strength : newState.aiUnit.strength)}`;
      break;
  }
  
  return { newState, logEntry };
}
