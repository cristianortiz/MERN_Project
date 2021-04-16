import React from "react";
const SingleProject = ({ project }) => {
  return (
    <li>
      <button type="button" className="btn btn-blank">
        {project.proj_name}
      </button>
    </li>
  );
};

export default SingleProject;
