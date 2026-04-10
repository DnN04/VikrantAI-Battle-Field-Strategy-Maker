import type { BattleState, Position } from './BattleState';
import { getDistance } from './BattleState';
import { GRID_SIZE, UNIT_TYPES, TERRAIN_TYPES } from './constants';

/**
 * Enhanced heuristic function that evaluates board state
 * Returns higher scores for better positions for the AI
 */
export function heuristic(state: BattleState): number {
  let score = 0;
  
  // 1. Strength differential (most important)
  const strengthDiff = state.aiUnit.strength - state.enemyUnit.strength;
  score += strengthDiff * 2.0;
  
  // 2. Stamina differential
  const staminaDiff = state.aiUnit.stamina - state.enemyUnit.stamina;
  score += staminaDiff * 0.5;
  
  // 3. Position advantage
  score += evaluatePositionAdvantage(state) * 10;
  
  // 4. Terrain advantage
  score += evaluateTerrainAdvantage(state) * 15;
  
  // 5. Tactical positioning (distance, flanking)
  score += evaluateTacticalPosition(state) * 8;
  
  // 6. Unit type matchup
  score += evaluateUnitMatchup(state) * 5;
  
  // 7. Line of sight advantage
  score += evaluateLOSAdvantage(state) * 6;
  
  return score;
}

// Evaluate position advantage (center control, high ground)
function evaluatePositionAdvantage(state: BattleState): number {
  const center: Position = [GRID_SIZE / 2, GRID_SIZE / 2];
  
  const aiDistToCenter = getDistance(state.aiUnit.position, center);
  const enemyDistToCenter = getDistance(state.enemyUnit.position, center);
  
  // Closer to center is generally better
  return (enemyDistToCenter - aiDistToCenter);
}

// Evaluate terrain advantage
function evaluateTerrainAdvantage(state: BattleState): number {
  const aiTerrain = state.terrain[state.aiUnit.position[0]][state.aiUnit.position[1]];
  const enemyTerrain = state.terrain[state.enemyUnit.position[0]][state.enemyUnit.position[1]];
  
  const aiUnitType = UNIT_TYPES[state.aiUnit.type];
  const enemyUnitType = UNIT_TYPES[state.enemyUnit.type];
  
  // Get terrain bonuses for each unit
  const aiTerrainBonus = aiUnitType.terrainBonus[aiTerrain.type] || 0;
  const enemyTerrainBonus = enemyUnitType.terrainBonus[enemyTerrain.type] || 0;
  
  // Also consider terrain defense modifier
  const aiDefenseBonus = TERRAIN_TYPES[aiTerrain.type].defenseModifier;
  const enemyDefenseBonus = TERRAIN_TYPES[enemyTerrain.type].defenseModifier;
  
  return (aiTerrainBonus + aiDefenseBonus) - (enemyTerrainBonus + enemyDefenseBonus);
}

// Evaluate tactical positioning (distance management, flanking)
function evaluateTacticalPosition(state: BattleState): number {
  const distance = getDistance(state.aiUnit.position, state.enemyUnit.position);
  const aiUnitType = UNIT_TYPES[state.aiUnit.type];
  const enemyUnitType = UNIT_TYPES[state.enemyUnit.type];
  
  let score = 0;
  
  // Prefer optimal range for unit type
  const optimalRange = aiUnitType.attackRange;
  const rangeDiff = Math.abs(distance - optimalRange);
  score -= rangeDiff * 0.5; // Penalty for being out of optimal range
  
  // If we have longer range, keep distance
  if (aiUnitType.attackRange > enemyUnitType.attackRange) {
    if (distance >= aiUnitType.attackRange && distance > enemyUnitType.attackRange) {
      score += 3; // Bonus for kiting
    }
  }
  
  // Artillery should stay at long range
  if (state.aiUnit.type === 'ARTILLERY') {
    if (distance >= 3) {
      score += 2;
    } else {
      score -= 3; // Heavy penalty for being too close
    }
  }
  
  // Infantry should close distance
  if (state.aiUnit.type === 'INFANTRY') {
    if (distance <= 2) {
      score += 2;
    }
  }
  
  return score;
}

// Evaluate unit type matchup
function evaluateUnitMatchup(state: BattleState): number {
  const aiType = state.aiUnit.type;
  const enemyType = state.enemyUnit.type;
  
  // Rock-paper-scissors style matchups
  // Infantry > Artillery (can close distance)
  // Armor > Infantry (superior firepower)
  // Artillery > Armor (long range)
  
  if (aiType === 'INFANTRY' && enemyType === 'ARTILLERY') return 2;
  if (aiType === 'ARMOR' && enemyType === 'INFANTRY') return 2;
  if (aiType === 'ARTILLERY' && enemyType === 'ARMOR') return 2;
  
  if (aiType === 'ARTILLERY' && enemyType === 'INFANTRY') return -2;
  if (aiType === 'INFANTRY' && enemyType === 'ARMOR') return -2;
  if (aiType === 'ARMOR' && enemyType === 'ARTILLERY') return -2;
  
  return 0; // Same unit type
}

// Evaluate line of sight advantage
function evaluateLOSAdvantage(state: BattleState): number {
  // Check surrounding terrain for cover/exposure
  let score = 0;
  
  const aiPos = state.aiUnit.position;
  const enemyPos = state.enemyUnit.position;
  
  // Count adjacent cover for AI
  const aiCover = countAdjacentCover(aiPos, state);
  const enemyCover = countAdjacentCover(enemyPos, state);
  
  score += (aiCover - enemyCover) * 0.5;
  
  return score;
}

// Count adjacent cover cells (forest, hills)
function countAdjacentCover(pos: Position, state: BattleState): number {
  const [row, col] = pos;
  let count = 0;
  
  const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1], // Cardinal
    [-1, -1], [-1, 1], [1, -1], [1, 1], // Diagonal
  ];
  
  for (const [dr, dc] of directions) {
    const newRow = row + dr;
    const newCol = col + dc;
    
    if (newRow >= 0 && newRow < GRID_SIZE && newCol >= 0 && newCol < GRID_SIZE) {
      const terrain = state.terrain[newRow][newCol];
      if (terrain.type === 'FOREST' || terrain.type === 'HILLS') {
        count++;
      }
    }
  }
  
  return count;
}
