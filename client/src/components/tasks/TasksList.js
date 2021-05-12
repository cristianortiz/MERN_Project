import React, { Fragment, useContext } from "react";
import ProjectContext from "../../context/projects/projectContext";
import TaskContext from "../../context/tasks/taskContext";
import SingleTask from "./SingleTask";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const TasksList = () => {
  //using projectContext to use their props and functions
  const projectsContext = useContext(ProjectContext);
  //destructruring active_project, deleteProject from projectcontext
  const { active_project, deleteProject } = projectsContext;

  //---get taskState to use their props and functions through taskContext--
  const taskContext = useContext(TaskContext);
  const { tasks_project } = taskContext;

  //if there is no project selected or clicked previously
  if (!active_project) return <h2>Select a Project</h2>;
  //the project in which the user makes click, are flagged as active, and now is the selected to show its data
  const [project_selected] = active_project;

  //function in onClick event
  const btnDeleteProject = () => {
    //call the projectState function to delete a project from state
    deleteProject(project_selected._id);
  };

  return (
    <Fragment>
      <h2>{project_selected.proj_name}</h2>
      <ul className="list-tasks">
        {tasks_project.length === 0 ? (
          <li className="task">No Tasks Created</li>
        ) : (
          <TransitionGroup>
            {tasks_project.map((task) => (
              <CSSTransition key={task.id} timeout={300} classNames="task">
                <SingleTask task={task} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
      <button
        onClick={btnDeleteProject}
        type="button"
        className="btn btn-delete"
      >
        Delete Project &times;
      </button>
    </Fragment>
  );
};

export default TasksList;
