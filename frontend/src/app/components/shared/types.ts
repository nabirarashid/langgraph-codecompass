export type TechComponent = {
  name: string;
  category: string;
  description: string;
  pros: string[];
  cons: string[];
  learningCurve: string;
  popularity: string;
  cost: string;
  useCases: string[];
};

export type TechStack = {
  name: string;
  description: string;
  components: TechComponent[];
  complexity: string;
  timeToMarket: string;
  scalability: string;
  costEstimate: string;
  teamSizeFit: string;
  bestFor: string[];
  industries: string[];
  learningResources: string[];
};

export type Results = {
  stacks: TechStack[];
  analysis: string;
};
