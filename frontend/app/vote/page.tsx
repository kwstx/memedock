"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ThumbsUp, ThumbsDown, Loader2, ArrowLeft } from "lucide-react";

interface Meme {
    image_name: string;
    category: string;
    tags: string[];
    prompt: string;
    captions: string[];
    upvotes?: number;
    downvotes?: number;
}

export default function VotePage() {
    const [memes, setMemes] = useState<Meme[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [votingState, setVotingState] = useState<{ [key: string]: 'up' | 'down' | null }>({});

    useEffect(() => {
        const fetchMemes = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/get-all-memes");
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

    const handleVote = async (meme: Meme, voteType: 'upvote' | 'downvote') => {
        // Optimistic update
        setVotingState(prev => ({
            ...prev,
            [meme.image_name]: voteType === 'upvote' ? 'up' : 'down'
        }));

        // Optimistically update counts
        setMemes(prevMemes => prevMemes.map(m => {
            if (m.image_name === meme.image_name) {
                return {
                    ...m,
                    upvotes: voteType === 'upvote' ? (m.upvotes || 0) + 1 : (m.upvotes || 0),
                    downvotes: voteType === 'downvote' ? (m.downvotes || 0) + 1 : (m.downvotes || 0)
                };
            }
            return m;
        }));

        try {
            const response = await fetch("http://127.0.0.1:8000/vote", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    image_name: meme.image_name,
                    vote_type: voteType,
                }),
            });

            if (!response.ok) {
                throw new Error("Vote failed");
            }
        } catch (error) {
            console.error("Vote error:", error);
            // Revert optimistic update on error
            setVotingState(prev => ({
                ...prev,
                [meme.image_name]: null
            }));
            // Revert counts
            setMemes(prevMemes => prevMemes.map(m => {
                if (m.image_name === meme.image_name) {
                    return {
                        ...m,
                        upvotes: voteType === 'upvote' ? (m.upvotes || 0) - 1 : (m.upvotes || 0),
                        downvotes: voteType === 'downvote' ? (m.downvotes || 0) - 1 : (m.downvotes || 0)
                    };
                }
                return m;
            }));
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                <Link href="/" className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors mb-8 group">
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Go Back Home</span>
                </Link>
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 font-serif-premium"
                    >
                        Vote for the <span className="text-blue-600">Best</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-600 max-w-2xl mx-auto"
                    >
                        Help curate the vault. Upvote the memes that define the culture, downvote the ones that don't belong.
                    </motion.p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {memes.map((meme, index) => (
                            <motion.div
                                key={meme.image_name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group flex flex-col"
                            >
                                <div className="relative aspect-square overflow-hidden bg-gray-100">
                                    <img
                                        src={`http://127.0.0.1:8000/images/${meme.image_name}`}
                                        alt={meme.prompt}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                        <p className="text-white font-medium truncate w-full">{meme.category}</p>
                                    </div>
                                </div>

                                <div className="p-4 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="font-bold text-gray-900 truncate font-serif-premium flex-1 mr-2">
                                            {meme.tags[0] ? meme.tags[0].charAt(0).toUpperCase() + meme.tags[0].slice(1) : "Meme"}
                                        </h3>
                                        <div className="flex items-center gap-2 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                            <span className="text-blue-600">{meme.upvotes || 0}</span>
                                            <span>/</span>
                                            <span className="text-purple-600">{meme.downvotes || 0}</span>
                                        </div>
                                    </div>

                                    <div className="mt-auto flex items-center justify-between gap-2">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleVote(meme, 'upvote')}
                                            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition-colors duration-200 text-xs font-medium border ${votingState[meme.image_name] === 'up'
                                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                                : "bg-white text-gray-500 border-gray-200 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50/30"
                                                }`}
                                        >
                                            <ThumbsUp className="w-3.5 h-3.5" />
                                            <span>{meme.upvotes || 0}</span>
                                        </motion.button>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleVote(meme, 'downvote')}
                                            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition-colors duration-200 text-xs font-medium border ${votingState[meme.image_name] === 'down'
                                                ? "bg-purple-50 text-purple-700 border-purple-200"
                                                : "bg-white text-gray-500 border-gray-200 hover:border-purple-200 hover:text-purple-600 hover:bg-purple-50/30"
                                                }`}
                                        >
                                            <ThumbsDown className="w-3.5 h-3.5" />
                                            <span>{meme.downvotes || 0}</span>
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>

                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
