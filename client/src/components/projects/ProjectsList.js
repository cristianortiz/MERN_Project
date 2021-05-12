import React, { useContext, useEffect } from "react";
import ProjectContext from "../../context/projects/projectContext";
import AlertsContext from "../../context/alerts/alertsContext";
import SingleProject from "./SingleProject";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ProjectsList = () => {
  //use projectContext to acces projectState 'projects' prop initial state
  const projects_context = useContext(ProjectContext);
  //destructuring project_context to get projects array from projectState
  const { message, projects, getProjects } = projects_context;

  const alerts_context = useContext(AlertsContext);
  const { alert, showAlert } = alerts_context;

  //get projects when ProjectsList comp is loaded trough a useEffect
  useEffect(() => {
    if (message) {
      showAlert(message.msg, message.category);
    }
    getProjects();
    //eslint-disable-next-line
  }, [message]);

  //check if projects array is not empty
  if (projects.length === 0) return <p>Create a New Project</p>;

  return (
    <ul className="list-projects">
      {alert ? (
        <div className={`alert ${alert.category}`}>{alert.msg}</div>
      ) : null}
      <TransitionGroup>
        {projects.map((project) => (
          <CSSTransition key={project._id} timeout={300} classNames="project">
            <SingleProject project={project} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ProjectsList;
