"use client";

import { motion } from "framer-motion";
import { Search, Sparkles, SlidersHorizontal, ArrowRight } from "lucide-react";

const steps = [
    {
        icon: Search,
        title: "Describe the Context",
        description: "Don't just search for keywords. Describe the situation, the feeling, or the exact moment you want to capture.",
        color: "bg-blue-50 text-blue-600"
    },
    {
        icon: Sparkles,
        title: "Get Smart Matches",
        description: "Our search understands humor and nuance. It finds memes that match the *vibe* of your description, not just the text.",
        color: "bg-purple-50 text-purple-600"
    },
    {
        icon: SlidersHorizontal,
        title: "Tweak & Perfect",
        description: "Need something more specific? Refine your query or filter by template to land the perfect reaction.",
        color: "bg-pink-50 text-pink-600"
    }
];

export default function HowItWorks() {
    return (
        <section className="py-16 md:py-24 px-6 bg-gray-50/50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif-premium"
                    >
                        Meme Finding, <br />
                        <span className="text-blue-600 italic">Reimagined.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gray-600"
                    >
                        Stop scrolling through thousands of images.
                        Just tell us what you mean, and let our search do the heavy lifting.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center mb-6`}>
                                <step.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4 font-serif-premium">{step.title}</h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-20 flex justify-between items-center border-t border-gray-200 pt-12"
                >
                    <h3 className="text-3xl font-bold text-gray-900 font-serif-premium">Ready to start?</h3>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="group flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all hover:pr-8 font-serif-premium"
                    >
                        Try the Search
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
