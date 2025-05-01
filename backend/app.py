from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Dict
import json

from models import get_db, init_db
from services.ingestion import process_file
from services.retrieval import get_relevant_contexts
from services.chat import generate_response
from services.knowledge import list_knowledge_items, delete_knowledge_item

app = FastAPI()

# Initialize database
init_db()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "API is running"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        result = await process_file(file, db)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/contexts")
async def get_contexts(query: str):
    try:
        contexts = await get_relevant_contexts(query)
        return contexts
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat")
async def chat(request: Dict):
    try:
        messages = request.get("messages", [])
        contexts = request.get("contexts", [])
        response = await generate_response(messages, contexts)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/knowledge")
async def get_knowledge():
    try:
        items = await list_knowledge_items()
        return items
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/knowledge/{item_id}")
async def delete_knowledge(item_id: str):
    try:
        result = await delete_knowledge_item(item_id)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))