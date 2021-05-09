import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Projects from "./components/projects/Projects";
import AlertsState from "./context/alerts/alertsState";
import AuthState from "./context/auth/authState";
import ProjecState from "./context/projects/projectState";
import TaskState from "./context/tasks/taskState";
function App() {
  console.log(process.env.REACT_APP_BACKEND_URL);
  //inside Route component the routes of the app
  return (
    <ProjecState>
      <TaskState>
        <AlertsState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/projects" component={Projects} />
              </Switch>
            </Router>
          </AuthState>
        </AlertsState>
      </TaskState>
    </ProjecState>
  );
}

export default App;
