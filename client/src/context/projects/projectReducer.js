import { GET_PROJECTS, PROJECT_FORM, ADD_PROJECT } from "../../types"; //type to link the projectState whit ProjectReducer

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
        show_form: false,
      };
    default:
      return state;
  }
};
