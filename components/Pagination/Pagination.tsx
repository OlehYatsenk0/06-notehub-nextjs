'use client';

import css from './Pagination.module.css';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (p: number) => void;
  isFetching?: boolean;
}

export default function Pagination({ currentPage, totalPages, onPageChange, isFetching }: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className={css.pagination}>
      <button
        className={css.button}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1 || isFetching}
      >
        Prev
      </button>

      <span className={css.pageInfo}>
        Page {currentPage} of {totalPages}
      </span>

      <button
        className={css.button}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages || isFetching}
      >
        Next
      </button>
    </div>
  );
}