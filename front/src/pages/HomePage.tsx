import { ProjectList } from '../components/ProjectList.tsx';
import { AddProjectForm } from '../components/AddProjectForm.tsx';
import { useEffect, useState } from 'react';
import styles from './HomePage.module.css';
import { useAuth } from '../auth/authContext.tsx';

const API_URL = 'http://localhost:8802/api';

interface Project {
  title: string;
  slug: string;
}

interface ProjectListResponse {
  data: Project[];
}
function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { username, logout } = useAuth();

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
    <div className={styles.homePage}>
      {username && (
        <div className={styles.loginInfo}>
          <div className={styles.nameText}>
            Logged in as: <span className={styles.name}>{username}</span>
          </div>
          <button className={styles.logoutButton} onClick={() => logout()}>
            Log out
          </button>
        </div>
      )}
      <ProjectList projects={projects} deleteProject={deleteProject} />
      <AddProjectForm onProjectAdded={onProjectAdded} />
    </div>
  );
}

export { HomePage };
export type { Project };
