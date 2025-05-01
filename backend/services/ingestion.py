import uuid
import numpy as np
from fastapi import UploadFile
from sqlalchemy.orm import Session
import os
from typing import List, Dict
import json
from datetime import datetime
import faiss
from sentence_transformers import SentenceTransformer
from transformers import AutoTokenizer

from models.models import Upload, Chunk
from config import (
    CHUNK_SIZE,
    CHUNK_OVERLAP,
    RAW_DATA_DIR,
    CHUNKS_DIR,
    VECTOR_INDEX_PATH,
    EMBEDDING_MODEL
)

# Initialize embedding model and tokenizer
embedder = SentenceTransformer(EMBEDDING_MODEL)
tokenizer = AutoTokenizer.from_pretrained(EMBEDDING_MODEL)

async def process_file(file: UploadFile, db: Session, index: faiss.Index) -> Dict:
    """
    Process an uploaded file:
    1. Save the raw file
    2. Extract text content
    3. Split into chunks
    4. Generate embeddings
    5. Store in vector database
    """
    try:
        # Generate unique ID for the file
        file_id = str(uuid.uuid4())
        
        # Create upload record
        upload = Upload(
            id=file_id,
            filename=file.filename,
            file_type=file.content_type,
            file_size=0,  # Will be updated after reading file
            status="processing",
            uploaded_at=datetime.utcnow(),
            metadata={
                "original_filename": file.filename,
                "content_type": file.content_type
            }
        )
        db.add(upload)
        db.commit()
        
        try:
            # Create directories if they don't exist
            os.makedirs(RAW_DATA_DIR, exist_ok=True)
            os.makedirs(CHUNKS_DIR, exist_ok=True)
            
            # Save raw file
            file_path = os.path.join(RAW_DATA_DIR, f"{file_id}_{file.filename}")
            content = await file.read()
            file_size = len(content)
            
            with open(file_path, "wb") as f:
                f.write(content)
            
            # Update file size in database
            upload.file_size = file_size
            db.commit()
            
            # Extract text based on file type
            text = await extract_text(file_path, file.content_type)
            
            # Split into chunks
            chunks = chunk_text(text)
            
            # Process chunks
            chunk_records = []
            embeddings = []
            
            for i, chunk_text in enumerate(chunks):
                # Generate embedding
                embedding = embedder.encode(chunk_text)
                embeddings.append(embedding)
                
                # Create chunk record
                chunk = Chunk(
                    id=str(uuid.uuid4()),
                    upload_id=file_id,
                    text=chunk_text,
                    embedding=json.dumps(embedding.tolist()),
                    token_count=len(tokenizer.encode(chunk_text)),
                    chunk_index=i,
                    metadata={
                        "source": file.filename,
                        "chunk_number": i + 1,
                        "total_chunks": len(chunks),
                        "start_position": i * CHUNK_SIZE,
                        "end_position": min((i + 1) * CHUNK_SIZE, len(text))
                    }
                )
                chunk_records.append(chunk)
            
            # Batch add chunks to database
            db.bulk_save_objects(chunk_records)
            
            # Batch add embeddings to FAISS index
            embeddings_array = np.vstack(embeddings)
            index.add(embeddings_array)
            
            # Save FAISS index
            faiss.write_index(index, VECTOR_INDEX_PATH)
            
            # Update upload status
            upload.status = "complete"
            upload.processed_at = datetime.utcnow()
            upload.metadata.update({
                "total_chunks": len(chunks),
                "total_tokens": sum(chunk.token_count for chunk in chunk_records),
                "processing_time": (datetime.utcnow() - upload.uploaded_at).total_seconds()
            })
            db.commit()
            
            return {
                "id": file_id,
                "filename": file.filename,
                "status": "complete",
                "chunks": len(chunks),
                "total_tokens": upload.metadata["total_tokens"],
                "processing_time": upload.metadata["processing_time"]
            }
            
        except Exception as e:
            # Update upload status on error
            upload.status = "error"
            upload.error_message = str(e)
            db.commit()
            raise
            
    except Exception as e:
        raise Exception(f"Error processing file: {str(e)}")

async def extract_text(file_path: str, content_type: str) -> str:
    """Extract text content from file based on type"""
    try:
        if content_type == 'text/plain':
            with open(file_path, 'r', encoding='utf-8') as f:
                return f.read()
        elif content_type == 'application/pdf':
            import PyPDF2
            with open(file_path, 'rb') as f:
                reader = PyPDF2.PdfReader(f)
                return ' '.join(page.extract_text() for page in reader.pages)
        elif content_type in ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']:
            import docx
            doc = docx.Document(file_path)
            return ' '.join(paragraph.text for paragraph in doc.paragraphs)
        elif content_type == 'text/html':
            from bs4 import BeautifulSoup
            with open(file_path, 'r', encoding='utf-8') as f:
                soup = BeautifulSoup(f.read(), 'html.parser')
                return soup.get_text(separator=' ')
        else:
            raise ValueError(f"Unsupported content type: {content_type}")
    except Exception as e:
        raise Exception(f"Error extracting text: {str(e)}")

def chunk_text(text: str) -> List[str]:
    """Split text into chunks with overlap"""
    # Tokenize the text
    tokens = tokenizer.encode(text)
    chunks = []
    
    # Calculate chunk boundaries with overlap
    for i in range(0, len(tokens), CHUNK_SIZE - CHUNK_OVERLAP):
        # Get chunk tokens
        chunk_tokens = tokens[i:i + CHUNK_SIZE]
        
        # Decode tokens back to text
        chunk_text = tokenizer.decode(chunk_tokens, skip_special_tokens=True)
        
        # Clean up the chunk text
        chunk_text = chunk_text.strip()
        
        # Only add non-empty chunks
        if chunk_text:
            chunks.append(chunk_text)
    
    return chunks