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
        try:
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
            
            print(f"Query: '{query}' | Best match score: {best_score:.4f} | Image: {self.image_names[best_idx]}")
            
            if best_score < threshold:
                print(f"Score {best_score:.4f} below threshold {threshold}, returning None")
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
        except Exception as e:
            print(f"ERROR in semantic search: {str(e)}")
            import traceback
            traceback.print_exc()
            
            # Fallback: Keyword Search
            print("Falling back to keyword search...")
            query_terms = query.lower().split()
            best_match = None
            max_matches = 0
            
            for image_name, meme in self.meme_map.items():
                score = 0
                # Check tags
                for tag in meme.get('tags', []):
                    if any(term in tag.lower() for term in query_terms):
                        score += 2
                
                # Check category
                if any(term in meme.get('category', '').lower() for term in query_terms):
                    score += 3
                    
                # Check captions
                for caption in meme.get('captions', []):
                    if any(term in caption.lower() for term in query_terms):
                        score += 1
                        
                if score > max_matches:
                    max_matches = score
                    best_match = image_name
            
            if best_match and max_matches > 0:
                print(f"Keyword match found: {best_match} (Score: {max_matches})")
                meme_info = self.meme_map[best_match]
                return {
                    "image_name": best_match,
                    "score": 0.5, # Artificial score
                    "metadata": meme_info,
                    "image_url": f"/images/{best_match}",
                    "explanation": f"Found based on keywords matching tags/captions."
                }

            # If keyword search also fails, return random
            print("Keyword search failed. Returning random meme.")
            import random
            random_idx = random.randint(0, len(self.image_names) - 1)
            random_image_name = self.image_names[random_idx]
            random_meme_info = self.meme_map.get(random_image_name)
            if random_meme_info:
                return {
                    "image_name": random_image_name,
                    "score": 0.1,
                    "metadata": random_meme_info,
                    "image_url": f"/images/{random_image_name}",
                    "explanation": f"We couldn't find an exact match, but here is a meme from our vault!"
                }
            return None
