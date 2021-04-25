import React, { useContext, useState } from "react";
import ProjectContext from "../../context/projects/projectContext";
import TaskContext from "../../context/tasks/taskContext";
const TaskForm = () => {
  //call the projectContext and destructuring a project selected by user
  const projectsContext = useContext(ProjectContext);
  const { active_project } = projectsContext;

  //call the taskState to use their props and function through taskContext
  const taskContext = useContext(TaskContext);
  const { addTask } = taskContext;

  //local State to handle task form input
  const [task, handleTask] = useState({
    task_name: "",
  });
  //destructuring local state to reset form later whit value atributte
  const { task_name } = task;
  //if there is no project selected yet
  if (!active_project) return null;
  const project_selected = active_project;

  //get the inputs values in the new task form
  const handleFormChange = (e) => {
    handleTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitTask = (e) => {
    e.preventDefault();
    //validate form

    //passig form validation

    //adding the new task to taskState
    //active_project is selected by the user and stored in projecState
    task.id_project = project_selected[0].id;
    task.state = false; //all new tasks start pending
    addTask(task);

    //reset the form
  };

  return (
    <div className="form">
      <form onSubmit={onSubmitTask}>
        <div className="container-input">
          <input
            onChange={handleFormChange}
            value={task_name}
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
