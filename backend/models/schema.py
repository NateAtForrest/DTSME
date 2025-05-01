"""
Database schema for the Synthetic SME Platform.

This module defines the SQLAlchemy models for:
- Knowledge base items and their metadata
- Text chunks and embeddings
- Conversation history
- User feedback and analytics
"""

from sqlalchemy import (
    Column, String, Integer, Float, DateTime, ForeignKey, 
    Text, JSON, Boolean, Enum, UniqueConstraint
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from datetime import datetime
import uuid
import enum

from .base import Base

class ContentType(enum.Enum):
    """Enumeration of supported content types"""
    PDF = "application/pdf"
    DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    TXT = "text/plain"
    HTML = "text/html"
    MD = "text/markdown"

class ProcessingStatus(enum.Enum):
    """Enumeration of processing statuses"""
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETE = "complete"
    ERROR = "error"

class KnowledgeSource(Base):
    """
    Represents a source document in the knowledge base.
    This could be a PDF, Word document, text file, etc.
    """
    __tablename__ = "knowledge_sources"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    content_type = Column(Enum(ContentType), nullable=False)
    file_size = Column(Integer, nullable=False)  # in bytes
    file_hash = Column(String, nullable=False, unique=True)  # SHA-256 hash
    original_filename = Column(String, nullable=False)
    storage_path = Column(String, nullable=False)
    
    # Processing metadata
    status = Column(Enum(ProcessingStatus), nullable=False, default=ProcessingStatus.PENDING)
    processing_started_at = Column(DateTime, nullable=True)
    processing_completed_at = Column(DateTime, nullable=True)
    error_message = Column(Text, nullable=True)
    
    # Document metadata
    metadata = Column(JSON, nullable=True)  # Store additional metadata like author, creation date, etc.
    tags = Column(JSON, nullable=True)  # Array of tags
    
    # Timestamps
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    
    # Relationships
    chunks = relationship("TextChunk", back_populates="source", cascade="all, delete-orphan")
    analytics = relationship("SourceAnalytics", back_populates="source", uselist=False, cascade="all, delete-orphan")

    def __repr__(self):
        return f"<KnowledgeSource(id={self.id}, title={self.title}, status={self.status})>"

class TextChunk(Base):
    """
    Represents a chunk of text extracted from a knowledge source.
    Each chunk has its own embedding for semantic search.
    """
    __tablename__ = "text_chunks"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    source_id = Column(String, ForeignKey("knowledge_sources.id", ondelete="CASCADE"), nullable=False)
    content = Column(Text, nullable=False)
    embedding = Column(JSON, nullable=True)  # Vector embedding as JSON array
    
    # Chunk metadata
    chunk_index = Column(Integer, nullable=False)  # Position in the document
    start_char = Column(Integer, nullable=False)  # Start character position
    end_char = Column(Integer, nullable=False)    # End character position
    token_count = Column(Integer, nullable=False)
    metadata = Column(JSON, nullable=True)  # Additional chunk-specific metadata
    
    # Timestamps
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    
    # Relationships
    source = relationship("KnowledgeSource", back_populates="chunks")
    usage_analytics = relationship("ChunkUsageAnalytics", back_populates="chunk", cascade="all, delete-orphan")

    __table_args__ = (
        UniqueConstraint('source_id', 'chunk_index', name='uix_chunk_source_index'),
    )

    def __repr__(self):
        return f"<TextChunk(id={self.id}, source_id={self.source_id}, chunk_index={self.chunk_index})>"

class Conversation(Base):
    """
    Represents a conversation session with the AI.
    Tracks the entire conversation history and metadata.
    """
    __tablename__ = "conversations"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    session_id = Column(String, nullable=False, unique=True)
    user_id = Column(String, nullable=True)  # Optional user identification
    
    # Conversation metadata
    title = Column(String, nullable=True)
    summary = Column(Text, nullable=True)
    persona = Column(String, nullable=True)  # SME persona used
    tags = Column(JSON, nullable=True)
    
    # Analytics
    message_count = Column(Integer, default=0)
    total_tokens = Column(Integer, default=0)
    average_response_time = Column(Float, nullable=True)
    
    # Timestamps
    started_at = Column(DateTime, server_default=func.now())
    ended_at = Column(DateTime, nullable=True)
    
    # Relationships
    messages = relationship("Message", back_populates="conversation", cascade="all, delete-orphan")
    feedback = relationship("ConversationFeedback", back_populates="conversation", uselist=False, cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Conversation(id={self.id}, session_id={self.session_id})>"

class Message(Base):
    """
    Represents a single message in a conversation.
    Can be from either the user or the AI.
    """
    __tablename__ = "messages"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    conversation_id = Column(String, ForeignKey("conversations.id", ondelete="CASCADE"), nullable=False)
    role = Column(String, nullable=False)  # 'user' or 'assistant'
    content = Column(Text, nullable=False)
    
    # Message metadata
    token_count = Column(Integer, nullable=False)
    processed_at = Column(DateTime, nullable=True)  # When the message was processed
    response_time = Column(Float, nullable=True)  # Processing time in seconds
    
    # Context tracking
    used_chunks = Column(JSON, nullable=True)  # IDs of text chunks used
    confidence_score = Column(Float, nullable=True)
    metadata = Column(JSON, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime, server_default=func.now())
    
    # Relationships
    conversation = relationship("Conversation", back_populates="messages")
    feedback = relationship("MessageFeedback", back_populates="message", uselist=False, cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Message(id={self.id}, role={self.role})>"

class SourceAnalytics(Base):
    """
    Analytics for knowledge sources.
    Tracks usage patterns and effectiveness.
    """
    __tablename__ = "source_analytics"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    source_id = Column(String, ForeignKey("knowledge_sources.id", ondelete="CASCADE"), nullable=False, unique=True)
    
    # Usage statistics
    total_uses = Column(Integer, default=0)
    last_used_at = Column(DateTime, nullable=True)
    average_relevance = Column(Float, default=0.0)
    
    # Quality metrics
    coverage_score = Column(Float, nullable=True)
    quality_score = Column(Float, nullable=True)
    
    # Update tracking
    last_analyzed_at = Column(DateTime, nullable=True)
    
    # Relationships
    source = relationship("KnowledgeSource", back_populates="analytics")

    def __repr__(self):
        return f"<SourceAnalytics(source_id={self.source_id})>"

class ChunkUsageAnalytics(Base):
    """
    Analytics for individual text chunks.
    Tracks how often and effectively each chunk is used.
    """
    __tablename__ = "chunk_usage_analytics"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    chunk_id = Column(String, ForeignKey("text_chunks.id", ondelete="CASCADE"), nullable=False, unique=True)
    
    # Usage statistics
    total_uses = Column(Integer, default=0)
    last_used_at = Column(DateTime, nullable=True)
    average_relevance = Column(Float, default=0.0)
    
    # Effectiveness metrics
    helpful_count = Column(Integer, default=0)
    unhelpful_count = Column(Integer, default=0)
    
    # Relationships
    chunk = relationship("TextChunk", back_populates="usage_analytics")

    def __repr__(self):
        return f"<ChunkUsageAnalytics(chunk_id={self.chunk_id})>"

class ConversationFeedback(Base):
    """
    Overall feedback for a conversation session.
    """
    __tablename__ = "conversation_feedback"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    conversation_id = Column(String, ForeignKey("conversations.id", ondelete="CASCADE"), nullable=False, unique=True)
    
    # Feedback metrics
    helpfulness_rating = Column(Integer, nullable=True)  # 1-5 scale
    accuracy_rating = Column(Integer, nullable=True)    # 1-5 scale
    satisfaction_rating = Column(Integer, nullable=True) # 1-5 scale
    
    # Detailed feedback
    comments = Column(Text, nullable=True)
    improvement_suggestions = Column(Text, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime, server_default=func.now())
    
    # Relationships
    conversation = relationship("Conversation", back_populates="feedback")

    def __repr__(self):
        return f"<ConversationFeedback(conversation_id={self.conversation_id})>"

class MessageFeedback(Base):
    """
    Feedback for individual messages.
    """
    __tablename__ = "message_feedback"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    message_id = Column(String, ForeignKey("messages.id", ondelete="CASCADE"), nullable=False, unique=True)
    
    # Feedback flags
    is_helpful = Column(Boolean, nullable=True)
    is_accurate = Column(Boolean, nullable=True)
    needs_improvement = Column(Boolean, nullable=True)
    
    # Detailed feedback
    feedback_text = Column(Text, nullable=True)
    category = Column(String, nullable=True)  # Category of the issue if any
    
    # Timestamps
    created_at = Column(DateTime, server_default=func.now())
    
    # Relationships
    message = relationship("Message", back_populates="feedback")

    def __repr__(self):
        return f"<MessageFeedback(message_id={self.message_id})>"