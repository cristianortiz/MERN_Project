import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Projects from "./components/projects/Projects";
import PrivateRoute from "./components/routes/privateRoute";
import tokenAuth from "./config/tokenAuth";
import AlertsState from "./context/alerts/alertsState";
import AuthState from "./context/auth/authState";
import ProjecState from "./context/projects/projectState";
import TaskState from "./context/tasks/taskState";

//checks for a valid token
const token = localStorage.getItem("token");
if (token) {
  //if a token exists send it to backend, as validation of correct user login
  tokenAuth(token);
}
function App() {
  // console.log(process.env.REACT_APP_BACKEND_URL);
  return (
    <ProjecState>
      <TaskState>
        <AlertsState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute exact path="/projects" component={Projects} />
              </Switch>
            </Router>
          </AuthState>
        </AlertsState>
      </TaskState>
    </ProjecState>
  );
}

export default App;
