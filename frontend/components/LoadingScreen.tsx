"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Search, Sparkles, Database, Coffee, Brain } from "lucide-react";

const loadingMessages = [
    "Thinking...",
    "Searching trenches...",
    "Going for a coffee...",
    "Trying my best...",
    "Consulting the meme lords...",
    "Analyzing humor patterns..."
];

const icons = [Search, Sparkles, Database, Coffee, Brain];

export default function LoadingScreen() {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-xl">
            <div className="relative w-64 h-64 mb-12 scale-75 md:scale-100">
                {/* Spinning Outer Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-blue-100/50"
                >
                    <div className="absolute inset-0 rounded-full opacity-30"
                        style={{
                            backgroundImage: 'radial-gradient(circle, #3b82f6 1.5px, transparent 1.5px)',
                            backgroundSize: '16px 16px',
                            maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)',
                            WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
                        }}
                    />
                </motion.div>

                {/* Inner Pulsing Core */}
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 m-auto w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-2xl"
                />

                {/* Orbiting Icons */}
                {icons.map((Icon, index) => {
                    const angle = (index / icons.length) * 2 * Math.PI;
                    const radius = 100; // Distance from center
                    const isBrain = Icon === Brain;

                    return (
                        <motion.div
                            key={index}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            style={{ position: 'absolute', width: '100%', height: '100%' }}
                        >
                            <motion.div
                                className={`absolute ${isBrain ? 'w-32 h-32' : 'w-12 h-12'} bg-white rounded-xl shadow-lg border border-blue-50 flex items-center justify-center overflow-hidden`}
                                style={{
                                    left: '50%',
                                    top: '50%',
                                    marginLeft: isBrain ? -64 : -24,
                                    marginTop: isBrain ? -64 : -24,
                                    transform: `rotate(${index * (360 / icons.length)}deg) translate(${radius}px) rotate(-${index * (360 / icons.length)}deg)`
                                }}
                                // Counter-rotate the icon so it stays upright
                                animate={{ rotate: -360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            >
                                {isBrain ? (
                                    <img src="/images/big_brain.jpg" alt="Big Brain" className="w-full h-full object-contain" />
                                ) : (
                                    <Icon className="w-6 h-6 text-blue-600" />
                                )}
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Cycling Text */}
            <div className="h-8 relative overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={messageIndex}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-xl font-medium text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
                    >
                        {loadingMessages[messageIndex]}
                    </motion.p>
                </AnimatePresence>
            </div>
        </div>
    );
}
