import { GRID_SIZE } from './constants';

// Action types
export type Action = 'ATTACK' | 'DEFEND' | 'RETREAT';

// Unit types
export type UnitType = 'INFANTRY' | 'ARMOR' | 'ARTILLERY';

// Terrain types
export type TerrainType = 'PLAINS' | 'FOREST' | 'HILLS' | 'WATER';

// Position on grid
export type Position = [number, number]; // [row, col]

// Unit interface
export interface Unit {
  type: UnitType;
  strength: number;
  position: Position;
  stamina: number; // New: stamina for actions
}

// Terrain cell
export interface TerrainCell {
  type: TerrainType;
  position: Position;
}

// Main battle state
export interface BattleState {
  aiUnit: Unit;
  enemyUnit: Unit;
  terrain: TerrainCell[][]; // 2D grid of terrain
  turn: number;
  isAiTurn: boolean;
  lastAction?: Action;
}

// Helper: Create initial state
export function getInitialState(): BattleState {
  return {
    aiUnit: {
      type: 'INFANTRY',
      strength: 100,
      position: [1, 1],
      stamina: 100,
    },
    enemyUnit: {
      type: 'ARMOR',
      strength: 100,
      position: [8, 8],
      stamina: 100,
    },
    terrain: generateTerrain(),
    turn: 1,
    isAiTurn: true,
  };
}

// Generate procedural terrain
function generateTerrain(): TerrainCell[][] {
  const terrain: TerrainCell[][] = [];
  
  for (let row = 0; row < GRID_SIZE; row++) {
    terrain[row] = [];
    for (let col = 0; col < GRID_SIZE; col++) {
      // Simple procedural generation
      const rand = Math.random();
      let type: TerrainType;
      
      if (rand < 0.4) {
        type = 'PLAINS';
      } else if (rand < 0.6) {
        type = 'FOREST';
      } else if (rand < 0.8) {
        type = 'HILLS';
      } else {
        type = 'WATER';
      }
      
      terrain[row][col] = {
        type,
        position: [row, col],
      };
    }
  }
  
  // Ensure starting positions are on plains
  terrain[1][1].type = 'PLAINS';
  terrain[8][8].type = 'PLAINS';
  
  return terrain;
}

// Helper: Clone state immutably
export function cloneState(state: BattleState): BattleState {
  return {
    ...state,
    aiUnit: { ...state.aiUnit, position: [...state.aiUnit.position] },
    enemyUnit: { ...state.enemyUnit, position: [...state.enemyUnit.position] },
    terrain: state.terrain.map(row => row.map(cell => ({ ...cell }))),
  };
}

// Helper: Calculate distance between positions
export function getDistance(pos1: Position, pos2: Position): number {
  return Math.abs(pos1[0] - pos2[0]) + Math.abs(pos1[1] - pos2[1]);
}

// Helper: Check if position is in bounds
export function isInBounds(pos: Position): boolean {
  const [row, col] = pos;
  return row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE;
}

// Helper: Check line of sight (no obstacles between two positions)
export function hasLineOfSight(
  from: Position,
  to: Position,
  terrain: TerrainCell[][]
): boolean {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;
  
  const dx = Math.abs(toCol - fromCol);
  const dy = Math.abs(toRow - fromRow);
  const sx = fromCol < toCol ? 1 : -1;
  const sy = fromRow < toRow ? 1 : -1;
  let err = dx - dy;
  
  let currentRow = fromRow;
  let currentCol = fromCol;
  
  while (currentRow !== toRow || currentCol !== toCol) {
    // Check if current cell blocks LOS
    if (terrain[currentRow][currentCol].type === 'FOREST' ||
        terrain[currentRow][currentCol].type === 'HILLS') {
      // Some terrain partially blocks LOS
      if (Math.random() > 0.5) return false;
    }
    
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      currentCol += sx;
    }
    if (e2 < dx) {
      err += dx;
      currentRow += sy;
    }
  }
  
  return true;
}
