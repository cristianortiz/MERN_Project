import React from "react";
import MainMenu from "../layout/MainMenu";
import Sidebar from "../layout/Sidebar";
import TaskForm from "../tasks/TaskForm";
import TasksList from "../tasks/TasksList";
const Projects = () => {
  return (
    <div className="container-app">
      <Sidebar />
      <div className="main-section">
        <MainMenu />
        <main>
          <TaskForm />
          <div className="container-tasks">
            <TasksList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;
