import React, { useContext } from "react";
import ProjectContext from "../../context/projects/projectContext";
const TaskForm = () => {
  //call the context and destructuring a project selected by de user
  const projectsContext = useContext(ProjectContext);
  const { active_project } = projectsContext;
  //if there ir no project selected yet
  if (!active_project) return null;
  const project_selected = active_project;

  return (
    <div className="form">
      <form>
        <div className="container-input">
          <input
            type="text"
            className="input-text"
            placeholder="Task Title"
            name="task_name"
          />
        </div>
        <div className="container-input">
          <input
            type="submit"
            className="btn btn-primary btn-submit btn-block"
            value="Add Task"
          />
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
