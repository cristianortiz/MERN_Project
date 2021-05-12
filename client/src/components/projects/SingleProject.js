import React, { useContext } from "react";
import ProjectContext from "../../context/projects/projectContext";
import TaskContext from "../../context/tasks/taskContext";
const SingleProject = ({ project }) => {
  //get projectState props and functions through ProjectContext
  const projectContext = useContext(ProjectContext);
  const { activeProject } = projectContext;

  //get TaskState props and functions through TaskContext
  const taskContext = useContext(TaskContext);
  const { getTasks } = taskContext;

  //function to set a project as active and get their tasks
  const getActiveProject = (id) => {
    activeProject(id); //set as the active project based on the id
    getTasks(id); //get their list of tasks
  };

  return (
    <li>
      <button
        onClick={() => getActiveProject(project._id)}
        type="button"
        className="btn btn-blank"
      >
        {project.proj_name}
      </button>
    </li>
  );
};

export default SingleProject;
