export type Tool = {
  name: string;
  website: string;
  pricing: string;
  openSource: boolean;
  apiAvailable: boolean;
  description: string;
  techStack: string[];
  features: string[];
};

export type Results = {
  tools: Tool[];
  recommendation: string;
};
