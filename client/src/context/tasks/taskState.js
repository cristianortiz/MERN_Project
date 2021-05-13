import { useReducer } from "react";
import TaskReducer from "./taskReducer";
import TaskContext from "./taskContext";

import {
  ADD_TASK,
  TASKS_PROJECT,
  VALIDATE_TASK,
  DELETE_TASK,
  TASK_STATE,
  ACTIVE_TASK,
  UPDATE_TASK,
  RESET_ACT,
} from "../../types";
import axiosClient from "../../config/axios";

const TaskState = (props) => {
  const initialState = {
    //tasks: [],
    tasks_project: [],
    error_task_form: false,
    active_task: null,
  };

  //dispatch and state
  const [state, dispatch] = useReducer(TaskReducer, initialState);

  //----------Tasks Dispatch functions----------------------------
  //get the tasks related to a specific project
  const getTasks = async (project_id) => {
    try {
      const response = await axiosClient.get("/api/tasks", {
        params: { project_id },
      });
      console.log(response);
      dispatch({
        type: TASKS_PROJECT,
        payload: response.data.tasks, //id will be the action.payload value in taskReducer
      });
    } catch (error) {
      console.log(error);
    }
  };

  //add a new task to an active project
  const addTask = async (task) => {
    try {
      const response = await axiosClient.post("/api/tasks", task);
      console.log(response);
      dispatch({
        type: ADD_TASK,
        payload: task, //entire task object
      });
    } catch (error) {
      console.log(error);
    }
  };

  //set error_task_form into true if form validations throws an error
  const validateTaskForm = () => {
    dispatch({
      type: VALIDATE_TASK, //without payload
    });
  };

  const deleteTask = async (id_task, project_id) => {
    try {
      await axiosClient.delete(`/api/tasks/${id_task}`, {
        params: { project_id },
      });

      dispatch({
        type: DELETE_TASK,
        payload: id_task,
      });
    } catch (error) {
      console.log(error);
      //console.log("project_id:" + project_id);
    }
  };

  //flag a task as active when the user click on it
  const flagActiveTask = (task) => {
    dispatch({
      type: ACTIVE_TASK,
      payload: task,
    });
  };
  //update the data of active task when user clicks on edit task
  const updateTask = async (task) => {
    try {
      const response = await axiosClient.put(`/api/tasks/${task._id}`, task);
      console.log(task);
      dispatch({
        type: UPDATE_TASK,
        payload: response.data.task,
      });
      console.log(response.data.task);
    } catch (error) {
      console.log(error);
    }
  };

  const resetActiveTask = () => {
    dispatch({
      type: RESET_ACT,
    });
  };

  return (
    <TaskContext.Provider
      value={{
        //tasks: state.tasks, //all the tasks created
        tasks_project: state.tasks_project, //tasks of a specific project
        error_task_form: state.error_task_form, //error in task form validation
        active_task: state.active_task, //prop flaged when a task is selected by the user
        getTasks, //get the list of taks of a specific project
        addTask, //add a new task to a project selected by the user
        validateTaskForm, //set error_task_form into true if form validations throws an error
        deleteTask, //delete a task using their id
        flagActiveTask, //to flag a task as active when a user select it
        updateTask, //update the data of active task when user clicks on edit task or state tag
        resetActiveTask, //reset active_task prop
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};
export default TaskState;
