'use client';

import { useState } from 'react';
import css from './Modal.module.css';

interface ModalProps {
  trigger: React.ReactElement;
  children: React.ReactNode;
}

export default function Modal({ trigger, children }: ModalProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {React.cloneElement(trigger, { onClick: handleOpen })}
      {open && (
        <div className={css.backdrop} onClick={handleClose}>
          <div className={css.modal} onClick={(e) => e.stopPropagation()}>
            <button className={css.close} onClick={handleClose}>
              ✕
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
}