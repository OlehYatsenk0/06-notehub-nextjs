'use client';

import React, { useState, ReactElement } from 'react';
import css from './Modal.module.css';

interface ModalProps {
  trigger: ReactElement<{ onClick?: () => void }>;
  children: React.ReactNode;
}

export default function Modal({ trigger, children }: ModalProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

 
  const triggerWithHandler = React.cloneElement(trigger, {
    onClick: handleOpen,
  });

  return (
    <>
      {triggerWithHandler}

      {open && (
        <div className={css.backdrop} onClick={handleClose}>
          <div
            className={css.modal}
            onClick={(e) => e.stopPropagation()}
          >
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