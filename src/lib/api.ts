import { UploadedFile } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const uploadFile = async (file: File): Promise<UploadedFile> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload file');
  }

  return response.json();
};

export const getContexts = async (query: string) => {
  const response = await fetch(`${API_BASE_URL}/contexts?query=${encodeURIComponent(query)}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch contexts');
  }

  return response.json();
};

export const getChatResponse = async (messages: any[], contexts: string[]) => {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages, contexts }),
  });

  if (!response.ok) {
    throw new Error('Failed to get chat response');
  }

  return response.json();
};

export const listKnowledgeItems = async () => {
  const response = await fetch(`${API_BASE_URL}/knowledge`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch knowledge items');
  }

  return response.json();
};

export const deleteKnowledgeItem = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/knowledge/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete knowledge item');
  }

  return response.json();
};