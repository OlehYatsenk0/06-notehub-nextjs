'use client';

import { useState, useMemo } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import { SearchBox } from '@/components/SearchBox/SearchBox';
import { Modal } from '@/components/Modal/Modal';
import { NoteForm } from '@/components/NoteForm/NoteForm';
import css from './NotesPage.module.css';

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const queryKey = useMemo(() => ['notes', { page, search }], [page, search]);

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey,
    queryFn: () => fetchNotes({ page, search }),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h1 className={css.title}>Notes</h1>
        <Modal trigger={<button className={css.createButton}>Create note</button>}>
          <NoteForm onClose={() => {}} />
        </Modal>
      </div>

      <SearchBox value={search} onChange={setSearch} />

      {isLoading && <p className={css.status}>Loading, please wait...</p>}
      {isError && (
        <p className={css.status}>Could not fetch the list of notes. {(error as Error)?.message}</p>
      )}

      {data && data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        !isLoading && <p className={css.status}>No notes found.</p>
      )}

      <Pagination page={page} totalPages={totalPages} onChange={setPage} disabled={isFetching} />

      {isFetching && !isLoading && <p className={css.status}>Updating…</p>}
    </div>
  );
}