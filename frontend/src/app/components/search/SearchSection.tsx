import { Results } from "../shared/types";
import SearchInput from "./SearchInput";
import SearchStatus from "./SearchStatus";
import SuggestedQueries from "./SuggestedQueries";

interface SearchSectionProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
  isSearching: boolean;
  onKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  error: string | null;
  searchStage: string;
  results: Results | null;
}

export default function SearchSection({
  query,
  setQuery,
  onSearch,
  isSearching,
  onKeyPress,
  textareaRef,
  error,
  searchStage,
  results,
}: SearchSectionProps) {
  return (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl py-6 font-bold text-white mb-4">
          Get Tech Stack Recommendations with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            CodeCompass
          </span>
        </h2>
        <p className="text-xl text-purple-200 max-w-2xl mx-auto">
          Describe your project and get personalized tech stack recommendations
          with detailed analysis, cost estimates, and learning resources.
        </p>
      </div>

      <div className="relative mb-8">
        <SearchInput
          query={query}
          setQuery={setQuery}
          onSearch={onSearch}
          isSearching={isSearching}
          onKeyPress={onKeyPress}
          textareaRef={textareaRef}
        />
        <SearchStatus
          isSearching={isSearching}
          error={error}
          searchStage={searchStage}
        />
      </div>

      {!results && !isSearching && (
        <SuggestedQueries onQuerySelect={setQuery} />
      )}
    </div>
  );
}
