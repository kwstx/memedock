import json
import os
import shutil

def fix_images():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    metadata_path = os.path.join(base_dir, 'metadata', 'meme_metadata.json')
    images_dir = os.path.join(base_dir, 'backend', 'images')
    source_image = os.path.join(images_dir, 'tv-guy-v2.jpg')

    if not os.path.exists(source_image):
        print(f"Source image not found: {source_image}")
        return

    with open(metadata_path, 'r') as f:
        data = json.load(f)

    count = 0
    for meme in data.get('memes', []):
        image_name = meme.get('image_name')
        if not image_name:
            continue

        target_path = os.path.join(images_dir, image_name)
        if not os.path.exists(target_path):
            print(f"Creating placeholder for: {image_name}")
            shutil.copy2(source_image, target_path)
            count += 1

    print(f"Created {count} placeholder images.")

if __name__ == "__main__":
    fix_images()
