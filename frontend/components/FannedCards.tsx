"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FannedCards() {
    return (
        <section className="relative pb-24 pt-0 -mt-8 overflow-hidden z-20">
            {/* Background Globe Effect */}
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-t from-white/40 to-transparent blur-3xl pointer-events-none" />

            {/* Globe Graphic (CSS representation) */}
            <div className="absolute left-1/2 bottom-[-400px] -translate-x-1/2 w-[800px] h-[800px] rounded-full border border-white/20 bg-gradient-to-b from-white/20 to-transparent backdrop-blur-sm pointer-events-none overflow-hidden shadow-[0_-20px_60px_rgba(255,255,255,0.2)]">
                <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')] opacity-20 bg-cover bg-center mix-blend-overlay" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex justify-center items-center h-[400px]">
                    <div className="relative w-[300px] h-[400px] scale-75 md:scale-100">
                        {/* Left Card - Rabbit */}
                        <motion.div
                            initial={{ opacity: 0, x: -50, rotate: -20 }}
                            whileInView={{ opacity: 1, x: -140, rotate: -15 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="absolute top-10 left-0 w-[280px] h-[360px] bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-white transform origin-bottom-right z-0"
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src="/images/rabbit.jpg"
                                    alt="Rabbit Meme"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>

                        {/* Right Card - Lion & Monkey */}
                        <motion.div
                            initial={{ opacity: 0, x: 50, rotate: 20 }}
                            whileInView={{ opacity: 1, x: 140, rotate: 15 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="absolute top-10 right-0 w-[280px] h-[360px] bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-white transform origin-bottom-left z-0"
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src="/images/lion_monkey.jpg"
                                    alt="Lion and Monkey Meme"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>

                        {/* Center Card - Baby */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="absolute top-0 left-0 right-0 mx-auto w-[300px] h-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-white z-10"
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src="/images/baby.png"
                                    alt="Baby Meme"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
