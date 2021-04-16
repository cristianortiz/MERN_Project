import React, { Fragment, useState } from "react";

const NewProjectForm = () => {
  //local State to handle new project
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
      <button type="button" className="btn btn-block btn-primary">
        New Project
      </button>
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
    </Fragment>
  );
};

export default NewProjectForm;
