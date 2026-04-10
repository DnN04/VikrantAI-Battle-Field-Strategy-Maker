import type { BattleState, Action, Position, Unit } from './BattleState';
import { cloneState, getDistance, isInBounds, hasLineOfSight } from './BattleState';
import { UNIT_TYPES, ACTION_EFFECTS } from './constants';

// Get all possible actions for current state
export function getPossibleActions(_state: BattleState): Action[] {
  // All three actions are always available
  return ['ATTACK', 'DEFEND', 'RETREAT'];
}

// Apply an action to the state and return new state
export function applyAction(state: BattleState, action: Action): BattleState {
  const newState = cloneState(state);
  
  if (newState.isAiTurn) {
    // AI's turn
    executeAction(newState, newState.aiUnit, newState.enemyUnit, action);
  } else {
    // Enemy's turn
    executeAction(newState, newState.enemyUnit, newState.aiUnit, action);
  }
  
  newState.lastAction = action;
  newState.isAiTurn = !newState.isAiTurn;
  
  return newState;
}

// Execute the actual action logic
function executeAction(
  state: BattleState,
  attacker: Unit,
  defender: Unit,
  action: Action
): void {
  const attackerUnitType = UNIT_TYPES[attacker.type];
  const defenderUnitType = UNIT_TYPES[defender.type];
  
  const attackerTerrain = state.terrain[attacker.position[0]][attacker.position[1]];
  const defenderTerrain = state.terrain[defender.position[0]][defender.position[1]];
  
  const distance = getDistance(attacker.position, defender.position);
  
  switch (action) {
    case 'ATTACK': {
      // Check if target is in range
      if (distance <= attackerUnitType.attackRange) {
        // Check line of sight
        const hasLOS = hasLineOfSight(
          attacker.position,
          defender.position,
          state.terrain
        );
        
        // Calculate damage
        let damage = attackerUnitType.attackPower;
        
        // Apply terrain bonus for attacker
        const attackerTerrainBonus = attackerUnitType.terrainBonus[attackerTerrain.type] || 0;
        damage *= (1 + attackerTerrainBonus);
        
        // Apply terrain defense for defender
        const defenderTerrainBonus = defenderUnitType.terrainBonus[defenderTerrain.type] || 0;
        const defenseMultiplier = 1 - (defenderUnitType.defensePower / 100) - defenderTerrainBonus;
        
        damage *= defenseMultiplier;
        
        // Apply LOS penalty if blocked
        if (!hasLOS) {
          damage *= 0.6; // 40% penalty for obscured LOS
        }
        
        // Apply damage
        defender.strength = Math.max(0, defender.strength - damage);
        attacker.stamina = Math.max(0, attacker.stamina - ACTION_EFFECTS.ATTACK.staminaCost);
      } else {
        // Out of range - move closer
        moveTowards(attacker, defender.position, state);
      }
      break;
    }
    
    case 'DEFEND': {
      // Defensive stance - restore stamina and prepare for counter
      attacker.stamina = Math.min(100, attacker.stamina + 15);
      
      // Small counter-attack if enemy is close
      if (distance <= 2) {
        const counterDamage = attackerUnitType.defensePower * 0.5;
        defender.strength = Math.max(0, defender.strength - counterDamage);
      }
      break;
    }
    
    case 'RETREAT': {
      // Move away from enemy and recover
      moveAwayFrom(attacker, defender.position, state);
      attacker.strength = Math.min(100, attacker.strength + ACTION_EFFECTS.RETREAT.healthGain);
      attacker.stamina = Math.min(100, attacker.stamina + 10);
      break;
    }
  }
}

// Move unit towards target position
function moveTowards(unit: Unit, targetPos: Position, state: BattleState): void {
  const [currentRow, currentCol] = unit.position;
  const [targetRow, targetCol] = targetPos;
  
  const unitType = UNIT_TYPES[unit.type];
  let moved = false;
  
  // Try to move one step towards target
  const rowDiff = targetRow - currentRow;
  const colDiff = targetCol - currentCol;
  
  // Prioritize larger difference
  if (Math.abs(rowDiff) >= Math.abs(colDiff)) {
    const newRow = currentRow + (rowDiff > 0 ? 1 : -1);
    if (isInBounds([newRow, currentCol]) && canMoveTo(state, [newRow, currentCol], unitType)) {
      unit.position = [newRow, currentCol];
      moved = true;
    }
  }
  
  if (!moved && colDiff !== 0) {
    const newCol = currentCol + (colDiff > 0 ? 1 : -1);
    if (isInBounds([currentRow, newCol]) && canMoveTo(state, [currentRow, newCol], unitType)) {
      unit.position = [currentRow, newCol];
    }
  }
}

// Move unit away from target position
function moveAwayFrom(unit: Unit, targetPos: Position, state: BattleState): void {
  const [currentRow, currentCol] = unit.position;
  const [targetRow, targetCol] = targetPos;
  
  const unitType = UNIT_TYPES[unit.type];
  
  // Move opposite direction
  const rowDiff = currentRow - targetRow;
  const colDiff = currentCol - targetCol;
  
  let moved = false;
  
  if (Math.abs(rowDiff) >= Math.abs(colDiff)) {
    const newRow = currentRow + (rowDiff > 0 ? 1 : -1);
    if (isInBounds([newRow, currentCol]) && canMoveTo(state, [newRow, currentCol], unitType)) {
      unit.position = [newRow, currentCol];
      moved = true;
    }
  }
  
  if (!moved && colDiff !== 0) {
    const newCol = currentCol + (colDiff > 0 ? 1 : -1);
    if (isInBounds([currentRow, newCol]) && canMoveTo(state, [currentRow, newCol], unitType)) {
      unit.position = [currentRow, newCol];
    }
  }
}

// Check if unit can move to a position
function canMoveTo(
  state: BattleState,
  pos: Position,
  unitType: typeof UNIT_TYPES[keyof typeof UNIT_TYPES]
): boolean {
  const [row, col] = pos;
  const terrain = state.terrain[row][col];
  
  // Check if terrain is passable for this unit type
  const terrainBonus = unitType.terrainBonus[terrain.type];
  
  // Water is mostly impassable
  if (terrain.type === 'WATER' && terrainBonus < -0.7) {
    return false;
  }
  
  return true;
}
