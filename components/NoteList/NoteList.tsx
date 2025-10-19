'use client';

import Link from 'next/link';
import type { Note } from '@/types/note';
import css from './NoteList.module.css';

export default function NoteList({ notes }: { notes: Note[] }) {
  if (!notes.length) {
    return <p className={css.empty}>No notes found.</p>;
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item}>
          <div className={css.cardHeader}>
            <h3 className={css.title}>{note.title}</h3>
          </div>
          <p className={css.content}>{note.content}</p>
          <div className={css.cardFooter}>
            <Link href={`/notes/${note.id}`} className={css.link}>
              View details
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}