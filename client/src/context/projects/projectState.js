import { useReducer } from "react";
import {
  GET_PROJECTS,
  PROJECT_FORM,
  ADD_PROJECT,
  VALIDATE_FORM,
  ACTIVE_PROJECT,
  DELETE_PROJECT,
  ERROR_PROJECT,
} from "../../types";
import projectContext from "./projectContext";
import projectReducer from "./projectReducer";
import axiosClient from "../../config/axios";

//custom useState hook to handle props and functions relative to Projects
const ProjectState = (props) => {
  const initialState = {
    //test projects array
    projects: [],
    show_form: false, //to show or hide the new Project form in NewProjectForm component
    form_error: false, //to show and error msg in form validation
    active_project: null, //id of a project flag it as active
    message: null, //alert object to show error
  };

  //dispatch to executes actions whit useReducer hook relatives to Projects
  const [state, dispatch] = useReducer(projectReducer, initialState);

  //---CRUD actions, dipatch calls reducer methods to change state---
  // to set show_form prop and show the new project form using a dispatch and type
  const showProjectForm = () => {
    dispatch({
      //type to handle show_form state prop, does not need a payload
      type: PROJECT_FORM,
    });
  };
  //function to get projects list using reducer dispatch and a type
  const getProjects = async () => {
    try {
      const response = await axiosClient.get("/api/projects");
      console.log(response);
      dispatch({
        //type to handle show_form state prop
        type: GET_PROJECTS,
        payload: response.data.user_projects, //the function param is the payload of dispatcher
      });
    } catch (error) {
      const alert = {
        msg: "An error occurs",
        category: "error",
      };
      dispatch({
        type: ERROR_PROJECT,
        payload: alert,
      });
    }
  };

  //function to add a new project in projectState through the newproject form
  const addProject = async (project) => {
    //console.log(project.proj_name + " " + project.id);
    //insert the project data into the projectState arrays of projects whit dispatch function
    try {
      const response = await axiosClient.post("/api/projects", project);
      //console.log(response);
      //add project data also in the state
      dispatch({
        type: ADD_PROJECT,
        payload: response.data, //the function param is the payload of dispatcher
      });
    } catch (error) {
      const alert = {
        msg: "An error occurs",
        category: "error",
      };
      dispatch({
        type: ERROR_PROJECT,
        payload: alert,
      });
    }
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

  //delete a project by id
  const deleteProject = async (project_id) => {
    try {
      const response = await axiosClient.delete(`/api/projects/${project_id}`);
      dispatch({
        type: DELETE_PROJECT,
        payload: project_id,
      });
    } catch (error) {
      const alert = {
        msg: "An error occurs",
        category: "error",
      };
      dispatch({
        type: ERROR_PROJECT,
        payload: alert,
      });
    }
  };
  //return the context provider to get access to the other components related whit Projects to projectState
  return (
    <projectContext.Provider
      value={{
        projects: state.projects, //list of projects in projectState from BD for exanple
        show_form: state.show_form, //project state prop  to toggle show/hide new form project
        form_error: state.form_error, //toggle true/false if there is a form validation error
        active_project: state.active_project, //id of a project flag it as active, after that, states the selected project data
        message: state.message,
        showProjectForm, // function to handle show_form prop
        getProjects, //function to get projects from BD and populates projects list
        addProject, //to add a new project into state and later in BD
        showError, //to show error in form validation
        activeProject, //to flag a project as active when a user click it
        deleteProject, //delete a project from the projectState array of projects and later in BD
      }}
    >
      {props.children}
    </projectContext.Provider>
  );
};

export default ProjectState;
