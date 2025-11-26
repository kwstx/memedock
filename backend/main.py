import os
import json
from fastapi import FastAPI, Query, File, UploadFile, Form
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from search_engine import SearchEngine
from fallback import ExternalMemeFetcher

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Search Engine
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
search_engine = SearchEngine(base_dir)
external_fetcher = ExternalMemeFetcher()

# Mount images directory to serve static files
images_dir = os.path.join(base_dir, 'images')
app.mount("/images", StaticFiles(directory=images_dir), name="images")

@app.get("/get-meme")
async def get_meme(query: str = Query(..., description="The search query for the meme")):
    result = search_engine.search(query)
    
    if result:
        return JSONResponse(content=result)
    else:
        # Fallback logic: Search external sources
        print("Local search failed. Trying external sources...")
        external_result = external_fetcher.search_external(query)
        
        if external_result:
            return JSONResponse(content={
                "message": "Meme found from external source.",
                "fallback": True,
                "source": external_result['source'],
                "image_url": external_result['image_url'],
                "caption": external_result['caption'],
                "score": external_result.get('similarity_score', 0)
            })
            
        return JSONResponse(content={
            "message": "No relevant meme found in vault or external sources.",
            "fallback": True,
            "query": query
        })

@app.get("/get-all-memes")
async def get_all_memes():
    try:
        metadata_path = os.path.join(base_dir, 'metadata', 'meme_metadata.json')
        with open(metadata_path, 'r') as f:
            data = json.load(f)
        return JSONResponse(content=data)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.get("/")
async def root():
    return {"message": "Meme Vault Backend is running. Use /get-meme?query=... to search."}

from pydantic import BaseModel

class VoteRequest(BaseModel):
    image_name: str
    vote_type: str  # "upvote" or "downvote"

@app.post("/vote")
async def vote_meme(vote: VoteRequest):
    try:
        metadata_path = os.path.join(base_dir, 'metadata', 'meme_metadata.json')
        with open(metadata_path, 'r') as f:
            data = json.load(f)
        
        found = False
        for meme in data['memes']:
            if meme['image_name'] == vote.image_name:
                if vote.vote_type == "upvote":
                    meme['upvotes'] = meme.get('upvotes', 0) + 1
                elif vote.vote_type == "downvote":
                    meme['downvotes'] = meme.get('downvotes', 0) + 1
                found = True
                break
        
        if not found:
            return JSONResponse(content={"error": "Meme not found"}, status_code=404)
            
        with open(metadata_path, 'w') as f:
            json.dump(data, f, indent=2)
            
        return JSONResponse(content={"message": "Vote recorded", "meme": meme})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

from fastapi import FastAPI, Query, File, UploadFile, Form
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import shutil
import uuid
import datetime

# ... existing code ...

@app.post("/submit-meme")
async def submit_meme(
    file: UploadFile = File(...),
    name: str = Form(...),
    description: str = Form(...),
    utility: str = Form(...)
):
    try:
        # Ensure pending directory exists
        pending_dir = os.path.join(base_dir, 'pending_memes')
        os.makedirs(pending_dir, exist_ok=True)

        # Generate unique filename
        file_extension = os.path.splitext(file.filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = os.path.join(pending_dir, unique_filename)
        
        # Save image to pending directory
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # Update pending metadata
        pending_metadata_path = os.path.join(pending_dir, 'pending_submissions.json')
        
        # Create pending metadata file if it doesn't exist
        if not os.path.exists(pending_metadata_path):
            with open(pending_metadata_path, 'w') as f:
                json.dump({"submissions": []}, f, indent=2)

        with open(pending_metadata_path, 'r') as f:
            data = json.load(f)
            
        new_submission = {
            "id": str(uuid.uuid4()),
            "image_name": unique_filename,
            "original_filename": file.filename,
            "category": "community_submission",
            "tags": [name],
            "prompt": description,
            "captions": [utility],
            "submitted_on": datetime.date.today().isoformat(),
            "status": "pending"
        }
        
        data['submissions'].append(new_submission)
        
        with open(pending_metadata_path, 'w') as f:
            json.dump(data, f, indent=2)
            
        return JSONResponse(content={"message": "Meme submitted for review", "submission": new_submission})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.get("/proxy-image")
async def proxy_image(url: str = Query(..., description="URL of the image to proxy")):
    try:
        # Validate URL (basic check)
        if not url.startswith("http"):
             return JSONResponse(content={"error": "Invalid URL"}, status_code=400)

        import requests
        from fastapi import Response
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        return Response(
            content=response.content, 
            media_type=response.headers.get("content-type", "image/jpeg")
        )
    except Exception as e:
        print(f"Proxy error: {e}")
        return JSONResponse(content={"error": str(e)}, status_code=500)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
