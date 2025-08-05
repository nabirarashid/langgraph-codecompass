import {
  Cloud,
  Code,
  Database,
  GitBranch,
  Monitor,
  Shield,
} from "lucide-react";

export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? process.env.NEXT_PUBLIC_API_URL || "https://your-backend-url.railway.app"
  : "http://localhost:8000";

export const suggestedQueries = [
  { text: "Google Cloud alternatives", icon: Cloud },
  { text: "JavaScript frameworks", icon: Code },
  { text: "Database solutions", icon: Database },
  { text: "CI/CD tools", icon: GitBranch },
  { text: "Monitoring platforms", icon: Monitor },
  { text: "Authentication services", icon: Shield },
];
