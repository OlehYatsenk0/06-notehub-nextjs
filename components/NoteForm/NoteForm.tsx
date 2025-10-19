'use client';

import { useState } from 'react';
import { createNote } from '@/lib/api';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: ['Todo'], 
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      await createNote({
        title: formData.title.trim(),
        content: formData.content.trim(),
        tags: formData.tags, 
      });
      setSuccess(true);
      setFormData({ title: '', content: '', tags: ['Todo'] });
      onClose();
    } catch (err) {
      setError('Failed to create note. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h2 className={css.title}>Create a new note</h2>

      <label className={css.label}>
        Title:
        <input
          className={css.input}
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </label>

      <label className={css.label}>
        Content:
        <textarea
          className={css.textarea}
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
        />
      </label>

      <div className={css.buttons}>
        <button type="submit" className={css.submitBtn} disabled={loading}>
          {loading ? 'Saving...' : 'Save note'}
        </button>
        <button type="button" className={css.cancelBtn} onClick={onClose}>
          Cancel
        </button>
      </div>

      {error && <p className={css.error}>{error}</p>}
      {success && <p className={css.success}>Note successfully created!</p>}
    </form>
  );
}