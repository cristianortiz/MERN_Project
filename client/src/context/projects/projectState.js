import React, { useReducer } from "react";
import {
  GET_PROJECTS,
  PROJECT_FORM,
  ADD_PROJECT,
  VALIDATE_FORM,
  ACTIVE_PROJECT,
} from "../../types";
import projectContext from "./projectContext";
import projectReducer from "./projectReducer";
import { v4 as uuidv4 } from "uuid";

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
    form_error: false, //to show and error msg in form validation
    active_project: null, //id of a project flag it as active
  };

  //dispatch to executes actions whit useReducer hook relatives to Projects
  const [state, dispatch] = useReducer(projectReducer, initialState);

  //CRUD actions, dipatch calls reducer methods to change state

  //function to set show_from prop and show the new project form using a dispatch and type
  const showProjectForm = () => {
    dispatch({
      //type to handle show_form state prop, does not need a payload
      type: PROJECT_FORM,
    });
  };
  //function to get projects list using reducer dispatch and a type
  const getProjects = () => {
    dispatch({
      //type to handle show_form state prop
      type: GET_PROJECTS,
      payload: projects, //the function param is the payload of dispatcher
    });
  };

  //function to add a new project in projectState through the newproject form
  const addProject = (project) => {
    //add an id to project data
    project.id = uuidv4();
    //console.log(project.proj_name + " " + project.id);
    //insert the project data into the projectState arrays of projects whit dispatch function
    dispatch({
      type: ADD_PROJECT,
      payload: project, //the function param is the payload of dispatcher
    });
  };

  //show error when the form is validated
  const showError = () => {
    dispatch({
      type: VALIDATE_FORM,
    }); //sin payload
  };

  //if user click a name projects use their id to flag it like active
  const activeProject = (project_id) => {
    dispatch({
      type: ACTIVE_PROJECT,
      payload: project_id,
    });
  };

  //return the context provider to get access to the other components related whit Projects to projectState
  return (
    <projectContext.Provider
      value={{
        projects: state.projects, //list of projects in projectState from BD for exanple
        show_form: state.show_form, //project state prop  to toggle show/hide new form project
        form_error: state.form_error, //toggle true false is there ir for validation error
        active_project: state.active_project, //id of a project flag it as active
        showProjectForm, // function to handle show_form prop
        getProjects, //function to get projects from BD and populates projects list
        addProject,
        showError,
        activeProject,
      }}
    >
      {props.children}
    </projectContext.Provider>
  );
};

export default ProjectState;
