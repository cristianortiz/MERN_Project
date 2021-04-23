import React, { Fragment, useContext } from "react";
import ProjectContext from "../../context/projects/projectContext";
import SingleTask from "./SingleTask";
const TasksList = () => {
  //using projectContext to use their props and functions
  const projectsContext = useContext(ProjectContext);
  //destructruring active_project, deleteProject from projectcontext
  const { active_project, deleteProject } = projectsContext;
  //if there is no project selected or clicked previously
  if (!active_project) return <h2>Select a Project</h2>;
  //the project in which the user makes click, are flagged as active, and now is the selected to show its data
  const [project_selected] = active_project;

  //function in onClick event
  const onclickDelProject = () => {
    //call the projectState function to delete a project from state
    deleteProject(project_selected.id);
  };

  //test tasks array
  const tasks = [
    { task_name: "Task 1", state: true },
    { task_name: "Task 2", state: true },
    { task_name: "Task 3", state: false },
    { task_name: "Task 4", state: false },
  ];

  return (
    <Fragment>
      <h2>{project_selected.proj_name}</h2>
      <ul className="list-tasks">
        {tasks.length === 0 ? (
          <li className="task">No Tasks Created</li>
        ) : (
          tasks.map((task) => <SingleTask task={task} />)
        )}
      </ul>
      <button
        onClick={onclickDelProject}
        type="button"
        className="btn btn-delete"
      >
        Delete Project &times;
      </button>
    </Fragment>
  );
};

export default TasksList;
