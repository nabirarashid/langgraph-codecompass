import { Search, Loader2 } from "lucide-react";
import { RefObject } from "react";

interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: () => void;
  isSearching: boolean;
  onKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  textareaRef: RefObject<HTMLTextAreaElement>;
}

export default function SearchInput({
  query,
  setQuery,
  onSearch,
  isSearching,
  onKeyPress,
  textareaRef,
}: SearchInputProps) {
  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={onKeyPress}
        placeholder="Search for developer tools... (e.g., 'cloud platforms', 'JavaScript frameworks', 'database solutions')"
        className="w-full p-6 pr-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none min-h-[80px] text-lg"
        rows={1}
      />
      <button
        onClick={onSearch}
        disabled={isSearching || !query.trim()}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200 hover:scale-105"
      >
        {isSearching ? (
          <Loader2 className="w-6 h-6 text-white animate-spin" />
        ) : (
          <Search className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
}
