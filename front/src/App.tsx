import { ProjectList } from './components/ProjectList.tsx';
import { AddProjectForm } from './components/AddProjectForm.tsx';
import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:8802/api';

interface Project {
  title: string;
  slug: string;
}

interface ProjectListResponse {
  data: Project[];
}
function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(API_URL + '/projects', {
          headers: {
            Accept: 'application/json',
          },
        });
        if (!res.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data: ProjectListResponse = await res.json();
        setProjects(data.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown error');
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchProjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const onProjectAdded = (project: Project) => {
    setProjects((prev) => [...prev, project]);
  };

  const deleteProject = async (slug: string) => {
    try {
      const res = await fetch(API_URL + '/projects/' + slug, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
        },
      });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.slug !== slug));
      }
    } catch (err: unknown) {
      console.log(err);
    }
    setProjects((prev) => prev.filter((p) => p.slug !== slug));
  };

  return (
    <>
      <ProjectList projects={projects} deleteProject={deleteProject} />
      <AddProjectForm onProjectAdded={onProjectAdded} />
    </>
  );
}

export { App };
export type { Project };
