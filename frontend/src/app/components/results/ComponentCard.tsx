import { TechComponent } from "../shared/types";
import { TrendingUp, DollarSign, Lightbulb } from "lucide-react";

interface ComponentCardProps {
  component: TechComponent;
}

export default function ComponentCard({ component }: ComponentCardProps) {
  const getLearningCurveColor = (curve: string) => {
    switch (curve.toLowerCase()) {
      case "easy":
        return "text-green-400";
      case "medium":
        return "text-yellow-400";
      case "hard":
        return "text-red-400";
      default:
        return "text-purple-400";
    }
  };

  const getPopularityColor = (popularity: string) => {
    switch (popularity.toLowerCase()) {
      case "high":
        return "text-green-400";
      case "medium":
        return "text-yellow-400";
      case "low":
        return "text-red-400";
      default:
        return "text-purple-400";
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h5 className="text-white font-medium">{component.name}</h5>
          <span className="text-purple-300 text-xs">{component.category}</span>
        </div>
      </div>

      <p className="text-purple-200 text-xs mb-3 leading-relaxed">
        {component.description}
      </p>

      <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
        <div className="flex items-center">
          <Lightbulb className="w-3 h-3 mr-1 text-purple-300" />
          <span
            className={`font-medium ${getLearningCurveColor(
              component.learningCurve
            )}`}
          >
            {component.learningCurve}
          </span>
        </div>

        <div className="flex items-center">
          <TrendingUp className="w-3 h-3 mr-1 text-purple-300" />
          <span
            className={`font-medium ${getPopularityColor(
              component.popularity
            )}`}
          >
            {component.popularity}
          </span>
        </div>

        <div className="flex items-center">
          <DollarSign className="w-3 h-3 mr-1 text-purple-300" />
          <span className="text-white font-medium">{component.cost}</span>
        </div>
      </div>

      {component.pros.length > 0 && (
        <div className="mb-2">
          <p className="text-green-300 text-xs mb-1">Pros:</p>
          <div className="space-y-1">
            {component.pros.slice(0, 2).map((pro, idx) => (
              <p key={idx} className="text-green-200 text-xs">
                ✓ {pro}
              </p>
            ))}
          </div>
        </div>
      )}

      {component.cons.length > 0 && (
        <div className="mb-2">
          <p className="text-red-300 text-xs mb-1">Cons:</p>
          <div className="space-y-1">
            {component.cons.slice(0, 2).map((con, idx) => (
              <p key={idx} className="text-red-200 text-xs">
                ✗ {con}
              </p>
            ))}
          </div>
        </div>
      )}

      {component.useCases.length > 0 && (
        <div>
          <p className="text-purple-300 text-xs mb-1">Use Cases:</p>
          <div className="flex flex-wrap gap-1">
            {component.useCases.slice(0, 3).map((useCase, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-purple-500/20 text-purple-200 rounded text-xs"
              >
                {useCase}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
