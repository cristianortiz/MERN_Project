import {
  ADD_TASK,
  DELETE_TASK,
  TASKS_PROJECT,
  VALIDATE_TASK,
  TASK_STATE,
  ACTIVE_TASK,
  UPDATE_TASK,
  RESET_ACT,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case TASKS_PROJECT:
      return {
        ...state, //copy of actual taskState
        tasks_project: state.tasks.filter(
          //filter in all tasks those who belongs to a specific id project and put them in task_project state
          (task) => task.id_project === action.payload
        ),
      };
    case ADD_TASK:
      return {
        ...state,
        //add the new task to the state list of all tasks, later will be assigned to a project
        tasks: [action.payload, ...state.tasks], //to animation purpose add the new task in state first position
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
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case TASK_STATE: //is the same code to edit a task
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          //search in all tasks, find the one who match the id and replace the whole task data
          task.id === action.payload.id ? action.payload : task
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
