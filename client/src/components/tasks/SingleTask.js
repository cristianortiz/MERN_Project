import React, { useContext } from "react";
import ProjectContext from "../../context/projects/projectContext";
import TaskContext from "../../context/tasks/taskContext";
const SingleTask = ({ task }) => {
  //get TaskState to use their props and funcionts through TaskContext
  const taskContext = useContext(TaskContext);
  const { deleteTask, getTasks } = taskContext;

  const projectsContext = useContext(ProjectContext);
  const { active_project } = projectsContext;
  //we can destructure the active_project array
  const [project] = active_project;

  //executes when the user clicks the delete task button
  const onClickDelete = (id) => {
    deleteTask(id);
    getTasks(project.id);
  };

  return (
    <li className="task shadow">
      <p>{task.task_name}</p>
      <div className="state">
        {task.state ? (
          <button type="button" className="done">
            Complete
          </button>
        ) : (
          <button type="button" className="pending">
            Pending
          </button>
        )}
      </div>
      <div className="actions">
        <button tyoe="button" className="btn btn-primary">
          Edit
        </button>
        <button
          onClick={() => onClickDelete(task.id)}
          tyoe="button"
          className="btn btn-secondary"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default SingleTask;
