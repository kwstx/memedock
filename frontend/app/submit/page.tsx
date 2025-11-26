"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Upload, Check, Loader2, Image as ImageIcon, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SubmitPage() {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [utility, setUtility] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const selectedFile = e.dataTransfer.files[0];
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("utility", utility);

        try {
            const response = await fetch("http://127.0.0.1:8000/submit-meme", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setIsSuccess(true);
                // Reset form after delay
                setTimeout(() => {
                    setFile(null);
                    setPreviewUrl(null);
                    setName("");
                    setDescription("");
                    setUtility("");
                    setIsSuccess(false);
                }, 3000);
            }
        } catch (error) {
            console.error("Submission failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen pt-24 pb-12 px-6 relative overflow-hidden">
            {/* Background Base Layer */}
            <div className="absolute inset-0 -z-20 bg-gray-50" />

            <div className="max-w-3xl mx-auto relative z-10">
                <Link href="/" className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors mb-8 group">
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Go Back Home</span>
                </Link>
                <div className="text-center mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif-premium"
                    >
                        Submit to the <span className="text-purple-600">Vault</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gray-600"
                    >
                        Contribute to the collection. Add memes that define the culture.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-hidden"
                >
                    {isSuccess ? (
                        <div className="p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
                            >
                                <Check className="w-10 h-10 text-green-600" />
                            </motion.div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Submission Received!</h3>
                            <p className="text-gray-600">Your meme has been submitted for review and will be added to the vault soon.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
                            {/* File Upload */}
                            <div
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${previewUrl ? "border-purple-200 bg-purple-50/30" : "border-gray-200 hover:border-purple-300 hover:bg-gray-50"
                                    }`}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                                {previewUrl ? (
                                    <div className="relative h-64 w-full">
                                        <Image
                                            src={previewUrl}
                                            alt="Preview"
                                            fill
                                            className="object-contain rounded-lg"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                                            <p className="text-white font-medium">Click to change</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-8">
                                        <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Upload className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">Upload Image</h3>
                                        <p className="text-sm text-gray-500">Drag & drop or click to browse</p>
                                    </div>
                                )}
                            </div>

                            {/* Form Fields */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Meme Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g., Distracted Boyfriend"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-gray-50 focus:bg-white"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Describe the visual elements and context..."
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-gray-50 focus:bg-white resize-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Why is it useful?</label>
                                    <textarea
                                        value={utility}
                                        onChange={(e) => setUtility(e.target.value)}
                                        placeholder="Explain the semantic utility or emotional resonance..."
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-gray-50 focus:bg-white resize-none"
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={!file || isSubmitting}
                                className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all duration-300 shadow-lg ${!file || isSubmitting
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200 hover:scale-[1.02] active:scale-[0.98]"
                                    }`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Submitting...
                                    </span>
                                ) : (
                                    "Submit to Vault"
                                )}
                            </button>
                        </form>
                    )}
                </motion.div>
            </div>
        </main >
    );
}
