export type NoteTag = 'Important' | 'Todo' | 'Work' | 'Personal' | 'Other';

export interface Note {
  id: string;
  title: string;
  content?: string;
  tag: NoteTag; 
  createdAt: string;
  updatedAt: string;
}

export interface FetchNotesParams {
  page: number;
  search: string;
  perPage?: number;
}

export interface NotesListResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteDto {
  title: string;
  content?: string;
  tag: NoteTag;
}