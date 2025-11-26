import json
import os
import numpy as np
from sentence_transformers import SentenceTransformer

class SearchEngine:
    def __init__(self, base_dir):
        self.base_dir = base_dir
        self.metadata_path = os.path.join(base_dir, 'metadata', 'meme_metadata.json')
        self.embeddings_path = os.path.join(base_dir, 'metadata', 'meme_embeddings.json')
        
        self.metadata = self._load_json(self.metadata_path).get('memes', [])
        self.embeddings_data = self._load_json(self.embeddings_path)
        
        # Create a map for quick lookup
        self.meme_map = {m['image_name']: m for m in self.metadata}
        
        # Prepare embeddings matrix and image names list
        self.image_names = [item['image_name'] for item in self.embeddings_data]
        self.embeddings_matrix = np.array([item['embedding'] for item in self.embeddings_data])
        
        print("SearchEngine initialized (Model will load on first search).")
        self.model = None

    def _load_json(self, path):
        with open(path, 'r') as f:
            return json.load(f)

    def _get_model(self):
        if self.model is None:
            print("Loading SentenceTransformer model...")
            self.model = SentenceTransformer('all-MiniLM-L6-v2')
        return self.model

    def search(self, query, threshold=0.3):
        # Encode query
        model = self._get_model()
        query_embedding = model.encode(query)
        
        # Calculate cosine similarity
        # Cosine Similarity = (A . B) / (||A|| * ||B||)
        # Since embeddings from SentenceTransformer are normalized, ||A|| = ||B|| = 1
        # So we just need the dot product
        similarities = np.dot(self.embeddings_matrix, query_embedding)
        
        # Find best match
        best_idx = np.argmax(similarities)
        best_score = similarities[best_idx]
        
        print(f"Query: '{query}' | Best match score: {best_score:.4f}")
        
        if best_score < threshold:
            return None
            
        best_image_name = self.image_names[best_idx]
        meme_info = self.meme_map.get(best_image_name)
        
        if meme_info:
            return {
                "image_name": best_image_name,
                "score": float(best_score),
                "metadata": meme_info,
                "image_url": f"/images/{best_image_name}", # Serving path
                "explanation": f"This meme matches your vibe with a {int(best_score * 100)}% confidence. It is associated with tags like {', '.join(meme_info.get('tags', [])[:3])}, making it a great fit for '{query}'."
            }
        return None
