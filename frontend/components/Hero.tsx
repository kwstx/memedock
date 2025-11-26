"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface HeroProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export default function Hero({ onSearch, isLoading }: HeroProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-20 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-7xl font-bold tracking-tight mb-6 text-gray-900 font-serif-premium"
        >
          Find the Perfect <span className="text-blue-600 italic">Meme</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto font-serif-premium"
        >
          The ultimate meme search engine for creators, businesses, and everyone in between.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="relative max-w-2xl mx-auto"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200" />
            <div className="relative flex items-center bg-white rounded-2xl shadow-xl">
              <Search className="absolute left-6 w-6 h-6 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Describe the meme you're looking for..."
                className="w-full py-6 pl-16 pr-6 text-lg text-gray-900 font-medium bg-transparent border-none focus:ring-0 rounded-2xl placeholder:text-gray-400"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-3 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {isLoading ? "Searching..." : "Search"}
              </button>
            </div>
          </div>
        </motion.form>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-white/60 pointer-events-none" />
    </section>
  );
}
