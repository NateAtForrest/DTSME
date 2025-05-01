import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Database Configuration
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/sme_chat")
VECTOR_INDEX_PATH = os.getenv("VECTOR_INDEX_PATH", "./backend/models/faiss.index")
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "sentence-transformers/all-MiniLM-L6-v2")

# Model Configuration
CHAT_MODEL = "gpt-4-mini"
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# File Processing Configuration
CHUNK_SIZE = 1000
CHUNK_OVERLAP = 200
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

# Vector Search Configuration
TOP_K_RESULTS = 5
SIMILARITY_THRESHOLD = 0.75

# Storage Configuration
RAW_DATA_DIR = "data/raw"
CHUNKS_DIR = "data/chunks"
EMBEDDINGS_FILE = "models/embeddings.pkl"

# SME Persona Configuration
SME_PERSONAS = {
    "product_expert": {
        "name": "Sarah Chen",
        "role": "Product Expert",
        "expertise": ["Product Features", "Technical Specifications", "Integration Guidelines"],
        "tone": "technical and precise",
        "style": "detailed and informative"
    },
    "sales_specialist": {
        "name": "Marcus Johnson",
        "role": "Sales Specialist",
        "expertise": ["Enterprise Sales", "Pricing", "Contract Negotiation"],
        "tone": "persuasive and confident",
        "style": "engaging and solution-focused"
    }
}