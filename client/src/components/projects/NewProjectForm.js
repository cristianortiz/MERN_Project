import React, { Fragment, useState, useContext } from "react";
import ProjectContext from "../../context/projects/projectContext";

const NewProjectForm = () => {
  //get projectState direct access through ProjectContext for props and functions
  const projectsContext = useContext(ProjectContext);
  //destructuring props and functions from ProjectState using projectContext
  const { show_form, form_error, showProjectForm, addProject, showError } =
    projectsContext;

  //local State to handle new project form input field
  const [project, handleProject] = useState({
    proj_name: "", //name property empty in the form as initial state
  });

  //destructuring project local State
  const { proj_name } = project;

  //handle in local state the user form inputs
  const onChangeProject = (e) => {
    handleProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };
  //when user clicks the submit form button
  const onSubmitProject = (e) => {
    e.preventDefault();
    //validate the form
    if (proj_name === "") {
      //call to change form_error state prop in true and show an error msg
      showError();
      return;
    }
    //add the project data to projectState array of projects
    addProject(project);
    //reset the form through local useState to form input
    handleProject({
      proj_name: "",
    });
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primary"
        onClick={
          //call the the function to show new project form from projectState
          () => showProjectForm()
        }
      >
        New Project
      </button>
      {
        //if ProjectState->show_form prop is true show the new project form
        show_form ? (
          <form onSubmit={onSubmitProject} className="form-new-project">
            <input
              type="text"
              className="input-text"
              placeholder="Project Name"
              name="proj_name"
              onChange={onChangeProject}
              value={proj_name}
            />
            <input
              type="submit"
              className="btn btn-block btn-primary"
              value="Add Project"
            />
          </form>
        ) : null
      }
      {
        //show error msg if form_error state prop is true
        form_error ? (
          <p className="msg error">Project Name is Mandatory</p>
        ) : null
      }
    </Fragment>
  );
};

export default NewProjectForm;
