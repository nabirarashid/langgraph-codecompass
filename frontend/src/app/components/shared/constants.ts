import {
  Globe,
  Smartphone,
  BarChart3,
  ShoppingCart,
  Brain,
  Gamepad2,
} from "lucide-react";

export const API_BASE_URL =
  "https://langgraph-agent-production-90ab.up.railway.app";

export const suggestedQueries = [
  { text: "E-commerce website for small business", icon: ShoppingCart },
  { text: "Mobile app for fitness tracking", icon: Smartphone },
  { text: "Analytics dashboard for startup", icon: BarChart3 },
  { text: "Portfolio website for freelancer", icon: Globe },
  { text: "AI-powered chat application", icon: Brain },
  { text: "Simple 2D puzzle game", icon: Gamepad2 },
];
