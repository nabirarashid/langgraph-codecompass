import { Layers } from "lucide-react";
import { TechStack } from "../shared/types";
import StackCard from "./StackCard";

interface StacksGridProps {
  stacks: TechStack[];
}

export default function StacksGrid({ stacks }: StacksGridProps) {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
        <Layers className="w-6 h-6 mr-2 text-purple-400" />
        Recommended Tech Stacks
      </h3>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
        {stacks.map((stack, index) => (
          <StackCard key={index} stack={stack} />
        ))}
      </div>
    </div>
  );
}
