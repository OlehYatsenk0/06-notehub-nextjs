'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createNote } from '@/lib/api';
import css from './NoteForm.module.css';

const Schema = Yup.object({
  title: Yup.string().required('Title is required'),
  content: Yup.string().required('Content is required'),
});

export default function NoteForm() {
  return (
    <Formik
      initialValues={{ title: '', content: '' }}
      validationSchema={Schema}
      onSubmit={async (values, { resetForm }) => {
        await createNote({ title: values.title, content: values.content, tags: [] });
        resetForm();
        
        window.location.reload();
      }}
    >
      <Form className={css.form}>
        <label className={css.label}>
          Title
          <Field name="title" className={css.input} />
          <ErrorMessage name="title" component="div" className={css.error} />
        </label>

        <label className={css.label}>
          Content
          <Field as="textarea" name="content" className={css.textarea} />
          <ErrorMessage name="content" component="div" className={css.error} />
        </label>

        <button type="submit" className={css.button}>
          Create Note
        </button>
      </Form>
    </Formik>
  );
}