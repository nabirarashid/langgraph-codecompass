"use client";

import React, { useState, useRef, useEffect } from "react";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import AnimatedBackground from "@/app/components/layout/AnimatedBackground";
import SearchSection from "@/app/components/search/SearchSection";
import ResultsSection from "@/app/components/results/ResultsSection";
import { Results } from "@/app/components/shared/types";
import { API_BASE_URL } from "@/app/components/shared/constants";

const DevToolsApp = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<Results | null>(null);
  const [searchStage, setSearchStage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [query]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsSearching(true);
    setResults(null);
    setError(null);

    try {
      // Show real-time progress
      setSearchStage("Searching for developer tools...");

      const response = await fetch(`${API_BASE_URL}/api/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query.trim() }),
      });

      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }

      const data = await response.json();
      setResults(data);
      setSearchStage("");
    } catch (error) {
      console.error("Search error:", error);
      setError(
        "Search failed. Please make sure the backend server is running on port 8000."
      );
      setSearchStage("");
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  // Helper function to convert markdown bold to HTML
  const formatRecommendation = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <AnimatedBackground />

      <div className="relative z-10">
        <Header />

        <main className="container mx-auto px-6 pb-12">
          <SearchSection
            query={query}
            setQuery={setQuery}
            onSearch={handleSearch}
            isSearching={isSearching}
            onKeyPress={handleKeyPress}
            textareaRef={textareaRef}
            error={error}
            searchStage={searchStage}
            results={results}
          />

          {results && (
            <ResultsSection
              results={results}
              formatRecommendation={formatRecommendation}
            />
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default DevToolsApp;
