import { Loader2, X } from "lucide-react";

interface SearchStatusProps {
  isSearching: boolean;
  error: string | null;
  searchStage: string;
}

export default function SearchStatus({
  isSearching,
  error,
  searchStage,
}: SearchStatusProps) {
  if (!isSearching && !error) return null;

  return (
    <div className="mt-4 p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
      {isSearching ? (
        <div className="flex items-center space-x-3">
          <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
          <span className="text-purple-300">{searchStage}</span>
        </div>
      ) : error ? (
        <div className="flex items-center space-x-3">
          <X className="w-5 h-5 text-red-400" />
          <span className="text-red-300">{error}</span>
        </div>
      ) : null}
    </div>
  );
}
