import React, { useReducer } from "react";
import { GET_PROJECTS, PROJECT_FORM } from "../../types";
import projectContext from "./projectContext";
import projectReducer from "./projectReducer";

//custom useState hook to handle props and functions relative to Projects
const ProjectState = (props) => {
  const projects = [
    { id: 1, proj_name: "Project 1" },
    { id: 2, proj_name: "Project 2" },
    { id: 3, proj_name: "Project 3" },
  ];
  const initialState = {
    //test projects array
    projects: [],

    show_form: false, //to show or hide the new Project form in NewProjectForm component
  };

  //dispatch to executes actions whit useReducer hook relatives to Projects
  const [state, dispatch] = useReducer(projectReducer, initialState);

  //function to CRUD actions, dipatch calls reducer methods to change state

  //function to set show_from prop and show the new project form using a dispatch and type
  const showProjectForm = () => {
    dispatch({
      //type to handle show_form state prop, doe not need a payload
      type: PROJECT_FORM,
    });
  };
  //function to get projects using reducer dispatch and a type
  const getProjects = () => {
    dispatch({
      //type to handle show_form state prop
      type: GET_PROJECTS,
      payload: projects, //the function param is the payload of dispatcher
    });
  };

  //return the context provider to get access to the other components related whit Projects to projectState
  return (
    <projectContext.Provider
      value={{
        projects: state.projects,
        show_form: state.show_form,
        showProjectForm,
        getProjects,
      }}
    >
      {props.children}
    </projectContext.Provider>
  );
};

export default ProjectState;
