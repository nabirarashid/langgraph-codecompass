import { Results } from "../shared/types";
import ToolsGrid from "./ToolsGrid";
import RecommendationCard from "./RecommendationCard";

interface ResultsSectionProps {
  results: Results;
  formatRecommendation: (text: string) => string;
}

export default function ResultsSection({
  results,
  formatRecommendation,
}: ResultsSectionProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <ToolsGrid tools={results.tools} />
      <RecommendationCard
        recommendation={results.recommendation}
        formatRecommendation={formatRecommendation}
      />
    </div>
  );
}
