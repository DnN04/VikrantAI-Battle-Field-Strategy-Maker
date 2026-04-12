import { useState } from 'react';

export interface StrategyInput {
  terrain: string;
  aiUnits: number;
  enemyUnits: number;
  aggression: number;
}

export function InputPanel({ onRun }: { onRun: (input: StrategyInput) => void }) {
  const [input, setInput] = useState<StrategyInput>({
    terrain: 'PLAINS',
    aiUnits: 5,
    enemyUnits: 5,
    aggression: 5
  });

  return (
    <div className="tactical-panel p-6 space-y-5">
      
      <h3 className="text-lg font-bold text-tactical-olive-300">
        🎯 BATTLEFIELD CONFIGURATION
      </h3>

      {/* Terrain */}
      <div>
        <label className="text-sm text-gray-400">Terrain</label>
        {/* <select
          value={input.terrain}
          onChange={(e) => setInput({ ...input, terrain: e.target.value })}
          className="w-full mt-1 p-2 bg-black/40 border border-tactical-border rounded"
        >
          <option value="PLAIN">PLAIN</option>
          <option value="FOREST">FOREST</option>
          <option value="HILL">HILL</option>
          <option value="URBAN">URBAN</option>
        </select> */}
        <select
  value={input.terrain}
  onChange={(e) => setInput({ ...input, terrain: e.target.value })}
  className="w-full mt-1 p-2 bg-black/40 border border-tactical-border rounded"
>
  <option value="PLAINS">PLAINS</option>
  <option value="FOREST">FOREST</option>
  <option value="HILLS">HILLS</option>
  <option value="WATER">WATER</option>
</select>
      </div>

      {/* Units */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-400">AI Units</label>
          <input
            type="number"
            value={input.aiUnits}
            onChange={(e) => setInput({ ...input, aiUnits: Number(e.target.value) })}
            className="w-full mt-1 p-2 bg-black/40 border border-tactical-border rounded"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400">Enemy Units</label>
          <input
            type="number"
            value={input.enemyUnits}
            onChange={(e) => setInput({ ...input, enemyUnits: Number(e.target.value) })}
            className="w-full mt-1 p-2 bg-black/40 border border-tactical-border rounded"
          />
        </div>
      </div>

      {/* Aggression Slider */}
      <div>
        <label className="text-sm text-gray-400">
          AI Aggression: {input.aggression}
        </label>
        <input
          type="range"
          min={1}
          max={10}
          value={input.aggression}
          onChange={(e) => setInput({ ...input, aggression: Number(e.target.value) })}
          className="w-full"
        />
      </div>

      {/* Run Button */}
      <button
        onClick={() => onRun(input)}
        className="w-full py-3 bg-tactical-olive-700 hover:bg-tactical-olive-600 text-white rounded font-semibold"
      >
        🚀 RUN STRATEGIC ANALYSIS
      </button>
    </div>
  );
}