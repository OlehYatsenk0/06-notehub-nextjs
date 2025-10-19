'use client';

import css from './Pagination.module.css';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  disabled?: boolean;
}

export default function Pagination({
  page,
  totalPages,
  onChange,
  disabled = false,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (page > 1) onChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onChange(page + 1);
  };

  return (
    <div className={css.pagination}>
      <button
        className={css.button}
        onClick={handlePrev}
        disabled={page === 1 || disabled}
      >
        Prev
      </button>

      <span className={css.page}>
        Page {page} of {totalPages}
      </span>

      <button
        className={css.button}
        onClick={handleNext}
        disabled={page === totalPages || disabled}
      >
        Next
      </button>
    </div>
  );
}