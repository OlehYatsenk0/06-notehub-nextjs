import axios from 'axios';
import { Note } from '@/types/note';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
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

export const fetchNoteById = async (id: number) => {
  const { data } = await instance.get(`/${id}`);
  return data as Note;
};

export const addNote = async (note: Omit<Note, 'id' | 'date'>) => {
  const { data } = await instance.post('/', note);
  return data as Note;
};

export const deleteNote = async (id: number) => {
  await instance.delete(`/${id}`);
  return id;
};