export type NoteTag = 'Important' | 'Todo' | 'Work' | 'Personal' | 'Other';

export interface Note {
  id: number;
  title: string;
  content: string;
  tags: NoteTag[];
  createdAt: string;
}