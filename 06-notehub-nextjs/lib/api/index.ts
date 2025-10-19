import axios from 'axios';
import type { Note, CreateNoteDTO } from '@/types/note';
import { addNote } from '@/lib/api';

const BASE_URL = 'https://api.notehub.app/v1/notes';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

export const fetchNotes = async (params?: {
  page?: number;
  perPage?: number;
  search?: string;
}) => {
  const { page = 1, perPage = 12, search = '' } = params || {};

  const { data } = await instance.get('/', {
    params: { page, perPage, search },
  });

  return data; 
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const { data } = await instance.get(`/${id}`);
  return data;
};

export const createNote = async (note: CreateNoteDTO): Promise<Note> => {
  const { data } = await instance.post('/', note);
  return data;
};

export const deleteNote = async (id: number): Promise<number> => {
  await instance.delete(`/${id}`);
  return id;
};

export const addNote = async (note: Omit<Note, 'id' | 'date'>) => {
  const { data } = await instance.post('/', note);
  return data as Note;
};