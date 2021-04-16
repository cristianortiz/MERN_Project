import React from "react";
import SingleProject from "./SingleProject";

const ProjectsList = () => {
  //test projects array
  const projects = [
    { proj_name: "Project 1" },
    { proj_name: "Project 2" },
    { proj_name: "Project 3" },
  ];

  return (
    <ul className="list-projects">
      {projects.map((project) => (
        <SingleProject project={project} />
      ))}
    </ul>
  );
};

export default ProjectsList;
