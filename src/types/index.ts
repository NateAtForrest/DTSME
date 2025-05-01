export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface Expert {
  id: number;
  name: string;
  role: string;
  image: string;
  expertise: string[];
  languages: string[];
  experience: string;
}

export interface UploadedFile {
  id: string;
  filename: string;
  status: 'uploading' | 'processing' | 'complete' | 'error';
  progress?: number;
  error?: string;
}

export interface ContextSource {
  id: string;
  title: string;
  relevance: number;
  content: string;
}

export interface KnowledgeItem {
  id: string;
  title: string;
  type: string;
  size: string;
  chunks: number;
  addedDate: string;
  status: 'processing' | 'complete' | 'error';
}