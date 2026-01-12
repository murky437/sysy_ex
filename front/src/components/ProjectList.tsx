import type { Project } from '../pages/HomePage.tsx';
import styles from './ProjectList.module.css';

interface Props {
  projects: Project[];
  deleteProject: (slug: string) => void;
}

function ProjectList({ projects, deleteProject }: Props) {
  return (
    <div className={styles.projectList}>
      <h2>Project list</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Slug</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {projects.length === 0 ? (
            <tr>
              <td colSpan={3} style={{ textAlign: 'center' }}>
                No projects to show. Add some below.
              </td>
            </tr>
          ) : (
            projects.map((p) => {
              return (
                <tr key={p.slug}>
                  <td>{p.title}</td>
                  <td>{p.slug}</td>
                  <td>
                    <button
                      className={styles.deleteButton}
                      onClick={() => deleteProject(p.slug)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export { ProjectList };
