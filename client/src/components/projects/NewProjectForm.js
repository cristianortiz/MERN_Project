import React, { Fragment, useState, useContext } from "react";
import ProjectContext from "../../context/projects/projectContext";

const NewProjectForm = () => {
  //get projectState access through ProjectContext for direct acces to their props and functions
  const projectsContext = useContext(ProjectContext);
  //destructuring props and functions from ProjectState using projectContext
  const { show_form, showProjectForm } = projectsContext;

  //local State to handle new project input field
  const [project, handleProject] = useState({
    proj_name: "",
  });

  //destructuring project local State
  const { proj_name } = project;

  const onChangeProject = (e) => {
    handleProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitProject = (e) => {
    e.preventDefault();

    //validate the form

    //add to state

    //reset the form
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
          <form onsubmit={onSubmitProject} className="form-new-project">
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
              className="btn btn-block btn-block"
              value="Add Project"
            />
          </form>
        ) : null
      }
    </Fragment>
  );
};

export default NewProjectForm;
