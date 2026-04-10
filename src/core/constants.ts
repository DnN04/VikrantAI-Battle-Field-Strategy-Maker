// Game configuration constants

export const GRID_SIZE = 10;
export const MAX_TURNS = 50;
export const CELL_SIZE = 50;

// Unit types with their characteristics
export const UNIT_TYPES = {
  INFANTRY: {
    name: 'Infantry',
    symbol: '👤',
    attackRange: 1,
    movementRange: 2,
    attackPower: 15,
    defensePower: 10,
    terrainBonus: {
      FOREST: 0.3,  // 30% defense bonus in forest
      HILLS: 0.2,
      PLAINS: 0,
      WATER: -0.5,  // Cannot cross water effectively
    }
  },
  ARMOR: {
    name: 'Armor',
    symbol: '🛡️',
    attackRange: 2,
    movementRange: 3,
    attackPower: 25,
    defensePower: 20,
    terrainBonus: {
      FOREST: -0.2,  // Penalty in forest
      HILLS: -0.1,
      PLAINS: 0.2,   // Bonus on plains
      WATER: -0.8,
    }
  },
  ARTILLERY: {
    name: 'Artillery',
    symbol: '💥',
    attackRange: 4,
    movementRange: 1,
    attackPower: 35,
    defensePower: 5,
    terrainBonus: {
      FOREST: -0.1,
      HILLS: 0.3,    // High ground advantage
      PLAINS: 0.1,
      WATER: -0.9,
    }
  },
} as const;

// Terrain types
export const TERRAIN_TYPES = {
  PLAINS: {
    name: 'Plains',
    color: '#5d6b43',
    symbol: '◽',
    movementCost: 1,
    defenseModifier: 0,
  },
  FOREST: {
    name: 'Forest',
    color: '#2d4a2b',
    symbol: '🌲',
    movementCost: 2,
    defenseModifier: 0.2,
  },
  HILLS: {
    name: 'Hills',
    color: '#6b5d43',
    symbol: '⛰️',
    movementCost: 2,
    defenseModifier: 0.15,
  },
  WATER: {
    name: 'Water',
    color: '#2e4a5a',
    symbol: '🌊',
    movementCost: 99, // Nearly impassable
    defenseModifier: -0.3,
  },
} as const;

// Action damage/effect values
export const ACTION_EFFECTS = {
  ATTACK: {
    baseDamage: 20,
    staminaCost: 10,
  },
  DEFEND: {
    damageReduction: 0.5,
    staminaCost: 5,
  },
  RETREAT: {
    healthGain: 5,
    positionChange: 1,
  },
};

// Minimax configuration
export const MINIMAX_CONFIG = {
  DEFAULT_DEPTH: 4,
  MIN_DEPTH: 1,
  MAX_DEPTH: 6,
  INFINITY: 999999,
};
