import axios from 'axios';
import type { Note, NoteTag } from '@/types/note';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://notehub-public.goit.study/api';
const token =
  process.env.NEXT_PUBLIC_NOTEHUB_TOKEN ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlhdHNlbmtvLnByb2dAZ21haWwuY29tIiwiaWF0IjoxNzYwMTk5NTg4fQ.pjtHCgXnXkg5wxaZPVZ_QygQzrF-4ZVGi7MaAe6Wn08';

export const instance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api', // 🔥 завжди явно
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

export interface FetchNotesParams {
  page: number;
  search: string;
}
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (params: FetchNotesParams): Promise<FetchNotesResponse> => {
  const { data } = await instance.get('/notes', { params });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await instance.get(`/notes/${id}`);
  return data;
};

export interface CreateNoteDTO {
  title: string;
  content: string;
  tags: NoteTag[];
}
export const createNote = async (dto: CreateNoteDTO): Promise<Note> => {
  const { data } = await instance.post('/notes', dto);
  return data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await instance.delete(`/notes/${id}`);
};