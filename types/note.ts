export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Study';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  tag: NoteTag; 
}