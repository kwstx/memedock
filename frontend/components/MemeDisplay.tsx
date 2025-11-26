"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RefreshCw, Download, Share2, Sparkles, MessageSquare, Type, Move } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface MemeResult {
    image_url: string;
    caption?: string;
    source?: string;
    score?: number;
    explanation?: string;
    metadata?: any;
}

interface MemeDisplayProps {
    result: MemeResult | null;
    query: string;
    onClose: () => void;
}

export default function MemeDisplay({ result, query, onClose }: MemeDisplayProps) {
    const [captionText, setCaptionText] = useState("");
    const [showCaptionInput, setShowCaptionInput] = useState(false);
    const [showTextBackground, setShowTextBackground] = useState(false);
    const [textSize, setTextSize] = useState(1);
    const [textPos, setTextPos] = useState({ x: 50, y: 90 });
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handlePointerMove = (e: PointerEvent) => {
            if (!isDragging || !containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            setTextPos({
                x: Math.max(0, Math.min(100, x)),
                y: Math.max(0, Math.min(100, y))
            });
        };

        const handlePointerUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener('pointermove', handlePointerMove);
            window.addEventListener('pointerup', handlePointerUp);
        }

        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };
    }, [isDragging]);

    if (!result) return null;

    // Determine the image source URL
    const imageUrl = result.image_url
        ? (result.image_url.startsWith("http") ? result.image_url : `http://127.0.0.1:8000${result.image_url}`)
        : null;

    if (!imageUrl) {
        return (
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="fixed inset-0 z-50 bg-white overflow-y-auto flex items-center justify-center"
                >
                    <div className="text-center p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">No Meme Found</h2>
                        <p className="text-gray-600 mb-8">We couldn't find a meme matching "{query}".</p>
                        <button
                            onClick={onClose}
                            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                        >
                            Try Another Search
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        );
    }

    const handleSave = async () => {
        if (!imageUrl) return;

        // Use proxy for external images to avoid CORS issues
        const isExternal = imageUrl.startsWith('http') && !imageUrl.includes('127.0.0.1:8000') && !imageUrl.includes('localhost:8000');
        const fetchUrl = isExternal
            ? `http://127.0.0.1:8000/proxy-image?url=${encodeURIComponent(imageUrl)}`
            : imageUrl;

        try {
            // If no caption, just download the image directly
            if (!captionText.trim()) {
                const response = await fetch(fetchUrl);
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                const filename = imageUrl.split('/').pop() || 'meme.jpg';
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
                return;
            }

            // If caption exists, composite it on canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = fetchUrl;

            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });

            canvas.width = img.width;
            canvas.height = img.height;

            if (ctx) {
                ctx.drawImage(img, 0, 0);

                // Configure text style
                const fontSize = Math.floor(img.height * 0.1 * textSize); // 10% of image height scaled
                ctx.font = `900 ${fontSize}px Impact, sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                // Draw text at the specified position
                const x = canvas.width * (textPos.x / 100);
                const y = canvas.height * (textPos.y / 100);
                const text = captionText.toUpperCase();

                if (showTextBackground) {
                    const metrics = ctx.measureText(text);
                    const padding = fontSize * 0.2;
                    const bgWidth = metrics.width + (padding * 2);
                    const bgHeight = fontSize * 1.2;

                    ctx.fillStyle = 'black';
                    ctx.fillRect(
                        x - (bgWidth / 2),
                        y - (bgHeight / 2),
                        bgWidth,
                        bgHeight
                    );
                }

                ctx.fillStyle = 'white';
                ctx.strokeStyle = 'black';
                ctx.lineWidth = Math.floor(fontSize * 0.05);

                if (!showTextBackground) {
                    ctx.strokeText(text, x, y);
                }
                ctx.fillText(text, x, y);
            }

            canvas.toBlob((blob) => {
                if (blob) {
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `meme-captioned-${Date.now()}.jpg`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                }
            }, 'image/jpeg');

        } catch (error) {
            console.error('Failed to download image:', error);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed inset-0 z-50 bg-white overflow-y-auto"
            >
                <div className="min-h-screen flex flex-col lg:flex-row">
                    {/* Left Column - Image Display */}
                    <div className="lg:w-1/2 bg-gray-50 flex items-center justify-center p-4 md:p-8 lg:p-12 relative">
                        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="relative z-10 max-w-2xl w-full"
                        >
                            <div className="bg-white p-1 rounded-3xl shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500 relative overflow-hidden group">
                                <div ref={containerRef} className="relative overflow-hidden rounded-xl">
                                    <img
                                        src={imageUrl}
                                        alt="Meme result"
                                        className="w-full h-auto select-none pointer-events-none"
                                    />
                                    {captionText && (
                                        <div
                                            className="absolute cursor-move touch-none select-none"
                                            style={{
                                                left: `${textPos.x}%`,
                                                top: `${textPos.y}%`,
                                                transform: 'translate(-50%, -50%)',
                                                zIndex: 20
                                            }}
                                            onPointerDown={(e) => {
                                                e.preventDefault();
                                                setIsDragging(true);
                                            }}
                                        >
                                            <span
                                                className="font-black text-white uppercase tracking-wide whitespace-nowrap"
                                                style={{
                                                    fontFamily: 'Impact, sans-serif',
                                                    fontSize: `calc(clamp(24px, 5vw, 48px) * ${textSize})`,
                                                    textShadow: showTextBackground ? 'none' : '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000',
                                                    WebkitTextStroke: showTextBackground ? '0' : '2px black',
                                                    backgroundColor: showTextBackground ? 'black' : 'transparent',
                                                    padding: showTextBackground ? '0.2em 0.4em' : '0',
                                                }}
                                            >
                                                {captionText}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {captionText && (
                                <div className="text-center mt-4 text-gray-500 text-sm flex items-center justify-center gap-2">
                                    <Move className="w-4 h-4" />
                                    Drag text to position
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Right Column - Details & Actions */}
                    <div className="lg:w-1/2 p-6 md:p-8 lg:p-16 flex flex-col justify-center bg-white">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="max-w-xl mx-auto w-full"
                        >
                            <button
                                onClick={onClose}
                                className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8 group"
                            >
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                Back to Search
                            </button>

                            <h1 className="text-4xl md:text-5xl font-bold mb-8 font-serif-premium">
                                <span className="text-gray-900">
                                    Perfect Match Found
                                </span>
                            </h1>

                            {/* Context Box */}
                            <div className="bg-blue-50/50 rounded-2xl p-6 mb-6 border border-blue-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <MessageSquare className="w-5 h-5 text-blue-600" />
                                    <h3 className="font-semibold text-blue-900 font-serif-premium">Your Context</h3>
                                </div>
                                <p className="text-blue-800 text-lg">"{query}"</p>
                            </div>

                            {/* Explanation Box */}
                            <div className="bg-purple-50/50 rounded-2xl p-6 mb-10 border border-purple-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <Sparkles className="w-5 h-5 text-purple-600" />
                                    <h3 className="font-semibold text-purple-900 font-serif-premium">Why this fits</h3>
                                </div>
                                <p className="text-purple-800 leading-relaxed">
                                    {result.explanation || "This meme perfectly captures the sentiment of your request. The visual expression combined with the context creates a highly relatable reaction that matches the specific vibe you described."}
                                </p>
                            </div>

                            {/* Caption Input */}
                            {showCaptionInput && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mb-6"
                                >
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Add Caption</label>
                                    <div className="flex gap-2 mb-4">
                                        <input
                                            type="text"
                                            value={captionText}
                                            onChange={(e) => setCaptionText(e.target.value)}
                                            placeholder="Type your caption here..."
                                            className="flex-1 px-4 py-3 text-gray-900 font-medium rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                        />
                                        <button
                                            onClick={() => setShowTextBackground(!showTextBackground)}
                                            className={`px-4 py-3 rounded-xl font-bold transition-colors border ${showTextBackground ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
                                            title="Toggle Background"
                                        >
                                            <div className="w-6 h-6 flex items-center justify-center border border-current bg-current">
                                                <span className={`text-xs ${showTextBackground ? 'text-black bg-white' : 'text-white bg-black'} px-1`}>A</span>
                                            </div>
                                        </button>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-2">Text Size</label>
                                        <input
                                            type="range"
                                            min="0.5"
                                            max="2"
                                            step="0.1"
                                            value={textSize}
                                            onChange={(e) => setTextSize(parseFloat(e.target.value))}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setShowCaptionInput(!showCaptionInput)}
                                    className={`flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold transition-colors ${showCaptionInput ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                                >
                                    <Type className="w-5 h-5" />
                                    {showCaptionInput ? 'Hide Text' : 'Add Text'}
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="flex items-center justify-center gap-2 py-4 px-6 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20"
                                >
                                    <Download className="w-5 h-5" />
                                    Save Image
                                </button>
                                <button
                                    onClick={onClose}
                                    className="col-span-2 flex items-center justify-center gap-2 py-4 px-6 bg-white border-2 border-gray-100 text-gray-900 rounded-xl font-bold hover:border-gray-300 transition-colors"
                                >
                                    <RefreshCw className="w-5 h-5" />
                                    Try Another
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
