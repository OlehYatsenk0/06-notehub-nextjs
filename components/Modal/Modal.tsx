'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

export default function Modal({
  trigger,
  children,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onEsc);
    } else {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onEsc);
    }
    return () => window.removeEventListener('keydown', onEsc);
  }, [open]);

  return (
    <>
      <span onClick={() => setOpen(true)}>{trigger}</span>
      {open &&
        createPortal(
          <div className={css.backdrop} onClick={() => setOpen(false)}>
            <div className={css.modal} onClick={(e) => e.stopPropagation()}>
              <button className={css.closeBtn} onClick={() => setOpen(false)}>
                ✕
              </button>
              {children}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}