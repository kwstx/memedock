"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LoadingScreen from "@/components/LoadingScreen";
import MemeDisplay from "@/components/MemeDisplay";
import { API_ENDPOINTS } from "@/lib/api";

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        try {
            // Simulate loading for effect
            await new Promise(resolve => setTimeout(resolve, 3000));

            const response = await fetch(API_ENDPOINTS.getMeme(query));
            if (!response.ok) throw new Error("Failed to fetch");

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("Search failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const floatingImages = [
        {
            src: "/images/search-assets/patrick.jpg",
            alt: "Patrick Bateman",
            className: "top-[15%] left-[10%] w-48 h-64 md:w-64 md:h-80 -rotate-6",
            delay: 0,
        },
        {
            src: "/images/search-assets/monkey.jpg",
            alt: "Thinking Monkey",
            className: "bottom-[15%] left-[15%] w-40 h-40 md:w-56 md:h-56 rotate-3",
            delay: 1,
        },
        {
            src: "/images/search-assets/staring.jpg",
            alt: "Staring Guy",
            className: "top-[20%] right-[10%] w-44 h-44 md:w-60 md:h-60 rotate-6",
            delay: 2,
        },
        {
            src: "/images/search-assets/tv-guy-v2.jpg",
            alt: "Guy Watching TV",
            className: "bottom-[20%] right-[15%] w-40 h-40 md:w-52 md:h-52 -rotate-3",
            delay: 3,
        },
    ];

    return (
        <main className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center bg-[#FDFBF7]">
            {/* Loading Screen */}
            {isLoading && <LoadingScreen />}

            {/* Soft Gradient Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-200/30 rounded-full blur-[120px] mix-blend-multiply animate-blob" />
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-200/30 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-2000" />
                <div className="absolute bottom-[-20%] left-[20%] w-[700px] h-[700px] bg-pink-200/30 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-4000" />
            </div>

            {/* Navigation */}
            <div className="absolute top-6 left-6 z-50">
                <Link href="/" className="inline-flex items-center text-gray-500 hover:text-gray-900 transition-colors group">
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Go Back Home</span>
                </Link>
            </div>


            {/* Results Overlay */}
            <MemeDisplay
                result={result}
                query={query}
                onClose={() => setResult(null)}
            />

            {/* Floating Images */}
            {floatingImages.map((img, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                        opacity: 1,
                        y: [0, -15, 0],
                    }}
                    transition={{
                        opacity: { duration: 0.8, delay: index * 0.2 },
                        y: {
                            duration: 4 + Math.random() * 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: img.delay,
                        },
                    }}
                    className={`absolute hidden md:block ${img.className} rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50`}
                >
                    <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-700"
                    />
                </motion.div>
            ))}

            {/* Central Content */}
            <div className="relative z-10 w-full max-w-4xl px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 font-serif-premium tracking-tight leading-tight">
                        Find Your Perfect <br />
                        <span className="italic text-blue-600">
                            Meme
                        </span>
                    </h1>

                    <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                        Describe the vibe, emotion, or situation you're looking for.
                    </p>

                    <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                        <div className="relative flex items-center bg-white rounded-full shadow-xl p-2 border border-gray-100 transition-all duration-300 focus-within:shadow-2xl focus-within:border-blue-200 focus-within:scale-[1.01]">
                            <div className="pl-6 text-gray-400">
                                <Search className="w-6 h-6" />
                            </div>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Describe the meme you're dreaming of..."
                                className="flex-1 h-14 px-4 bg-transparent text-lg text-gray-900 placeholder-gray-400 outline-none"
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex items-center gap-1 md:gap-2 px-3 md:px-8 py-2 md:py-3 bg-blue-600 text-white rounded-full font-bold text-sm md:text-lg shadow-lg hover:bg-blue-700 hover:shadow-blue-200 hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-70 disabled:scale-100"
                            >
                                {isLoading ? (
                                    <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                                )}
                                <span className="hidden sm:inline">{isLoading ? "Searching..." : "Start"}</span>
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </main>
    );
}
