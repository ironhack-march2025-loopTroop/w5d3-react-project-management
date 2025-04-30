import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { API_URL } from "../config/api"

import Loader from "../components/Loader"


function ProjectListPage() {

    const [projects, setProjects] = useState(null);

    useEffect(() => {
        axios.get(`${API_URL}/projects`)
            .then((response) => {
                const projectsArr = response.data.toReversed(); // get the list of projects in reverse order (latest first)
                setProjects(projectsArr)
            })
            .catch(e => console.log("Error getting projects from the API...", e));
    }, [])

    if (projects === null) {
        return <Loader />
    }

    return (
        <div>
            <h1>Number of projects: {projects.length}</h1>

            {projects.map((projectObj) => {
                return (
                    <Link to={`/projects/${projectObj.id}`} key={projectObj.id}>
                        <div className="card">
                            <h3>{projectObj.title}</h3>
                        </div>
                    </Link>
                )
            })}
        </div>
    );
}

export default ProjectListPage;