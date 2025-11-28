# MemeDock - AI-Powered Meme Search Engine

A semantic meme search engine powered by AI that understands context and meaning, not just keywords.

## 🚀 Features

- **AI-Powered Search**: Uses SentenceTransformer to understand semantic meaning
- **External Fallback**: Searches Reddit and Imgflip when local vault doesn't have matches
- **Community Features**: Vote on memes, submit your own
- **Beautiful UI**: Premium, mobile-responsive design with glassmorphism
- **Meme Customization**: Add captions, adjust text, download with edits

## 🛠️ Tech Stack

**Frontend:**
- Next.js 16 (React)
- TypeScript
- Tailwind CSS
- Framer Motion

**Backend:**
- FastAPI (Python)
- SentenceTransformers (AI)
- NumPy
- PRAW (Reddit API)



## 📁 Project Structure

```
meme_vault/
├── backend/
│   ├── main.py              # FastAPI app
│   ├── search_engine.py     # AI search logic
│   ├── fallback.py          # External meme fetching
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── app/                 # Next.js pages
│   ├── components/          # React components
│   └── public/              # Static assets
├── images/                  # Meme image files
├── metadata/
│   ├── meme_metadata.json   # Meme information
│   └── meme_embeddings.json # AI embeddings
└── scripts/                 # Utility scripts
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for learning or your own projects!

## 🙏 Acknowledgments

- SentenceTransformers for the AI model
- The meme community for inspiration
- All contributors and users

---

Built with ❤️ by an ambitious teenager learning to code
