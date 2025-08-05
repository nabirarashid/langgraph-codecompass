import { Sparkles } from "lucide-react";

interface RecommendationCardProps {
  recommendation: string;
  formatRecommendation: (text: string) => string;
}

export default function RecommendationCard({
  recommendation,
  formatRecommendation,
}: RecommendationCardProps) {
  return (
    <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
      <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
        <Sparkles className="w-6 h-6 mr-2 text-purple-400" />
        AI Recommendation
      </h3>
      <p
        className="text-purple-100 leading-relaxed text-lg"
        dangerouslySetInnerHTML={{
          __html: formatRecommendation(recommendation),
        }}
      />
    </div>
  );
}
