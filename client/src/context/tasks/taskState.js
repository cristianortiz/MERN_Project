import React, { useReducer } from "react";
import TaskReducer from "./taskReducer";
import TaskContext from "./taskContext";
import {
  ADD_TASK,
  TASKS_PROJECT,
  VALIDATE_TASK,
  DELETE_TASK,
  TASK_STATE,
  ACTIVE_TASK,
} from "../../types";

const TaskState = (props) => {
  const initialState = {
    tasks: [
      { id: 1, task_name: "Task 1", state: true, id_project: 1 },
      { id: 2, task_name: "Task 2", state: true, id_project: 2 },
      { id: 3, task_name: "Task 3", state: false, id_project: 3 },
      { id: 4, task_name: "Task 23", state: false, id_project: 4 },
      { id: 5, task_name: "Task 33", state: false, id_project: 3 },
      { id: 6, task_name: "Task 43", state: false, id_project: 2 },
      { id: 7, task_name: "Task 6", state: false, id_project: 1 },
      { id: 8, task_name: "Task 7", state: false, id_project: 4 },
      { id: 9, task_name: "Task 9", state: false, id_project: 2 },
      { id: 10, task_name: "Task 5", state: false, id_project: 1 },
      { id: 11, task_name: "Task 11", state: false, id_project: 4 },
      { id: 12, task_name: "Task 12", state: false, id_project: 3 },
    ],
    tasks_project: null,
    error_task_form: false,
    active_task: null,
  };

  //dispatch and state
  const [state, dispatch] = useReducer(TaskReducer, initialState);

  //----------Taks Dispatch functions----------------------------
  //get the tasks related to a specific project
  const getTasks = (id_project) => {
    dispatch({
      type: TASKS_PROJECT,
      payload: id_project, //id will be the action.payload value in taskReducer
    });
  };

  //add a new task to an active project
  const addTask = (task) => {
    dispatch({
      type: ADD_TASK,
      payload: task, //entire task object
    });
  };

  //set error_task_form into true if form validations throws an error
  const validateTaskForm = () => {
    dispatch({
      type: VALIDATE_TASK, //without payload
    });
  };

  const deleteTask = (id_task) => {
    dispatch({
      type: DELETE_TASK,
      payload: id_task,
    });
  };
  //to flag a task like complete or pending when the clicks pending or complete
  const flagTaskState = (task) => {
    dispatch({
      type: TASK_STATE,
      payload: task,
    });
  };

  //select a task to edit it
  const flagActiveTask = (task) => {
    dispatch({
      type: ACTIVE_TASK,
      payload: task,
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks, //all the tasks created
        tasks_project: state.tasks_project, //tasks of a specific project
        error_task_form: state.error_task_form, //error in task form validation
        active_task: state.active_task, //prop flaged when a task is selected by the user
        getTasks, //get the list of taks of a specific project
        addTask, //add a new task to a project selected by the user
        validateTaskForm, //set error_task_form into true if form validations throws an error
        deleteTask, //delete a task using their id
        flagTaskState, //to flag a task like complete or pending
        flagActiveTask, //to flag a task as active when a user select it
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};
export default TaskState;
