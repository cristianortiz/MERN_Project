import React from "react";

import NewProjectForm from "../projects/NewProjectForm";
import ProjectsList from "../projects/ProjectsList";
const Sidebar = () => {
  return (
    <aside>
      <h1>
        MERN <span>Projects and Tasks</span>
      </h1>
      <NewProjectForm />
      <div className="projects">
        <h2>Your Projects</h2>
        <ProjectsList />
      </div>
    </aside>
  );
};

export default Sidebar;
