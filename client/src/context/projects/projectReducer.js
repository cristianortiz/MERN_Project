import { GET_PROJECTS, PROJECT_FORM } from "../../types"; //type to link the projectState whit ProjectReducer

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
        projects: action.payload, //aign projects payload to projectState
      };
    default:
      return state;
  }
};
