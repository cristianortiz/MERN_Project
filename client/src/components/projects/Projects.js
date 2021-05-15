import React, { useContext, useEffect } from "react";
import authContext from "../../context/auth/authContext";
import MainMenu from "../layout/MainMenu";
import Sidebar from "../layout/Sidebar";
import TaskForm from "../tasks/TaskForm";
import TasksList from "../tasks/TasksList";

const Projects = () => {
  //extract user data from authState through authContext
  const AuthContext = useContext(authContext);
  const { authenticatedUser } = AuthContext;
  //to keep the user data avaliable similar to sessions or cookies when the app is reloaded
  useEffect(() => {
    authenticatedUser();
    // eslint-disable-next-line
  }, []);

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
