import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import alertsContext from "../../context/alerts/alertsContext";
import authContext from "../../context/auth/authContext";
const Register = (props) => {
  //get functions and props from AlertsState through context
  const AlertsContext = useContext(alertsContext);
  const { alert, showAlert } = AlertsContext;

  //get functions and props from authState through context
  const AuthContext = useContext(authContext);
  const { message, auth, registerUser } = AuthContext;

  //in case of user was register, logged or attempt or duplicated register
  useEffect(() => {
    if (auth) {
      //user register or authenticated, send it to projects
      props.history.push("/projects");
    }
    if (message) {
      //show the alert object
      showAlert(message.msg, message.category);
    }
  }, [message, auth, props.history]);

  //local state data inputs in register form
  const [register_data, handleRegister] = useState({
    email: "",
    password: "",
    password2: "",
    user_name: "",
  });
  //destructuring local statate
  const { email, password, user_name, password2 } = register_data;

  const stateRegisterForm = (e) => {
    handleRegister({ ...register_data, [e.target.name]: e.target.value });
  };

  //submit login form when user sign in
  const submitRegisterForm = (e) => {
    e.preventDefault();
    //form valitadtion
    if (
      user_name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      password2.trim() === ""
    ) {
      showAlert("All fields are mandatory", "alert-error");
      return;
    }
    //passwords must be equals and 6 characters minimum
    if (password.length < 6) {
      showAlert("Password must have 6 characters minimum", "alert-error");
      return;
    }
    if (password !== password2) {
      showAlert("Passwords must be equals", "alert-error");
      return;
    }

    //send to dispatch in authState
    registerUser({ user_name, email, password });
  };

  return (
    <div className="form-user">
      {alert ? (
        <div className={`alert ${alert.category}`}>{alert.msg}</div>
      ) : null}
      <div className="container-form shadow-dark">
        <h1>Create New Account</h1>

        <form onSubmit={submitRegisterForm}>
          <div className="field-form">
            <label htmlFor="user_name">Username</label>
            <input
              type="user_name"
              id="user_name"
              name="user_name"
              placeholder="Your name"
              value={user_name}
              onChange={stateRegisterForm}
            />
          </div>
          <div className="field-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your email"
              value={email}
              onChange={stateRegisterForm}
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
              onChange={stateRegisterForm}
            />
          </div>
          <div className="field-form">
            <label htmlFor="password2">Confirm Password</label>
            <input
              value={password2}
              type="password"
              id="password2"
              name="password2"
              placeholder="Repeate Your Password"
              onChange={stateRegisterForm}
            />
          </div>
          <div className="field-form">
            <input
              type="submit"
              className="btn btn-primary btn-block"
              value="Sign Up"
            />
          </div>
        </form>
        <Link to={"/"} className="link-account">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Register;
