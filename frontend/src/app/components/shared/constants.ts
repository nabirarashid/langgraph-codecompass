import {
  Cloud,
  Code,
  Database,
  GitBranch,
  Monitor,
  Shield,
} from "lucide-react";

export const API_BASE_URL =
  "https://langgraph-agent-production-90ab.up.railway.app";

export const suggestedQueries = [
  { text: "Google Cloud alternatives", icon: Cloud },
  { text: "JavaScript frameworks", icon: Code },
  { text: "Database solutions", icon: Database },
  { text: "CI/CD tools", icon: GitBranch },
  { text: "Monitoring platforms", icon: Monitor },
  { text: "Authentication services", icon: Shield },
];
