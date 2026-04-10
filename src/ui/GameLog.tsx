import { FileText } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface GameLogProps {
  entries: string[];
}

export function GameLog({ entries }: GameLogProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new entries added
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);
  
  return (
    <div className="tactical-panel p-4 h-64">
      <div className="flex items-center gap-2 border-b border-tactical-olive-700 pb-2 mb-3">
        <FileText className="w-4 h-4 text-tactical-olive-400" />
        <h3 className="text-sm font-bold text-tactical-olive-300 tracking-wide">
          BATTLE LOG
        </h3>
      </div>
      
      <div 
        ref={scrollRef}
        className="h-[calc(100%-3rem)] overflow-y-auto space-y-1 pr-2 custom-scrollbar"
      >
        {entries.length === 0 ? (
          <div className="text-center text-gray-600 text-xs py-4">
            No events yet...
          </div>
        ) : (
          entries.map((entry, index) => (
            <div
              key={index}
              className="text-xs font-mono text-gray-400 hover:text-gray-300 transition-colors py-1 px-2 rounded hover:bg-black/20"
            >
              <span className="text-tactical-olive-600 mr-2">
                [{String(index + 1).padStart(3, '0')}]
              </span>
              {entry}
            </div>
          ))
        )}
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #5d6b43;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #7d8a5a;
        }
      `}</style>
    </div>
  );
}
