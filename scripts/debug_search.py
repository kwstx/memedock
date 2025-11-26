import json
import os
import numpy as np
from sentence_transformers import SentenceTransformer

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    metadata_path = os.path.join(base_dir, 'metadata', 'meme_metadata.json')
    embeddings_path = os.path.join(base_dir, 'metadata', 'meme_embeddings.json')

    # Load metadata
    with open(metadata_path, 'r') as f:
        metadata = json.load(f)['memes']
    
    # Load embeddings
    with open(embeddings_path, 'r') as f:
        embeddings_data = json.load(f)
        
    print(f"Metadata count: {len(metadata)}")
    print(f"Embeddings count: {len(embeddings_data)}")
    
    # Check if captions are in metadata
    first_meme = metadata[0]
    print(f"First meme captions: {first_meme.get('captions')}")
    
    # Load model
    model = SentenceTransformer('all-MiniLM-L6-v2')
    
    # Test query
    query = "When the code compiles but the output is cursed"
    query_embedding = model.encode(query)
    
    # Find best match manually
    best_score = -1
    best_name = ""
    
    for item in embeddings_data:
        embedding = np.array(item['embedding'])
        score = np.dot(embedding, query_embedding)
        if score > best_score:
            best_score = score
            best_name = item['image_name']
            
    print(f"Query: '{query}'")
    print(f"Best match: {best_name}")
    print(f"Score: {best_score}")

if __name__ == "__main__":
    main()
