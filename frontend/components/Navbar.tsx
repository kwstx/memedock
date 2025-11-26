"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Database, Sparkles, ThumbsUp, Upload, Github, Menu, X } from "lucide-react";

export default function Navbar() {
    const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [isContributeOpen, setIsContributeOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-40 bg-white/50 backdrop-blur-md border-b border-white/20">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center text-xl font-bold text-black">
                    MemeDock
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                    <div
                        className="relative"
                        onMouseEnter={() => setIsFeaturesOpen(true)}
                        onMouseLeave={() => setIsFeaturesOpen(false)}
                    >
                        <button
                            className="flex items-center gap-1 hover:text-gray-900 transition-colors focus:outline-none"
                            onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                        >
                            Features
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isFeaturesOpen ? "rotate-180" : ""}`} />
                        </button>

                        <AnimatePresence>
                            {isFeaturesOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white backdrop-blur-xl border border-white/40 rounded-xl shadow-xl overflow-hidden p-2"
                                >
                                    <div className="flex flex-col gap-1">
                                        <Link
                                            href="/vault"
                                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className="p-2 bg-purple-100 text-purple-600 rounded-md group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                                <Database className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900 font-serif-premium">Meme Vault</div>
                                                <div className="text-xs text-gray-500">Explore the collection</div>
                                            </div>
                                        </Link>

                                        <Link
                                            href="/search"
                                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className="p-2 bg-blue-100 text-blue-600 rounded-md group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                <Search className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900 font-serif-premium">Search Engine</div>
                                                <div className="text-xs text-gray-500">Try the search</div>
                                            </div>
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div
                        className="relative"
                        onMouseEnter={() => setIsContributeOpen(true)}
                        onMouseLeave={() => setIsContributeOpen(false)}
                    >
                        <button
                            className="flex items-center gap-1 hover:text-gray-900 transition-colors focus:outline-none"
                            onClick={() => setIsContributeOpen(!isContributeOpen)}
                        >
                            Contribute
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isContributeOpen ? "rotate-180" : ""}`} />
                        </button>

                        <AnimatePresence>
                            {isContributeOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white backdrop-blur-xl border border-white/40 rounded-xl shadow-xl overflow-hidden p-2"
                                >
                                    <div className="flex flex-col gap-1">
                                        <Link
                                            href="/vote"
                                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className="p-2 bg-green-100 text-green-600 rounded-md group-hover:bg-green-600 group-hover:text-white transition-colors">
                                                <ThumbsUp className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900 font-serif-premium">Vote</div>
                                                <div className="text-xs text-gray-500">Vote what memes you like</div>
                                            </div>
                                        </Link>

                                        <Link
                                            href="/submit"
                                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className="p-2 bg-orange-100 text-orange-600 rounded-md group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                                <Upload className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900 font-serif-premium">Submit</div>
                                                <div className="text-xs text-gray-500">Submit memes for the vault</div>
                                            </div>
                                        </Link>

                                        <Link
                                            href="https://github.com"
                                            target="_blank"
                                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className="p-2 bg-gray-100 text-gray-600 rounded-md group-hover:bg-gray-900 group-hover:text-white transition-colors">
                                                <Github className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900 font-serif-premium">More</div>
                                                <div className="text-xs text-gray-500">Check GitHub for more</div>
                                            </div>
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div
                        className="relative"
                        onMouseEnter={() => setIsAboutOpen(true)}
                        onMouseLeave={() => setIsAboutOpen(false)}
                    >
                        <Link
                            href="/about"
                            className="flex items-center gap-1 hover:text-gray-900 transition-colors py-2 group"
                        >
                            About
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isAboutOpen ? "rotate-180" : ""}`} />
                        </Link>

                        <AnimatePresence>
                            {isAboutOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full right-0 mt-2 w-64 bg-white backdrop-blur-xl border border-white/40 rounded-xl shadow-xl overflow-hidden p-2 z-50"
                                >
                                    <div className="p-2">
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-pink-100 text-pink-600 rounded-md">
                                                <Sparkles className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 mb-1 font-serif-premium text-sm">The Story</h3>
                                                <p className="text-xs text-gray-600 leading-relaxed mb-2">
                                                    Created by an ambitious teenager solo dev with a goal to master new skills.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-2 flex items-center gap-2 text-[10px] font-medium text-purple-600 bg-purple-50 p-2 rounded-lg">
                                            <span>❤️</span>
                                            <span>Fueled by a deep love for memes</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="hidden md:block">
                    <Link
                        href="/search"
                        className="px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-gray-600 hover:text-gray-900"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="px-6 py-4 space-y-4">
                            <div className="space-y-2">
                                <div className="font-medium text-gray-900">Features</div>
                                <div className="pl-4 space-y-2 text-sm text-gray-600">
                                    <Link href="/vault" className="block py-1">Meme Vault</Link>
                                    <Link href="/search" className="block py-1">Search Engine</Link>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="font-medium text-gray-900">Contribute</div>
                                <div className="pl-4 space-y-2 text-sm text-gray-600">
                                    <Link href="/vote" className="block py-1">Vote</Link>
                                    <Link href="/submit" className="block py-1">Submit</Link>
                                    <Link href="https://github.com" className="block py-1">GitHub</Link>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Link href="/about" className="block font-medium text-gray-900">About</Link>
                            </div>
                            <div className="pt-4">
                                <Link
                                    href="/search"
                                    className="block w-full text-center px-5 py-3 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
