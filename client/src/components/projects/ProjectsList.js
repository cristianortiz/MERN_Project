import React, { useContext, useEffect } from "react";
import ProjectContext from "../../context/projects/projectContext";
import SingleProject from "./SingleProject";

const ProjectsList = () => {
  //use projectContext to acces projectState 'projects' prop initial state
  const projects_context = useContext(ProjectContext);
  //destructuring project_context to get projects array from projectState
  const { projects, getProjects } = projects_context;

  //get projects when ProjectsList comp is loaded trough a useEffect
  useEffect(() => {
    getProjects();
  }, []);

  //check if projects array is not empty
  if (projects.length === 0) return <p>Create a New Project</p>;

  return (
    <ul className="list-projects">
      {projects.map((project) => (
        <SingleProject key={project.id} project={project} />
      ))}
    </ul>
  );
};

export default ProjectsList;
