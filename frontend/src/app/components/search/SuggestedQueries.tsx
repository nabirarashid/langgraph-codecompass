import { suggestedQueries } from "../shared/constants";

interface SuggestedQueriesProps {
  onQuerySelect: (query: string) => void;
}

export default function SuggestedQueries({
  onQuerySelect,
}: SuggestedQueriesProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {suggestedQueries.map((suggestion, index) => {
        const Icon = suggestion.icon;
        return (
          <button
            key={index}
            onClick={() => onQuerySelect(suggestion.text)}
            className="p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-200 hover:scale-105 group"
          >
            <div className="flex items-center space-x-3">
              <Icon className="w-5 h-5 text-purple-400 group-hover:text-cyan-400 transition-colors" />
              <span className="text-purple-200 group-hover:text-white transition-colors text-sm">
                {suggestion.text}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
