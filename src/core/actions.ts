import type { BattleState, Action, Position, Unit } from './BattleState';
import { cloneState, getDistance, isInBounds, hasLineOfSight } from './BattleState';
import { UNIT_TYPES, ACTION_EFFECTS } from './constants';

// Get all possible actions
export function getPossibleActions(_state: BattleState): Action[] {
  return ['ATTACK', 'DEFEND', 'RETREAT'];
}

// Apply action
export function applyAction(state: BattleState, action: Action): BattleState {
  const newState = cloneState(state);

  if (newState.isAiTurn) {
    executeAction(newState, newState.aiUnit, newState.enemyUnit, action);
  } else {
    executeAction(newState, newState.enemyUnit, newState.aiUnit, action);
  }

  newState.lastAction = action;
  newState.isAiTurn = !newState.isAiTurn;

  if (newState.isAiTurn) {
    newState.turn++;
  }

  return newState;
}

// Execute logic
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
      if (distance <= attackerUnitType.attackRange) {
        const hasLOS = hasLineOfSight(
          attacker.position,
          defender.position,
          state.terrain
        );

        let damage = attackerUnitType.attackPower;

        const atkBonus = attackerUnitType.terrainBonus[attackerTerrain.type] || 0;
        damage *= (1 + atkBonus);

        const defBonus = defenderUnitType.terrainBonus[defenderTerrain.type] || 0;
        const defenseMultiplier = 1 - (defenderUnitType.defensePower / 100) - defBonus;

        damage *= defenseMultiplier;

        if (!hasLOS) {
          damage *= 0.6;
        }

        defender.strength = Math.max(0, defender.strength - damage);
        attacker.stamina = Math.max(0, attacker.stamina - ACTION_EFFECTS.ATTACK.staminaCost);
      } else {
        moveTowards(attacker, defender.position, state);
      }
      break;
    }

    case 'DEFEND': {
      attacker.stamina = Math.min(100, attacker.stamina + 15);

      if (distance <= 2) {
        const counterDamage = attackerUnitType.defensePower * 0.5;
        defender.strength = Math.max(0, defender.strength - counterDamage);
      }
      break;
    }

    case 'RETREAT': {
      moveAwayFrom(attacker, defender.position, state);
      attacker.strength = Math.min(100, attacker.strength + ACTION_EFFECTS.RETREAT.healthGain);
      attacker.stamina = Math.min(100, attacker.stamina + 10);
      break;
    }
  }
}

// Move towards
function moveTowards(unit: Unit, targetPos: Position, state: BattleState): void {
  const [r, c] = unit.position;
  const [tr, tc] = targetPos;
  const unitType = UNIT_TYPES[unit.type];

  let moved = false;

  if (Math.abs(tr - r) >= Math.abs(tc - c)) {
    const nr = r + (tr > r ? 1 : -1);
    if (isInBounds([nr, c]) && canMoveTo(state, [nr, c], unitType)) {
      unit.position = [nr, c];
      moved = true;
    }
  }

  if (!moved && tc !== c) {
    const nc = c + (tc > c ? 1 : -1);
    if (isInBounds([r, nc]) && canMoveTo(state, [r, nc], unitType)) {
      unit.position = [r, nc];
    }
  }
}

// Move away
function moveAwayFrom(unit: Unit, targetPos: Position, state: BattleState): void {
  const [r, c] = unit.position;
  const [tr, tc] = targetPos;
  const unitType = UNIT_TYPES[unit.type];

  let moved = false;

  if (Math.abs(r - tr) >= Math.abs(c - tc)) {
    const nr = r + (r > tr ? 1 : -1);
    if (isInBounds([nr, c]) && canMoveTo(state, [nr, c], unitType)) {
      unit.position = [nr, c];
      moved = true;
    }
  }

  if (!moved && c !== tc) {
    const nc = c + (c > tc ? 1 : -1);
    if (isInBounds([r, nc]) && canMoveTo(state, [r, nc], unitType)) {
      unit.position = [r, nc];
    }
  }
}

// Movement check
function canMoveTo(
  state: BattleState,
  pos: Position,
  unitType: typeof UNIT_TYPES[keyof typeof UNIT_TYPES]
): boolean {
  const [row, col] = pos;
  const terrain = state.terrain[row][col];

  const terrainBonus = unitType.terrainBonus[terrain.type] ?? 0;

  // Water restriction (valid now)
  if (terrain.type === 'WATER' && terrainBonus < -0.7) {
    return false;
  }

  return true;
}