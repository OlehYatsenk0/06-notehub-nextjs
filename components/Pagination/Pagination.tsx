'use client';

import css from './Pagination.module.css';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isFetching?: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isFetching,
}: Props) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className={css.pagination}>
      
      <li
        className={`${currentPage === 1 ? css.disabled : ''}`}
        onClick={() => currentPage > 1 && !isFetching && onPageChange(currentPage - 1)}
      >
        <a>Prev</a>
      </li>

      
      {pages.map((p) => (
        <li
          key={p}
          className={p === currentPage ? css.active : undefined}
          onClick={() => !isFetching && onPageChange(p)}
        >
          <a>{p}</a>
        </li>
      ))}

      
      <li
        className={`${currentPage === totalPages ? css.disabled : ''}`}
        onClick={() =>
          currentPage < totalPages && !isFetching && onPageChange(currentPage + 1)
        }
      >
        <a>Next</a>
      </li>
    </ul>
  );
}