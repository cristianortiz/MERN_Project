import React, { useContext, useEffect, useState } from "react";
import ProjectContext from "../../context/projects/projectContext";
import TaskContext from "../../context/tasks/taskContext";
const TaskForm = () => {
  //call the projectContext and destructuring a project selected by user
  const projectsContext = useContext(ProjectContext);
  //destructuring active project this is the one in which the user clicks
  const { active_project } = projectsContext;

  //call the taskState to use their props and function through taskContext
  const taskContext = useContext(TaskContext);
  const {
    error_task_form,
    active_task,
    addTask,
    validateTaskForm,
    getTasks,
    updateTask,
    resetActiveTask,
  } = taskContext;

  //local effect to reload the task form whit the active task to edit it
  useEffect(() => {
    //if there is a task flagged as active
    if (active_task !== null) {
      handleTask(active_task);
    } else {
      handleTask({
        task_name: "",
      });
    }
  }, [active_task]);

  //local State to handle task form input
  const [task, handleTask] = useState({
    task_name: "", //initial state of input is empty
  });
  //destructuring local state to reset form later with value atributte
  const { task_name } = task;

  //if there is no project selected yet
  if (!active_project) return null;
  //we can destructure the active_project array
  const [project_selected] = active_project;

  //get the inputs values in task_name input form and add it to local state
  const handleFormChange = (e) => {
    handleTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };
  //process the form when submit a new task or edit one
  const onSubmitTask = (e) => {
    e.preventDefault();
    //validate form
    if (task_name.trim() === "") {
      validateTaskForm();
      return;
    }
    //check if the action is add new task or edit
    if (active_task === null) {
      //adding the new task to taskState
      task.project_id = project_selected._id;
      addTask(task);
    } else {
      updateTask(task);
      resetActiveTask();
    }
    //get and filter the tasks who belongs to the active project (this include the new one)
    getTasks(project_selected._id);
    //reset the form input whit local state handle function
    handleTask({
      task_name: "",
    });
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
            value={active_task ? "Edit Task" : "Add Task"}
          />
        </div>
      </form>
      {error_task_form ? (
        <p className="msg error">Task Name is Mandatory</p>
      ) : null}
    </div>
  );
};

export default TaskForm;
