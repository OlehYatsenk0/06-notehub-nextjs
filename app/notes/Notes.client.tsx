'use client';

import { useMemo, useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
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

  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h1 className={css.title}>Notes</h1>
        <Modal trigger={<button className={css.createButton}>Create note</button>}>
          <NoteForm />
        </Modal>
      </div>

      <SearchBox onSearch={(v) => { setSearch(v); setPage(1); }} />

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Error: {(error as Error).message}</p>}
      {data && <NoteList notes={data.notes} />}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        isFetching={isFetching}
      />
    </div>
  );
}