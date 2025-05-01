from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

from .base import Base

class Upload(Base):
    __tablename__ = "uploads"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    filename = Column(String, nullable=False)
    file_type = Column(String, nullable=False)
    file_size = Column(Integer, nullable=False)  # in bytes
    status = Column(String, nullable=False, default="processing")  # processing, complete, error
    error_message = Column(Text, nullable=True)
    uploaded_at = Column(DateTime, default=datetime.utcnow)
    processed_at = Column(DateTime, nullable=True)
    metadata = Column(JSON, nullable=True)  # Store additional metadata like mime type, encoding, etc.
    
    # Relationship with chunks
    chunks = relationship("Chunk", back_populates="upload", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Upload(id={self.id}, filename={self.filename}, status={self.status})>"

class Chunk(Base):
    __tablename__ = "chunks"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    upload_id = Column(String, ForeignKey("uploads.id", ondelete="CASCADE"), nullable=False)
    text = Column(Text, nullable=False)
    embedding = Column(Text, nullable=True)  # Store as JSON string
    token_count = Column(Integer, nullable=False)
    chunk_index = Column(Integer, nullable=False)  # Order in the document
    metadata = Column(JSON, nullable=True)  # Store additional metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship with upload
    upload = relationship("Upload", back_populates="chunks")

    def __repr__(self):
        return f"<Chunk(id={self.id}, upload_id={self.upload_id}, chunk_index={self.chunk_index})>"