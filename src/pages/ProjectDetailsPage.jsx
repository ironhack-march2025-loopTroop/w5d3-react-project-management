import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, SimpleGrid } from "@mantine/core";

import { API_URL } from "../config/api";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import AddTask from "../components/AddTask";


function ProjectDetailsPage() {

    const [project, setProject] = useState(null);

    const { projectId } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        getProject();
    }, []);


    const getProject = () => {
        axios.get(`${API_URL}/projects/${projectId}?_embed=tasks`)
            .then(response => {
                setProject(response.data);
            })
            .catch((error) => console.log("Error getting project details from the API...", error));
    }

    const deleteProject = () => {
        axios.delete(`${API_URL}/projects/${projectId}`)
            .then(response => {
                navigate("/projects");
            })
            .catch((error) => console.log("Error deleting project...", error));
    }


    if (project === null) {
        return <Loader />
    }


    return (
        <div className="ProjectDetailsPage">

            {/* project details */}
            <h1>{project.title}</h1>
            <p>{project.description}</p>

            {/* form to create new tasks */}
            <AddTask projectId={projectId} callbackToRefresh={getProject} />

            {/* list of tasks */}
            <SimpleGrid cols={{base: 1, md: 3}} >
                {project.tasks.map((task) => {
                    return (
                        <div className="TaskCard card" key={task.id}>
                            <h3>{task.title}</h3>
                            <h4>Description:</h4>
                            <p>{task.description}</p>
                        </div>)
                })}
            </SimpleGrid>
            

            <div>
                <Link to="/projects">
                    <Button variant="filled" color="indigo">Back to projects</Button>
                </Link>

                <Button onClick={deleteProject} variant="outline" color="red">Delete</Button>

                <Link to={`/projects/edit/${project.id}`}>
                    <Button variant="outline" color="indigo">Edit</Button>
                </Link>

            </div>

        </div>
    );
}

export default ProjectDetailsPage;