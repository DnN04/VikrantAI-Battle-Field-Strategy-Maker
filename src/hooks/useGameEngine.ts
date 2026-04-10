import { useState, useCallback, useEffect, useRef } from 'react';
import { getInitialState, type BattleState, type Action, type UnitType } from '../core/BattleState';
import { getBestAction, type AIDecision } from '../core/aiAgent';
import { processTurn } from '../game/gameLoop';
import { checkWinner, type Winner } from '../game/winConditions';

export type GameMode = 'human' | 'ai';

export interface GameStats {
  withPruningNodes: number;
  withoutPruningNodes: number;
  pruningEfficiency: number; // percentage
}

export function useGameEngine() {
  // Core game state
  const [gameState, setGameState] = useState<BattleState>(getInitialState());
  const [lastDecision, setLastDecision] = useState<AIDecision | null>(null);
  const [gameLog, setGameLog] = useState<string[]>(['Game started. AI goes first.']);
  const [stats, setStats] = useState<GameStats>({
    withPruningNodes: 0,
    withoutPruningNodes: 0,
    pruningEfficiency: 0,
  });
  
  // Game status
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState<Winner>(null);
  
  // Settings
  const [mode, setMode] = useState<GameMode>('human');
  const [depth, setDepth] = useState(4);
  const [usePruning, setUsePruning] = useState(true);
  const [aiUnitType, setAiUnitType] = useState<UnitType>('INFANTRY');
  const [enemyUnitType, setEnemyUnitType] = useState<UnitType>('ARMOR');
  
  // Processing lock
  const isProcessingRef = useRef(false);
  
  // Execute AI turn
  const executeAITurn = useCallback(async (currentState: BattleState) => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;
    
    // Small delay for visual effect
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Get AI decision with current settings
    const decision = getBestAction(currentState, { depth, usePruning });
    
    // Calculate efficiency if pruning is enabled
    let efficiency = 0;
    if (usePruning) {
      const withoutPruningDecision = getBestAction(currentState, { 
        depth, 
        usePruning: false 
      });
      const reduction = withoutPruningDecision.nodesEvaluated - decision.nodesEvaluated;
      efficiency = (reduction / withoutPruningDecision.nodesEvaluated) * 100;
      
      setStats({
        withPruningNodes: decision.nodesEvaluated,
        withoutPruningNodes: withoutPruningDecision.nodesEvaluated,
        pruningEfficiency: Math.round(efficiency),
      });
    } else {
      setStats({
        withPruningNodes: 0,
        withoutPruningNodes: decision.nodesEvaluated,
        pruningEfficiency: 0,
      });
    }
    
    setLastDecision(decision);
    
    // Apply action
    const { newState, logEntry } = processTurn(currentState, decision.action);
    setGameState(newState);
    setGameLog(prev => [...prev, logEntry]);
    
    // Check win condition
    const gameWinner = checkWinner(newState);
    if (gameWinner) {
      setIsGameOver(true);
      setWinner(gameWinner);
      setGameLog(prev => [...prev, `🏆 Game Over! Winner: ${gameWinner}`]);
    }
    
    isProcessingRef.current = false;
  }, [depth, usePruning]);
  
  // Auto-trigger AI turns
  useEffect(() => {
    if (isGameOver) return;
    if (isProcessingRef.current) return;
    
    // In AI vs AI mode, always execute AI turn
    if (mode === 'ai') {
      executeAITurn(gameState);
    } 
    // In Human mode, only execute when it's AI's turn
    else if (mode === 'human' && gameState.isAiTurn) {
      executeAITurn(gameState);
    }
  }, [gameState, mode, isGameOver, executeAITurn]);
  
  // Human player makes a move
  const makeHumanMove = useCallback((action: Action) => {
    if (isGameOver) return;
    if (mode !== 'human') return;
    if (gameState.isAiTurn) return; // Can only act on enemy's turn
    if (isProcessingRef.current) return;
    
    const { newState, logEntry } = processTurn(gameState, action);
    setGameState(newState);
    setGameLog(prev => [...prev, `Human chose: ${action}. ${logEntry}`]);
    
    const gameWinner = checkWinner(newState);
    if (gameWinner) {
      setIsGameOver(true);
      setWinner(gameWinner);
      setGameLog(prev => [...prev, `🏆 Game Over! Winner: ${gameWinner}`]);
    }
  }, [gameState, isGameOver, mode]);
  
  // Reset game
  const resetGame = useCallback(() => {
    const newState = getInitialState();
    // Apply selected unit types
    newState.aiUnit.type = aiUnitType;
    newState.enemyUnit.type = enemyUnitType;
    
    setGameState(newState);
    setGameLog(['Game reset. AI goes first.']);
    setIsGameOver(false);
    setWinner(null);
    setLastDecision(null);
    setStats({
      withPruningNodes: 0,
      withoutPruningNodes: 0,
      pruningEfficiency: 0,
    });
    isProcessingRef.current = false;
  }, [aiUnitType, enemyUnitType]);
  
  // Change unit types (only when game is over or not started)
  const changeUnitTypes = useCallback((ai: UnitType, enemy: UnitType) => {
    setAiUnitType(ai);
    setEnemyUnitType(enemy);
    
    // Update current game state if game hasn't really started
    if (gameState.turn === 1) {
      setGameState(prev => ({
        ...prev,
        aiUnit: { ...prev.aiUnit, type: ai },
        enemyUnit: { ...prev.enemyUnit, type: enemy },
      }));
    }
  }, [gameState.turn]);
  
  return {
    // State
    gameState,
    lastDecision,
    gameLog,
    stats,
    isGameOver,
    winner,
    
    // Settings
    mode,
    depth,
    usePruning,
    aiUnitType,
    enemyUnitType,
    
    // Actions
    makeHumanMove,
    resetGame,
    setMode,
    setDepth,
    setUsePruning,
    changeUnitTypes,
  };
}
