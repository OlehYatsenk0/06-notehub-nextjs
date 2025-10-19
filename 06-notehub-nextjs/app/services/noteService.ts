import axios from "axios";
import type { Note, NoteTag } from "@/types/note";

const BASE_URL = "https://api.notehub.app/v1/notes";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (params: FetchNotesParams) => {
  const { data } = await instance.get("/", { params });
  return data;
};

export const fetchNoteById = async (id: number) => {
  const { data } = await instance.get(`/${id}`);
  return data as Note;
};

export interface CreateNoteDTO {
  title: string;
  content: string;
  tags: NoteTag[];
}

export const createNote = async (dto: CreateNoteDTO) => {
  const { data } = await instance.post("/", dto);
  return data as Note;
};