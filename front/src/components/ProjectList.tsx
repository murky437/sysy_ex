import {useEffect, useState} from "react";

const API_URL = 'http://localhost:8802/api'

interface Project {
    title: string;
    slug: string;
}

interface ApiResponse {
    data: Project[];
}

function ProjectList() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch(API_URL + '/projects');
                if (!res.ok) {
                    throw new Error('Failed to fetch projects');
                }
                const data: ApiResponse = await res.json();
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

    return (
        <ul>
            {projects.map((p) => {
                return <li key={p.slug}>{p.title} ({p.slug})</li>;
            })}
        </ul>
    )
}

export { ProjectList }
