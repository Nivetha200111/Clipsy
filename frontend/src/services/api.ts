import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface FormatRequest {
  content: string;
  preserve_formatting?: boolean;
}

export interface FormatResponse {
  formatted_content: string;
  character_count: number;
  warnings: string[];
}

export interface ValidateRequest {
  content: string;
}

export interface ValidateResponse {
  is_valid: boolean;
  warnings: string[];
  suggestions: string[];
}

export interface Template {
  id: string;
  name: string;
  content: string;
  category: string;
  description?: string;
}

export const formatContent = async (request: FormatRequest): Promise<FormatResponse> => {
  const response = await api.post<FormatResponse>('/api/format', request);
  return response.data;
};

export const validateContent = async (request: ValidateRequest): Promise<ValidateResponse> => {
  const response = await api.post<ValidateResponse>('/api/validate', request);
  return response.data;
};

export const getTemplates = async (category?: string): Promise<Template[]> => {
  const params = category ? { category } : {};
  const response = await api.get<Template[]>('/api/templates', { params });
  return response.data;
};

export const createTemplate = async (template: Omit<Template, 'id'>): Promise<Template> => {
  const response = await api.post<Template>('/api/templates', template);
  return response.data;
};

export const getTemplate = async (id: string): Promise<Template> => {
  const response = await api.get<Template>(`/api/templates/${id}`);
  return response.data;
};
