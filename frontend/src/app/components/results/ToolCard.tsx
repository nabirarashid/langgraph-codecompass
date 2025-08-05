import { ExternalLink, DollarSign, Code, Globe, Check, X } from "lucide-react";
import { Tool } from "../shared/types";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
      <div className="flex items-start justify-between mb-4">
        <h4 className="text-xl font-bold text-white">{tool.name}</h4>
        <a
          href={tool.website}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
        >
          <ExternalLink className="w-4 h-4 text-purple-300" />
        </a>
      </div>

      <p className="text-purple-200 text-sm mb-4 leading-relaxed">
        {tool.description}
      </p>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-purple-300 text-sm flex items-center">
            <DollarSign className="w-4 h-4 mr-1" />
            Pricing
          </span>
          <span className="text-white text-sm font-medium">{tool.pricing}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-purple-300 text-sm flex items-center">
            <Code className="w-4 h-4 mr-1" />
            Open Source
          </span>
          {tool.openSource ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <X className="w-4 h-4 text-red-400" />
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-purple-300 text-sm flex items-center">
            <Globe className="w-4 h-4 mr-1" />
            API Available
          </span>
          {tool.apiAvailable ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <X className="w-4 h-4 text-red-400" />
          )}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-purple-300 text-sm mb-2">Key Features:</p>
        <div className="flex flex-wrap gap-1">
          {tool.features.slice(0, 3).map((feature, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-purple-500/20 text-purple-200 rounded-md text-xs"
            >
              {feature}
            </span>
          ))}
          {tool.features.length > 3 && (
            <span className="px-2 py-1 bg-purple-500/20 text-purple-200 rounded-md text-xs">
              +{tool.features.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
