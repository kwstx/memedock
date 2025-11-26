"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import ValueProps from "@/components/ValueProps";
import MemeDisplay from "@/components/MemeDisplay";
import FannedCards from "@/components/FannedCards";
import CommunitySection from "@/components/CommunitySection";
import HowItWorks from "@/components/HowItWorks";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import { API_ENDPOINTS } from "@/lib/api";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [currentQuery, setCurrentQuery] = useState("");

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setCurrentQuery(query);
    try {
      // Simulate 5 second loading delay as requested
      await new Promise(resolve => setTimeout(resolve, 5000));

      const response = await fetch(API_ENDPOINTS.getMeme(query));
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Search failed:", error);
      // Ideally show an error toast here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-premium selection:bg-blue-100">
      {isLoading && <LoadingScreen />}

      <Navbar />

      <Hero onSearch={handleSearch} isLoading={isLoading} />

      <FannedCards />

      <ValueProps />

      <CommunitySection />

      <HowItWorks />

      <MemeDisplay result={result} query={currentQuery} onClose={() => setResult(null)} />

      {/* Footer */}
      <footer className="py-12 text-center text-gray-500 text-sm">
        <p>© 2025 MemeDock. Preserving internet culture for future generations.</p>
      </footer>
    </main>
  );
}
