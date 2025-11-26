import json
import os
from sentence_transformers import SentenceTransformer

def main():
    # Paths
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    metadata_path = os.path.join(base_dir, 'metadata', 'meme_metadata.json')
    embeddings_path = os.path.join(base_dir, 'metadata', 'meme_embeddings.json')

    # Load metadata
    print(f"Loading metadata from {metadata_path}...")
    with open(metadata_path, 'r') as f:
        data = json.load(f)

    # Initialize model
    print("Loading SentenceTransformer model...")
    model = SentenceTransformer('all-MiniLM-L6-v2')

    embeddings_data = []

    print("Generating embeddings...")
    for meme in data['memes']:
        # Construct text for embedding: tags + prompt + captions
        tags_text = " ".join(meme.get('tags', []))
        prompt_text = meme.get('prompt', "")
        captions_text = " ".join(meme.get('captions', []))
        
        text = f"{tags_text} {prompt_text} {captions_text}".strip()
        
        if text:
            embedding = model.encode(text).tolist()
            
            embeddings_data.append({
                "image_name": meme['image_name'],
                "embedding": embedding
            })

    # Save embeddings
    print(f"Saving embeddings to {embeddings_path}...")
    with open(embeddings_path, 'w') as f:
        json.dump(embeddings_data, f, indent=2) # Saving as a list of objects

    print(f"Successfully generated embeddings for {len(embeddings_data)} memes.")

if __name__ == "__main__":
    main()
