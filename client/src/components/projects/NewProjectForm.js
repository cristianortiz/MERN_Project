import React, { Fragment } from "react";
const NewProjectForm = () => {
  return (
    <Fragment>
      <button type="button" className="btn btn-block btn-primary">
        New Project
      </button>
      <form className="form-new-project">
        <input
          type="text"
          className="input-text"
          placeholder="Project Name"
          name="proj_name"
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
