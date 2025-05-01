from typing import List, Dict
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer
from sqlalchemy.orm import Session
from sqlalchemy import desc

from models.models import Chunk
from config import (
    TOP_K_RESULTS,
    SIMILARITY_THRESHOLD,
    EMBEDDING_MODEL,
    VECTOR_INDEX_PATH
)

# Initialize embedding model
embedder = SentenceTransformer(EMBEDDING_MODEL)

async def get_relevant_contexts(query: str, db: Session) -> List[Dict]:
    """
    Retrieve relevant context for a given query:
    1. Generate query embedding
    2. Perform vector similarity search
    3. Return top matching chunks
    """
    try:
        # Generate query embedding
        query_embedding = embedder.encode(query)
        
        # Load FAISS index
        index = faiss.read_index(VECTOR_INDEX_PATH)
        
        # Perform similarity search
        D, I = index.search(np.array([query_embedding]), TOP_K_RESULTS)
        
        # Get chunk IDs from database ordered by relevance
        chunks = []
        for i, (distance, idx) in enumerate(zip(D[0], I[0])):
            # Convert distance to similarity score (1 - normalized distance)
            similarity = 1 - (distance / 2)  # Assuming normalized distance
            
            if similarity >= SIMILARITY_THRESHOLD:
                # Get chunk from database
                chunk = db.query(Chunk).filter(
                    Chunk.id == str(idx)
                ).first()
                
                if chunk:
                    chunks.append({
                        "id": chunk.id,
                        "content": chunk.text,
                        "relevance": float(similarity),
                        "metadata": chunk.metadata
                    })
        
        # Sort by relevance
        chunks.sort(key=lambda x: x["relevance"], reverse=True)
        
        return chunks
        
    except Exception as e:
        raise Exception(f"Error retrieving contexts: {str(e)}")

def rerank_results(chunks: List[Dict], query: str) -> List[Dict]:
    """
    Rerank results using a more sophisticated scoring method
    This could include:
    - Cross-encoder reranking
    - Keyword matching
    - Document structure awareness
    """
    # TODO: Implement more sophisticated reranking
    return chunks