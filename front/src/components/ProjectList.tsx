import type { Project } from '../App.tsx';

interface Props {
  projects: Project[];
}

function ProjectList({ projects }: Props) {
  return (
    <>
      <h2>Project list</h2>
      <ul>
        {projects.map((p) => {
          return (
            <li key={p.slug}>
              {p.title} ({p.slug})
            </li>
          );
        })}
      </ul>
    </>
  );
}

export { ProjectList };
