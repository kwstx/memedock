"use client";

import { motion } from "framer-motion";
import { Briefcase, Users, User } from "lucide-react";

const features = [
    {
        icon: Briefcase,
        title: "For Businesses",
        description: "Boost engagement and connect with your audience through culturally relevant humor.",
        gradient: "from-blue-500 to-cyan-500",
        iconColor: "text-blue-500"
    },
    {
        icon: Users,
        title: "For Influencers",
        description: "Create funnier content faster. Find the perfect reaction to keep your followers engaged.",
        gradient: "from-purple-500 to-pink-500",
        iconColor: "text-purple-500"
    },
    {
        icon: User,
        title: "For Everyone",
        description: "Express yourself perfectly. Because sometimes a meme says more than words ever could.",
        gradient: "from-orange-500 to-red-500",
        iconColor: "text-orange-500"
    }
];

export default function ValueProps() {
    return (
        <section className="py-12 md:py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="glass-panel p-8 rounded-3xl hover:scale-105 transition-transform duration-300"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-6">
                                <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900 font-serif-premium">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
