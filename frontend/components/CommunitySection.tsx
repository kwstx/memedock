"use client";

import { motion } from "framer-motion";
import { Database, CheckCircle, Users } from "lucide-react";

export default function CommunitySection() {
    return (
        <section className="py-24 px-6 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column - Visual (Light Blue Sphere) */}
                    <div className="relative flex justify-center items-center order-2 lg:order-1">
                        <div className="relative w-full max-w-[500px] aspect-square">
                            {/* Particle Sphere Effect using CSS */}
                            <div className="absolute inset-0 rounded-full bg-blue-50 opacity-50 blur-3xl" />

                            {/* The "Sphere" Container */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                                className="relative w-full h-full rounded-full border border-blue-100/50"
                            >
                                {/* Dot Pattern */}
                                <div className="absolute inset-0 rounded-full opacity-30"
                                    style={{
                                        backgroundImage: 'radial-gradient(circle, #3b82f6 1.5px, transparent 1.5px)',
                                        backgroundSize: '24px 24px',
                                        maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)',
                                        WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
                                    }}
                                />

                                {/* Inner Rotating Ring */}
                                <div className="absolute inset-12 rounded-full border border-blue-200/60 border-dashed animate-spin-slow" />

                                {/* Core Glow */}
                                <div className="absolute inset-0 m-auto w-32 h-32 bg-blue-400/20 rounded-full blur-2xl" />
                            </motion.div>

                            {/* Floating Elements to simulate "Community" */}
                            <motion.div
                                animate={{ y: [-10, 10, -10] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-1/4 left-10 p-4 bg-white rounded-2xl shadow-xl border border-blue-50 z-10"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                        <Users className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Community</p>
                                        <p className="text-sm font-bold text-gray-900">Open to all</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [10, -10, 10] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute bottom-1/3 right-0 p-4 bg-white rounded-2xl shadow-xl border border-blue-50 z-10"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                        <Database className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Vault Size</p>
                                        <p className="text-sm font-bold text-gray-900">Growing Actively</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Column - Content */}
                    <div className="order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight font-serif-premium">
                                Curated Quality. <br />
                                <span className="text-blue-600 italic">Endless Laughter.</span>
                            </h2>
                            <p className="text-lg text-gray-600 mb-12 leading-relaxed">
                                We're building more than just a database. We're creating the gold standard for meme culture, where every image is verified for maximum impact.
                            </p>

                            <div className="space-y-8">
                                {/* Feature 1 */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                                        <Database className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif-premium">Actively Growing Vault</h3>
                                        <p className="text-gray-600">
                                            Our library expands actively with trending formats and timeless classics, ensuring you never miss a beat.
                                        </p>
                                    </div>
                                </div>

                                {/* Feature 2 */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                                        <CheckCircle className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif-premium">Hand-Picked Selection</h3>
                                        <p className="text-gray-600">
                                            No junk. Every meme is manually reviewed and tagged.
                                        </p>
                                    </div>
                                </div>

                                {/* Feature 3 */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center">
                                        <Users className="w-6 h-6 text-pink-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif-premium">Community Built</h3>
                                        <p className="text-gray-600">
                                            Join the movement shaping the future of the vault. Vote, submit, and curate with us.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
