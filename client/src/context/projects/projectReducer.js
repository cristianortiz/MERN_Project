import {
  GET_PROJECTS,
  PROJECT_FORM,
  ADD_PROJECT,
  VALIDATE_FORM,
  ACTIVE_PROJECT,
  DELETE_PROJECT,
} from "../../types"; //type to link the projectState whit ProjectReducer

export default (state, action) => {
  switch (action.type) {
    case PROJECT_FORM:
      return {
        ...state, //projectState copy
        show_form: true, //set the show_form prop to true
      };
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload, //load projects payload to projectState
      };
    case ADD_PROJECT:
      return {
        ...state,
        //insert the new project data into projects array in projectState
        projects: [...state.projects, action.payload],
        show_form: false, //reset show form state prop
        form_error: false, //reset previous form error msg
      };
    case VALIDATE_FORM:
      return {
        ...state,
        form_error: true, //to show a form validation error
      };
    case ACTIVE_PROJECT:
      return {
        ...state,
        //filter  if the project id to flag as active is in projects state array
        active_project: state.projects.filter(
          (project) => project.id === action.payload //state the project data in action_project prop
        ),
      };

    case DELETE_PROJECT:
      return {
        ...state,
        //filter  if the project id flagged to delete is in the projects state array
        projects: state.projects.filter(
          //search and copy all the projects in the state except the one selected to delete
          (project) => project.id !== action.payload
        ),
        active_project: null, //reset the active_project flag
      };
    default:
      return state;
  }
};
