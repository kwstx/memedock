"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import ValueProps from "@/components/ValueProps";
import MemeDisplay from "@/components/MemeDisplay";
import FannedCards from "@/components/FannedCards";

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [currentQuery, setCurrentQuery] = useState("");

    const handleSearch = async (query: string) => {
        setIsLoading(true);
        setCurrentQuery(query);
        try {
            const response = await fetch(`http://127.0.0.1:8000/get-meme?query=${encodeURIComponent(query)}`);
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
            {/* Navigation Placeholder */}
            <nav className="fixed top-0 w-full z-40 bg-white/50 backdrop-blur-md border-b border-white/20">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <span className="text-xl font-bold text-black">
                        MemeDock
                    </span>
                    <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
                        <a href="#" className="hover:text-gray-900 transition-colors">Features</a>
                        <a href="#" className="hover:text-gray-900 transition-colors">Pricing</a>
                        <a href="#" className="hover:text-gray-900 transition-colors">About</a>
                    </div>
                    <button className="px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors">
                        Get Started
                    </button>
                </div>
            </nav>

            <Hero onSearch={handleSearch} isLoading={isLoading} />

            <FannedCards />

            <ValueProps />

            <MemeDisplay result={result} query={currentQuery} onClose={() => setResult(null)} />

            {/* Footer */}
            <footer className="py-12 text-center text-gray-500 text-sm">
                <p>© 2025 MemeDock. All rights reserved.</p>
            </footer>
        </main>
    );
}
