import type { BattleState } from '../core/BattleState';
import { MAX_TURNS } from '../core/constants';

export type Winner = 'AI' | 'Enemy' | 'Draw' | null;

/**
 * Check if game is over and who won
 */
export function checkWinner(state: BattleState): Winner {
  // AI wins if enemy strength is 0
  if (state.enemyUnit.strength <= 0) {
    return 'AI';
  }
  
  // Enemy wins if AI strength is 0
  if (state.aiUnit.strength <= 0) {
    return 'Enemy';
  }
  
  // Draw if max turns reached
  if (state.turn >= MAX_TURNS) {
    // Winner is whoever has more strength
    if (state.aiUnit.strength > state.enemyUnit.strength) {
      return 'AI';
    } else if (state.enemyUnit.strength > state.aiUnit.strength) {
      return 'Enemy';
    } else {
      return 'Draw';
    }
  }
  
  // Game continues
  return null;
}
