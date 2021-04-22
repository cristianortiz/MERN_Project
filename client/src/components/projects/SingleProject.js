import React, { useContext } from "react";
import ProjectContext from "../../context/projects/projectContext";
const SingleProject = ({ project }) => {
  //get projectState props and functions through ProjectContext
  const projectContext = useContext(ProjectContext);
  const { activeProject } = projectContext;

  return (
    <li>
      <button
        onClick={() => activeProject(project.id)}
        type="button"
        className="btn btn-blank"
      >
        {project.proj_name}
      </button>
    </li>
  );
};

export default SingleProject;
