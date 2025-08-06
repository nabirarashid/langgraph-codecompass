import { Results } from "../shared/types";
import AnalysisCard from "./AnalysisCard";
import StacksGrid from "./StacksGrid";

interface ResultsSectionProps {
  results: Results;
  formatAnalysis: (text: string) => string;
}

export default function ResultsSection({
  results,
  formatAnalysis,
}: ResultsSectionProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <StacksGrid stacks={results.stacks} />
      <AnalysisCard
        analysis={results.analysis}
        formatAnalysis={formatAnalysis}
      />
    </div>
  );
}
