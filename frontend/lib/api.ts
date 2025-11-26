// API Configuration
// This file centralizes all API calls to make deployment easier

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export const API_ENDPOINTS = {
    getMeme: (query: string) => `${API_BASE_URL}/get-meme?query=${encodeURIComponent(query)}`,
    getAllMemes: () => `${API_BASE_URL}/get-all-memes`,
    vote: () => `${API_BASE_URL}/vote`,
    submitMeme: () => `${API_BASE_URL}/submit-meme`,
    proxyImage: (url: string) => `${API_BASE_URL}/proxy-image?url=${encodeURIComponent(url)}`,
    imageUrl: (imageName: string) => `${API_BASE_URL}/images/${imageName}`,
    root: () => API_BASE_URL,
};

export default API_BASE_URL;
