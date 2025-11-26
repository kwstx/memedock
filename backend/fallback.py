import os
import requests
import praw
import random
from sentence_transformers import SentenceTransformer
import numpy as np

class ExternalMemeFetcher:
    def __init__(self):
        self.reddit = None
        self.model = None
        
        # Initialize Reddit if credentials exist
        client_id = os.getenv('REDDIT_CLIENT_ID')
        client_secret = os.getenv('REDDIT_CLIENT_SECRET')
        user_agent = os.getenv('REDDIT_USER_AGENT', 'MemeVault/1.0')
        
        if client_id and client_secret:
            try:
                self.reddit = praw.Reddit(
                    client_id=client_id,
                    client_secret=client_secret,
                    user_agent=user_agent
                )
                print("Reddit API initialized.")
            except Exception as e:
                print(f"Failed to initialize Reddit API: {e}")
        else:
            print("Reddit credentials not found. Using JSON fallback.")

    def _get_model(self):
        if self.model is None:
            print("Loading SentenceTransformer model (Fallback)...")
            self.model = SentenceTransformer('all-MiniLM-L6-v2')
        return self.model

    def search_external(self, query):
        print(f"Searching external sources for: {query}")
        candidates = []
        
        # 1. Fetch from Reddit
        candidates.extend(self.fetch_reddit(query))
        
        # 2. Fetch from Imgflip
        candidates.extend(self.fetch_imgflip(query))
        
        if not candidates:
            return None
            
        # 3. Semantic Filter
        best_match = self.filter_and_sort(candidates, query)
        return best_match

    def fetch_reddit(self, query):
        memes = []
        subreddits = ['memes', 'dankmemes']
        
        if self.reddit:
            # PRAW implementation
            for sub in subreddits:
                try:
                    subreddit = self.reddit.subreddit(sub)
                    # Search for the query
                    results = subreddit.search(query, limit=10, sort='relevance')
                    for post in results:
                        if not post.over_18 and post.url.endswith(('.jpg', '.png', '.gif')):
                            memes.append({
                                "image_url": post.url,
                                "caption": post.title,
                                "source": f"reddit/{sub}",
                                "score": post.score
                            })
                except Exception as e:
                    print(f"Error fetching from r/{sub}: {e}")
        else:
            # JSON fallback (public API)
            headers = {'User-Agent': 'MemeVault/1.0'}
            for sub in subreddits:
                try:
                    url = f"https://www.reddit.com/r/{sub}/search.json?q={query}&restrict_sr=1&limit=10&sort=relevance"
                    resp = requests.get(url, headers=headers)
                    if resp.status_code == 200:
                        data = resp.json()
                        for child in data['data']['children']:
                            post = child['data']
                            if not post.get('over_18') and post.get('url', '').endswith(('.jpg', '.png', '.gif')):
                                memes.append({
                                    "image_url": post['url'],
                                    "caption": post['title'],
                                    "source": f"reddit/{sub}",
                                    "score": post.get('score', 0)
                                })
                except Exception as e:
                    print(f"Error fetching from r/{sub} (JSON): {e}")
                    
        return memes

    def fetch_imgflip(self, query):
        memes = []
        try:
            resp = requests.get("https://api.imgflip.com/get_memes")
            if resp.status_code == 200:
                data = resp.json()
                if data['success']:
                    for meme in data['data']['memes']:
                        # Imgflip returns templates, not finished memes usually, but we can match names
                        # Or we can treat the name as the caption for semantic matching
                        memes.append({
                            "image_url": meme['url'],
                            "caption": meme['name'],
                            "source": "imgflip",
                            "score": 0 # Imgflip API doesn't give score/popularity in this endpoint easily
                        })
        except Exception as e:
            print(f"Error fetching from Imgflip: {e}")
        return memes

    def filter_and_sort(self, candidates, query):
        if not candidates:
            return None
            
        # Encode query
        model = self._get_model()
        query_embedding = model.encode(query)
        
        # Encode candidates
        captions = [c['caption'] for c in candidates]
        candidate_embeddings = model.encode(captions)
        
        # Calculate similarities
        similarities = np.dot(candidate_embeddings, query_embedding)
        
        # Find best match
        best_idx = np.argmax(similarities)
        best_score = similarities[best_idx]
        best_meme = candidates[best_idx]
        
        print(f"Best external match: {best_meme['caption']} (Score: {best_score:.4f})")
        
        # Return if score is decent (e.g., > 0.2)
        if best_score > 0.2:
            best_meme['similarity_score'] = float(best_score)
            return best_meme
            
        return None
