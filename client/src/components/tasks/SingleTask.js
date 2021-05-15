import React, { useContext } from "react";
import ProjectContext from "../../context/projects/projectContext";
import TaskContext from "../../context/tasks/taskContext";
const SingleTask = ({ task }) => {
  //get TaskState to use their props and funcionts through TaskContext
  const taskContext = useContext(TaskContext);
  const { deleteTask, getTasks, updateTask } = taskContext;

  const projectsContext = useContext(ProjectContext);
  const { active_project } = projectsContext;
  //we can destructure the active_project array
  const [project] = active_project;

  //executes when the user clicks the delete task button
  const onClickDelete = (id) => {
    //besides the task id the backend also need the id project to check and delete with safety
    deleteTask(id, project._id);
    getTasks(project._id);
  };

  //executes when the user clicks the complete or pending task button
  const changeTaskState = (task) => {
    if (task.state) {
      task.state = false;
    } else {
      task.state = true;
    }
    //flag and add to state the new state of the task
    updateTask(task);
  };

  const flagTask = (task) => {
    updateTask(task);
  };

  return (
    <li className="task shadow">
      <p>{task.task_name}</p>
      <div className="state">
        {task.state ? (
          <button
            onClick={() => changeTaskState(task)}
            type="button"
            className="done"
          >
            Complete
          </button>
        ) : (
          <button
            onClick={() => changeTaskState(task)}
            type="button"
            className="pending"
          >
            Pending
          </button>
        )}
      </div>
      <div className="actions">
        <button
          onClick={() => flagTask(task)}
          type="button"
          className="btn btn-primary"
        >
          Edit
        </button>
        <button
          onClick={() => onClickDelete(task._id)}
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
