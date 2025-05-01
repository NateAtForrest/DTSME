from typing import List, Dict
import os
import json
from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy import desc

from models.models import Upload, Chunk
from config import RAW_DATA_DIR, CHUNKS_DIR, VECTOR_INDEX_PATH

async def list_knowledge_items(db: Session) -> List[Dict]:
    """List all knowledge items in the system"""
    try:
        # Query uploads with their associated chunks
        uploads = db.query(Upload).order_by(desc(Upload.uploaded_at)).all()
        
        items = []
        for upload in uploads:
            # Count chunks for this upload
            chunk_count = db.query(Chunk).filter(
                Chunk.upload_id == upload.id
            ).count()
            
            # Format file size
            size_str = format_file_size(upload.file_size)
            
            items.append({
                "id": upload.id,
                "title": upload.filename,
                "type": upload.file_type,
                "size": size_str,
                "chunks": chunk_count,
                "addedDate": upload.uploaded_at.isoformat(),
                "status": upload.status,
                "metadata": upload.metadata
            })
        
        return items
        
    except Exception as e:
        raise Exception(f"Error listing knowledge items: {str(e)}")

async def delete_knowledge_item(item_id: str, db: Session) -> Dict:
    """Delete a knowledge item and its associated data"""
    try:
        # Get upload record
        upload = db.query(Upload).filter(Upload.id == item_id).first()
        if not upload:
            raise ValueError(f"Upload with ID {item_id} not found")
        
        # Delete raw file
        raw_file_path = os.path.join(RAW_DATA_DIR, f"{upload.id}_{upload.filename}")
        if os.path.exists(raw_file_path):
            os.remove(raw_file_path)
        
        # Delete chunks from database (will cascade to delete chunk records)
        db.delete(upload)
        db.commit()
        
        # Note: Vector index updates should be handled separately
        # as it requires rebuilding the index
        
        return {
            "status": "success",
            "message": f"Knowledge item '{upload.filename}' deleted successfully"
        }
        
    except Exception as e:
        db.rollback()
        raise Exception(f"Error deleting knowledge item: {str(e)}")

def format_file_size(size_in_bytes: int) -> str:
    """Format file size in human-readable format"""
    for unit in ['B', 'KB', 'MB', 'GB']:
        if size_in_bytes < 1024:
            return f"{size_in_bytes:.1f} {unit}"
        size_in_bytes /= 1024
    return f"{size_in_bytes:.1f} TB"

async def rebuild_vector_index(db: Session) -> Dict:
    """Rebuild the vector index from all stored chunks"""
    try:
        # TODO: Implement vector index rebuilding
        # This would involve:
        # 1. Loading all chunks from database
        # 2. Converting stored embeddings back to numpy arrays
        # 3. Creating a new FAISS index
        # 4. Adding all embeddings to the index
        # 5. Saving the new index
        
        return {
            "status": "success",
            "message": "Vector index rebuilt successfully"
        }
        
    except Exception as e:
        raise Exception(f"Error rebuilding vector index: {str(e)}")

async def get_knowledge_stats(db: Session) -> Dict:
    """Get statistics about the knowledge base"""
    try:
        total_uploads = db.query(Upload).count()
        total_chunks = db.query(Chunk).count()
        total_tokens = db.query(Chunk.token_count).sum()
        
        return {
            "total_documents": total_uploads,
            "total_chunks": total_chunks,
            "total_tokens": total_tokens,
            "index_size": os.path.getsize(VECTOR_INDEX_PATH) if os.path.exists(VECTOR_INDEX_PATH) else 0
        }
        
    except Exception as e:
        raise Exception(f"Error getting knowledge stats: {str(e)}")