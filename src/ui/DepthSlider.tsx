import { Layers } from 'lucide-react';

interface DepthSliderProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function DepthSlider({ value, onChange, disabled }: DepthSliderProps) {
  return (
    <div className="tactical-panel p-4">
      <div className="flex items-center gap-2 mb-3">
        <Layers className="w-4 h-4 text-tactical-olive-400" />
        <h3 className="text-sm font-bold text-tactical-olive-300 tracking-wide">
          SEARCH DEPTH
        </h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">Depth Level</span>
          <span className="text-lg font-mono font-bold text-white bg-black/40 px-3 py-1 rounded">
            {value}
          </span>
        </div>
        
        <input
          type="range"
          min="1"
          max="6"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
          className="w-full h-2 bg-black/40 rounded-lg appearance-none cursor-pointer slider-thumb"
        />
        
        <div className="flex justify-between text-[10px] text-gray-600">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
        </div>
        
        <div className="text-xs text-gray-500 bg-black/20 rounded p-2">
          {value <= 2 && '⚡ Fast - Good for testing'}
          {value === 3 && '✓ Balanced - Recommended'}
          {value === 4 && '🎯 Standard - Strong play'}
          {value === 5 && '🔍 Deep - Slower but smarter'}
          {value === 6 && '🧠 Maximum - Expert level'}
        </div>
      </div>
      
      <style>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7d8a5a, #5d6b43);
          cursor: pointer;
          border: 2px solid #475335;
          box-shadow: 0 0 8px rgba(125, 138, 90, 0.5);
        }
        
        .slider-thumb::-webkit-slider-thumb:hover {
          background: linear-gradient(135deg, #9ba373, #7d8a5a);
          box-shadow: 0 0 12px rgba(125, 138, 90, 0.7);
        }
        
        .slider-thumb::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7d8a5a, #5d6b43);
          cursor: pointer;
          border: 2px solid #475335;
          box-shadow: 0 0 8px rgba(125, 138, 90, 0.5);
        }
        
        .slider-thumb:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
