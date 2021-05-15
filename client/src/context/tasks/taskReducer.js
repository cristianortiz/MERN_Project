import {
  ADD_TASK,
  DELETE_TASK,
  TASKS_PROJECT,
  VALIDATE_TASK,
  ACTIVE_TASK,
  UPDATE_TASK,
  RESET_ACT,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case TASKS_PROJECT:
      return {
        ...state, //copy of actual taskState
        //tasks of a specific project retrieved from BD
        tasks_project: action.payload,
      };
    case ADD_TASK:
      return {
        ...state,
        //add the new task to the state list of all tasks, later will be assigned to a project
        tasks_project: [action.payload, ...state.tasks_project], //to animation purpose add the new task in state first position
        error_task_form: false, //reset the form validation in taskState
      };
    case VALIDATE_TASK:
      return {
        ...state,
        error_task_form: true, //if form validates throw an error
      };
    case DELETE_TASK:
      return {
        ...state,
        //copy all the tasks in the state except for the one who is going to be deleted
        tasks_project: state.tasks_project.filter(
          (task) => task._id !== action.payload
        ),
      };

    case UPDATE_TASK:
      return {
        ...state,
        tasks_project: state.tasks_project.map((task) =>
          //search in all tasks, find the one who match the id and replace the whole task data
          task._id === action.payload._id ? action.payload : task
        ),
      };
    case ACTIVE_TASK:
      return {
        ...state,
        active_task: action.payload,
      };
    case RESET_ACT:
      return {
        ...state,
        active_task: null,
      };

    default:
      return state;
  }
};
