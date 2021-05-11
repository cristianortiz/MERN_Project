import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom"; //to create a link to another component route
import alertsContext from "../../context/alerts/alertsContext";
import authContext from "../../context/auth/authContext";

const Login = (props) => {
  //get functions and props from AlertsState through context
  const AlertsContext = useContext(alertsContext);
  const { alert, showAlert } = AlertsContext;

  //get functions and props from authState through context
  const AuthContext = useContext(authContext);
  const { message, auth, loginUser } = AuthContext;

  useEffect(() => {
    //in case of wrong password or user does´nt exists
    if (auth) {
      //user register or authenticated, send it to projects
      props.history.push("/projects");
    }
    //if there is a message object, an error in register has ocurred
    if (message) {
      //show the alert object
      showAlert(message.msg, message.category);
    }
  }, [message, auth, props.history]);

  //---local state data inputs in login form---
  const [login_data, handleLoginData] = useState({
    email: "",
    password: "",
  });
  //destructuring local state
  const { email, password } = login_data;
  //on change in form inputs data keep local state updated
  const stateDataForm = (e) => {
    handleLoginData({ ...login_data, [e.target.name]: e.target.value });
  };

  //submit login form when user sign in
  const submitLoginForm = (e) => {
    e.preventDefault();
    //form validation and show alert in error case
    if (email.trim() === "" || password.trim() === "") {
      showAlert("All fields are mandatory", "alert-error");
    }
    //send login_data state object to login
    loginUser(login_data);
  };

  return (
    <div className="form-user">
      {alert ? (
        <div className={`alert ${alert.category}`}>{alert.msg}</div>
      ) : null}
      <div className="container-form shadow-dark">
        <h1>Sign In</h1>
        <form onSubmit={submitLoginForm}>
          <div className="field-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your email"
              value={email}
              onChange={stateDataForm}
            />
          </div>
          <div className="field-form">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              type="password"
              id="password"
              name="password"
              placeholder="Your Password"
              onChange={stateDataForm}
            />
          </div>
          <div className="field-form">
            <input
              type="submit"
              className="btn btn-primary btn-block"
              value="Sign In"
            />
          </div>
        </form>
        <Link to={"/register"} className="link-account">
          Register a new Account
        </Link>
      </div>
    </div>
  );
};

export default Login;
