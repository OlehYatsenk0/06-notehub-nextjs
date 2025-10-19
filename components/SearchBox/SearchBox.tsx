'use client';

import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import css from './SearchBox.module.css';

export default function SearchBox({ onSearch }: { onSearch: (v: string) => void }) {
  const [value, setValue] = useState('');
  const [debounced] = useDebounce(value, 500);

  useEffect(() => {
    onSearch(debounced);
  }, [debounced, onSearch]);

  return (
    <div className={css.searchBox}>
      <input
        type="text"
        className={css.input}
        placeholder="Search notes..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}