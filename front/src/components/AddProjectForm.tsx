import { useState } from 'react';

const API_URL = 'http://localhost:8802/api';

function AddProjectForm() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(API_URL + '/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, slug }),
      });

      if (!res.ok) {
        throw new Error('Failed to add project');
      }

      setTitle('');
      setSlug('');
      alert('Project added successfully!');
    } catch (error) {
      console.error(error);
      alert('Error adding project');
    }
  };

  return (
    <>
      <h2>Add a new project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="project-title">Title: </label>
          <input
            id="project-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="project-slug">Slug: </label>
          <input
            id="project-slug"
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </>
  );
}

export { AddProjectForm };
