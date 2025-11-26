import json
import os

def main():
    # Paths
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    metadata_path = os.path.join(base_dir, 'metadata', 'meme_metadata.json')

    # Load metadata
    with open(metadata_path, 'r') as f:
        data = json.load(f)

    memes = data['memes']
    unique_memes = {}
    
    # Keep the first occurrence of each image_name
    for meme in memes:
        image_name = meme['image_name']
        if image_name not in unique_memes:
            unique_memes[image_name] = meme
    
    cleaned_memes = list(unique_memes.values())
    
    print(f"Original count: {len(memes)}")
    print(f"Cleaned count: {len(cleaned_memes)}")

    # Save cleaned metadata
    with open(metadata_path, 'w') as f:
        json.dump({"memes": cleaned_memes}, f, indent=2)

if __name__ == "__main__":
    main()
