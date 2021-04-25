import React, { useReducer } from "react";
import TaskReducer from "./taskReducer";
import TaskContext from "./taskContext";
import { TASKS_PROJECT } from "../../types";

const TaskState = (props) => {
  const initialState = {
    tasks: [
      { task_name: "Task 1", state: true, id_project: 1 },
      { task_name: "Task 2", state: true, id_project: 2 },
      { task_name: "Task 3", state: false, id_project: 3 },
      { task_name: "Task 23", state: false, id_project: 4 },
      { task_name: "Task 33", state: false, id_project: 3 },
      { task_name: "Task 43", state: false, id_project: 2 },
      { task_name: "Task 6", state: false, id_project: 1 },
      { task_name: "Task 7", state: false, id_project: 4 },
      { task_name: "Task 9", state: false, id_project: 2 },
      { task_name: "Task 5", state: false, id_project: 1 },
      { task_name: "Task 11", state: false, id_project: 4 },
      { task_name: "Task 12", state: false, id_project: 3 },
    ],
    tasks_project: null,
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

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks, //all the tasks created
        tasks_project: state.tasks_project, //tasks of a specific project
        getTasks, //get the list of taks of a specific project
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};
export default TaskState;
