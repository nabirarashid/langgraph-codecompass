import { Brain } from "lucide-react";

interface AnalysisCardProps {
  analysis: string;
  formatAnalysis: (text: string) => string;
}

export default function AnalysisCard({
  analysis,
  formatAnalysis,
}: AnalysisCardProps) {
  return (
    <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
      <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
        <Brain className="w-6 h-6 mr-2 text-purple-400" />
        Stack Analysis
      </h3>
      <p
        className="text-purple-100 leading-relaxed text-lg"
        dangerouslySetInnerHTML={{
          __html: formatAnalysis(analysis),
        }}
      />
    </div>
  );
}
