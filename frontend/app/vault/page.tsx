"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Calendar, Tag, Hash, Info, ArrowLeft } from "lucide-react";
import { API_ENDPOINTS } from "@/lib/api";

interface Meme {
    image_name: string;
    category: string;
    tags: string[];
    prompt: string;
    captions: string[];
}

export default function VaultPage() {
    const [memes, setMemes] = useState<Meme[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);

    useEffect(() => {
        const fetchMemes = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.getAllMemes());
                const data = await response.json();
                setMemes(data.memes);
            } catch (error) {
                console.error("Failed to fetch memes:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMemes();
    }, []);

    return (
        <main className="min-h-screen bg-gray-50 pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                <Link href="/" className="inline-flex items-center text-gray-500 hover:text-purple-600 transition-colors mb-8 group">
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Go Back Home</span>
                </Link>
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 font-serif-premium"
                    >
                        The <span className="text-purple-600">Vault</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-600 max-w-2xl mx-auto"
                    >
                        Explore our curated collection of semantic memes.
                        Each one hand-picked and tagged for perfect context matching.
                    </motion.p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {memes.map((meme, index) => (
                            <motion.div
                                key={meme.image_name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                onClick={() => setSelectedMeme(meme)}
                                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 group"
                            >
                                <div className="relative aspect-square overflow-hidden bg-gray-100">
                                    <img
                                        src={API_ENDPOINTS.imageUrl(meme.image_name)}
                                        alt={meme.prompt}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                        <p className="text-white font-medium truncate w-full">{meme.category}</p>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-gray-900 truncate font-serif-premium mb-2">
                                        {meme.tags[0] ? meme.tags[0].charAt(0).toUpperCase() + meme.tags[0].slice(1) : "Meme"}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {meme.tags.slice(0, 2).map(tag => (
                                            <span key={tag} className="text-xs px-2 py-1 bg-purple-50 text-purple-600 rounded-full font-medium">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <AnimatePresence>
                {selectedMeme && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedMeme(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl overflow-hidden max-w-5xl w-full max-h-[90vh] shadow-2xl flex flex-col md:flex-row"
                        >
                            {/* Image Section */}
                            <div className="w-full md:w-1/2 bg-gray-100 relative min-h-[300px] md:min-h-full">
                                <img
                                    src={API_ENDPOINTS.imageUrl(selectedMeme.image_name)}
                                    alt={selectedMeme.prompt}
                                    className="w-full h-full object-contain p-4"
                                />
                            </div>

                            {/* Details Section */}
                            <div className="w-full md:w-1/2 p-8 overflow-y-auto bg-white">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold mb-3">
                                            {selectedMeme.category.toUpperCase()}
                                        </span>
                                        <h2 className="text-3xl font-bold text-gray-900 font-serif-premium leading-tight">
                                            {selectedMeme.tags[0] ? selectedMeme.tags[0].charAt(0).toUpperCase() + selectedMeme.tags[0].slice(1) : "Meme Details"}
                                        </h2>
                                    </div>
                                    <button
                                        onClick={() => setSelectedMeme(null)}
                                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                                    >
                                        <X className="w-5 h-5 text-gray-500" />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <div className="flex items-center gap-2 mb-2 text-gray-900 font-bold">
                                            <Info className="w-4 h-4 text-purple-600" />
                                            Origin Story
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            This meme was discovered in the wild and carefully curated for its semantic versatility.
                                            It represents a core archetype of internet culture, perfect for expressing {selectedMeme.category} moments.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-3 rounded-xl bg-pink-50 border border-pink-100">
                                            <div className="flex items-center gap-2 text-pink-700 font-bold text-sm mb-1">
                                                <Calendar className="w-4 h-4" />
                                                Added On
                                            </div>
                                            <p className="text-gray-900 font-medium">Nov 23, 2025</p>
                                        </div>
                                        <div className="p-3 rounded-xl bg-orange-50 border border-orange-100">
                                            <div className="flex items-center gap-2 text-orange-700 font-bold text-sm mb-1">
                                                <Tag className="w-4 h-4" />
                                                Category
                                            </div>
                                            <p className="text-gray-900 font-medium capitalize">{selectedMeme.category}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-3 text-gray-900 font-bold">
                                            <Hash className="w-4 h-4 text-blue-600" />
                                            Semantic Tags
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedMeme.tags.map(tag => (
                                                <span key={tag} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors cursor-default">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-3">Suggested Captions</h3>
                                        <ul className="space-y-2">
                                            {selectedMeme.captions.map((caption, i) => (
                                                <li key={i} className="flex items-start gap-3 text-gray-600 text-sm p-3 bg-gray-50 rounded-lg group hover:bg-purple-50 transition-colors">
                                                    <span className="text-purple-400 font-bold group-hover:text-purple-600 select-none">{i + 1}.</span>
                                                    {caption}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
