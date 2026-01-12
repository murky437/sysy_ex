import * as React from 'react';
import { useState } from 'react';
import type { Project } from '../pages/HomePage.tsx';
import styles from './AddProjectForm.module.css';

const API_URL = 'http://localhost:8802/api';

interface Props {
  onProjectAdded: (project: Project) => void;
}

interface CreateProjectResponse {
  data: Project;
}

interface ValidationErrorResponse {
  message: string;
  errors: { [field: string]: string[] };
}

function AddProjectForm({ onProjectAdded }: Props) {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [errorResponse, setErrorResponse] =
    useState<ValidationErrorResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(API_URL + '/projects', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, slug }),
      });

      if (!res.ok) {
        if (res.status == 422) {
          const data: ValidationErrorResponse = await res.json();
          setErrorResponse(data);
          return;
        }
        throw new Error('Failed to add project');
      }

      setErrorResponse(null);
      const data: CreateProjectResponse = await res.json();
      onProjectAdded(data.data);

      setTitle('');
      setSlug('');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.addProjectForm}>
      <h2>Add a new project</h2>
      <form onSubmit={handleSubmit}>
        {errorResponse && (
          <div className={styles.generalError}>{errorResponse.message}</div>
        )}
        <div className={styles.formRow}>
          <label htmlFor="project-title">Title</label>
          <input
            id="project-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus={true}
          />
          {errorResponse?.errors.title &&
            errorResponse.errors.title.map((msg, i) => (
              <div className={styles.fieldError} key={i}>
                {msg}
              </div>
            ))}
        </div>
        <div className={styles.formRow}>
          <label htmlFor="project-slug">Slug</label>
          <input
            id="project-slug"
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
          {errorResponse?.errors.slug &&
            errorResponse.errors.slug.map((msg, i) => (
              <div className={styles.fieldError} key={i}>
                {msg}
              </div>
            ))}
        </div>
        <div className={styles.formRow}>
          <button className={styles.addButton} type="submit" disabled={loading}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export { AddProjectForm };
