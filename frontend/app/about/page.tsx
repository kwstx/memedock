"use client";

import { motion } from "framer-motion";
import { Code2, Rocket, Heart, ArrowLeft, Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-gradient-premium selection:bg-blue-100">
            <Navbar />

            <div className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-12"
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Link>
                    </motion.div>

                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-center mb-20"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 font-serif-premium text-gray-900">
                            Built with <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600">Passion</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            The story of an ambitious teenager turning coffee into code and memes into dreams.
                        </p>
                    </motion.div>

                    {/* Main Content Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass-panel rounded-3xl p-8 md:p-12 mb-20 relative overflow-hidden"
                    >
                        {/* Background Decorations */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl -mr-32 -mt-32 opacity-50" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100 rounded-full blur-3xl -ml-32 -mb-32 opacity-50" />

                        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-6 font-serif-premium">The Solo Dev Journey</h2>
                                <div className="space-y-6 text-gray-600 leading-relaxed">
                                    <p>
                                        Hi! I'm a teenager with a simple mission: to learn, build, and solve problems.
                                        MemeDock isn't just a search engine; it's a playground where I push the boundaries
                                        of what I can create.
                                    </p>
                                    <p>
                                        Every line of code here was written with the goal of mastering new skills—from
                                        complex semantic search algorithms to crafting pixel-perfect user interfaces.
                                    </p>
                                    <p>
                                        Why memes? Because they're the universal language of the internet. And frankly,
                                        searching for the perfect one shouldn't be this hard.
                                    </p>
                                </div>

                                <div className="flex gap-4 mt-8">
                                    <a href="#" className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-gray-700">
                                        <Github className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-gray-700">
                                        <Twitter className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-gray-700">
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>

                            <div className="grid gap-6">
                                <div className="bg-white/50 p-6 rounded-2xl border border-white/40 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                                        <Rocket className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-2">Ambitious Goals</h3>
                                    <p className="text-sm text-gray-600">Pushing limits to build professional-grade software solo.</p>
                                </div>

                                <div className="bg-white/50 p-6 rounded-2xl border border-white/40 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                                        <Code2 className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-2">Skill Acquisition</h3>
                                    <p className="text-sm text-gray-600">Learning by doing. Every bug is just a lesson in disguise.</p>
                                </div>

                                <div className="bg-white/50 p-6 rounded-2xl border border-white/40 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 mb-4">
                                        <Heart className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-2">Love for Memes</h3>
                                    <p className="text-sm text-gray-600">Because life is too short to send the wrong reaction image.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Footer Quote */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center"
                    >
                        <p className="text-2xl font-serif-premium italic text-gray-400">
                            "Dream big, code hard, and never forget to laugh."
                        </p>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
