import type { Project } from '../App.tsx';
import styles from './ProjectList.module.css';

interface Props {
  projects: Project[];
}

function ProjectList({ projects }: Props) {
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
          {projects.map((p) => {
            return (
              <tr key={p.slug}>
                <td>{p.title}</td>
                <td>{p.slug}</td>
                <td>
                  <button className={styles.deleteButton}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export { ProjectList };
