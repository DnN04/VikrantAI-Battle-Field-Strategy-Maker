import { useRef, useEffect } from 'react';
import type { BattleState } from '../core/BattleState';
import { GRID_SIZE, CELL_SIZE, UNIT_TYPES, TERRAIN_TYPES } from '../core/constants';

interface BattlefieldGridProps {
  state: BattleState;
}

export function BattlefieldGrid({ state }: BattlefieldGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = GRID_SIZE * CELL_SIZE;
    canvas.height = GRID_SIZE * CELL_SIZE;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw terrain
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        const terrain = state.terrain[row][col];
        const terrainType = TERRAIN_TYPES[terrain.type];
        
        // Fill terrain color
        ctx.fillStyle = terrainType.color;
        ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        
        // Add terrain pattern
        if (terrain.type === 'FOREST') {
          // Add dark spots for forest
          ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
          ctx.fillRect(
            col * CELL_SIZE + 5, 
            row * CELL_SIZE + 5, 
            CELL_SIZE - 10, 
            CELL_SIZE - 10
          );
        } else if (terrain.type === 'HILLS') {
          // Add gradient for hills
          const gradient = ctx.createLinearGradient(
            col * CELL_SIZE,
            row * CELL_SIZE,
            col * CELL_SIZE + CELL_SIZE,
            row * CELL_SIZE + CELL_SIZE
          );
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0.1)');
          ctx.fillStyle = gradient;
          ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        } else if (terrain.type === 'WATER') {
          // Add wave pattern
          ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
          for (let i = 0; i < 3; i++) {
            ctx.fillRect(
              col * CELL_SIZE, 
              row * CELL_SIZE + i * 15, 
              CELL_SIZE, 
              2
            );
          }
        }
      }
    }
    
    // Draw grid lines
    ctx.strokeStyle = '#1a2e2a';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, canvas.height);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(canvas.width, i * CELL_SIZE);
      ctx.stroke();
    }
    
    // Draw units
    drawUnit(ctx, state.aiUnit.position, state.aiUnit.type, '#4a90e2', 'AI');
    drawUnit(ctx, state.enemyUnit.position, state.enemyUnit.type, '#d32f2f', 'EN');
    
    // Draw range indicators (subtle)
    drawRangeIndicator(ctx, state.aiUnit.position, UNIT_TYPES[state.aiUnit.type].attackRange, '#4a90e2');
    drawRangeIndicator(ctx, state.enemyUnit.position, UNIT_TYPES[state.enemyUnit.type].attackRange, '#d32f2f');
    
  }, [state]);
  
  return (
    <div className="tactical-grid rounded-lg p-4 inline-block relative">
      <canvas 
        ref={canvasRef} 
        className="rounded shadow-2xl"
        style={{ imageRendering: 'crisp-edges' }}
      />
      
      {/* Legend */}
      <div className="absolute top-2 right-2 bg-black/70 p-2 rounded text-xs space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: TERRAIN_TYPES.PLAINS.color }} />
          <span className="text-gray-300">Plains</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: TERRAIN_TYPES.FOREST.color }} />
          <span className="text-gray-300">Forest</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: TERRAIN_TYPES.HILLS.color }} />
          <span className="text-gray-300">Hills</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: TERRAIN_TYPES.WATER.color }} />
          <span className="text-gray-300">Water</span>
        </div>
      </div>
    </div>
  );
}

// Helper: Draw unit on canvas
function drawUnit(
  ctx: CanvasRenderingContext2D,
  position: [number, number],
  type: string,
  color: string,
  label: string
) {
  const [row, col] = position;
  const x = col * CELL_SIZE + CELL_SIZE / 2;
  const y = row * CELL_SIZE + CELL_SIZE / 2;
  
  // Draw unit circle
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, CELL_SIZE * 0.35, 0, 2 * Math.PI);
  ctx.fill();
  
  // Draw border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // Draw label
  ctx.fillStyle = 'white';
  ctx.font = 'bold 14px Rajdhani, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, x, y);
  
  // Draw unit type indicator (small icon above)
  ctx.font = '16px sans-serif';
  const unitSymbol = type === 'INFANTRY' ? '👤' : type === 'ARMOR' ? '🛡️' : '💥';
  ctx.fillText(unitSymbol, x, y - 22);
}

// Helper: Draw range indicator
function drawRangeIndicator(
  ctx: CanvasRenderingContext2D,
  position: [number, number],
  range: number,
  color: string
) {
  const [row, col] = position;
  const x = col * CELL_SIZE + CELL_SIZE / 2;
  const y = row * CELL_SIZE + CELL_SIZE / 2;
  
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.15;
  ctx.lineWidth = 1;
  ctx.setLineDash([5, 5]);
  
  ctx.beginPath();
  ctx.arc(x, y, range * CELL_SIZE, 0, 2 * Math.PI);
  ctx.stroke();
  
  ctx.globalAlpha = 1;
  ctx.setLineDash([]);
}
