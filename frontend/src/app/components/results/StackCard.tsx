import {
  Clock,
  TrendingUp,
  DollarSign,
  Users,
  BookOpen,
  Layers,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { TechStack } from "../shared/types";
import { useState } from "react";
import ComponentCard from "./ComponentCard";

interface StackCardProps {
  stack: TechStack;
}

export default function StackCard({ stack }: StackCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
      <div className="mb-4">
        <h4 className="text-xl font-bold text-white mb-2">{stack.name}</h4>
        <p className="text-purple-200 text-sm leading-relaxed">
          {stack.description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-purple-300 flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            Time to Market
          </span>
          <span className="text-white font-medium">{stack.timeToMarket}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-purple-300 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            Scalability
          </span>
          <span className="text-white font-medium">{stack.scalability}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-purple-300 flex items-center">
            <Users className="w-4 h-4 mr-1" />
            Team Size
          </span>
          <span className="text-white font-medium">{stack.teamSizeFit}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-purple-300 flex items-center">
            <Layers className="w-4 h-4 mr-1" />
            Complexity
          </span>
          <span className="text-white font-medium">{stack.complexity}</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-purple-300 text-sm flex items-center">
            <DollarSign className="w-4 h-4 mr-1" />
            Cost Estimate
          </span>
        </div>
        <p className="text-white text-sm">{stack.costEstimate}</p>
      </div>

      <div className="mb-4">
        <p className="text-purple-300 text-sm mb-2">Best For:</p>
        <div className="flex flex-wrap gap-1">
          {stack.bestFor.slice(0, 3).map((use, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-cyan-500/20 text-cyan-200 rounded-md text-xs"
            >
              {use}
            </span>
          ))}
          {stack.bestFor.length > 3 && (
            <span className="px-2 py-1 bg-cyan-500/20 text-cyan-200 rounded-md text-xs">
              +{stack.bestFor.length - 3} more
            </span>
          )}
        </div>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
      >
        <span className="text-white text-sm font-medium flex items-center">
          <BookOpen className="w-4 h-4 mr-2" />
          View Components ({stack.components.length})
        </span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-purple-300" />
        ) : (
          <ChevronDown className="w-4 h-4 text-purple-300" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
          {stack.components.map((component, idx) => (
            <ComponentCard key={idx} component={component} />
          ))}

          {stack.learningResources.length > 0 && (
            <div className="mt-4 pt-3 border-t border-white/10">
              <p className="text-purple-300 text-sm mb-2">
                Learning Resources:
              </p>
              <div className="space-y-1">
                {stack.learningResources.slice(0, 3).map((resource, idx) => (
                  <p key={idx} className="text-purple-200 text-xs">
                    • {resource}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
