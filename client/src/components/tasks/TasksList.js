import React, { Fragment } from "react";
import SingleTask from "./SingleTask";
const TasksList = () => {
  //test tasks array
  const tasks = [
    { task_name: "Task 1", state: true },
    { task_name: "Task 2", state: true },
    { task_name: "Task 3", state: false },
    { task_name: "Task 4", state: false },
  ];

  return (
    <Fragment>
      <h2>Project: Project Example Title</h2>
      <ul className="list-tasks">
        {tasks.length === 0 ? (
          <li className="task">No Tasks Created</li>
        ) : (
          tasks.map((task) => <SingleTask task={task} />)
        )}
      </ul>
      <button type="button" className="btn btn-delete">
        Delete Project &times;
      </button>
    </Fragment>
  );
};

export default TasksList;
