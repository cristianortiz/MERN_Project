import { TASKS_PROJECT } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case TASKS_PROJECT:
      return {
        ...state, //copy of actual taskState
        tasks_project: state.tasks.filter(
          //filter in all tasks those who belongs to a specific id project
          (task) => task.id_project === action.payload
        ),
      };
    default:
      return state;
  }
};
