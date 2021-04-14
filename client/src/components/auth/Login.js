import React, { useState } from "react";
import { Link } from "react-router-dom"; //to create a link to another component route

const Login = () => {
  //local state data inputs in login form
  const [login_data, handleLoginData] = useState({
    email: "",
    password: "",
  });
  //destructuring local statate
  const { email, password } = login_data;

  const stateDataForm = (e) => {
    handleLoginData({ ...login_data, [e.target.name]: e.target.value });
  };

  //submit login form when user sign in
  const submitLoginForm = (e) => {
    e.preventDefault();

    //form valitadtion
  };

  return (
    <div className="form-user">
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
