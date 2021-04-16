import React from "react";
const SingleTask = ({ task }) => {
  return (
    <li className="task shadow">
      <p>{task.task_name}</p>
      <div className="state">
        {task.state ? (
          <button type="button" className="done">
            Done
          </button>
        ) : (
          <button type="button" className="undone">
            Undone
          </button>
        )}
      </div>
      <div className="actions">
        <button tyoe="button" className="btn btn-primary">
          Edit
        </button>
        <button tyoe="button" className="btn btn-secondary">
          Delete
        </button>
      </div>
    </li>
  );
};

export default SingleTask;
