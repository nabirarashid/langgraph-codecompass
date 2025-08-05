import { Database } from "lucide-react";
import { Tool } from "../shared/types";
import ToolCard from "./ToolCard";

interface ToolsGridProps {
  tools: Tool[];
}

export default function ToolsGrid({ tools }: ToolsGridProps) {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
        <Database className="w-6 h-6 mr-2 text-purple-400" />
        Discovered Tools
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <ToolCard key={index} tool={tool} />
        ))}
      </div>
    </div>
  );
}
