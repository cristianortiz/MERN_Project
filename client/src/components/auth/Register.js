import React, { useState } from "react";
import { Link } from "react-router-dom";
const Register = () => {
  //local state data inputs in login form
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

    //passwords must be equals and 6 characters minimum
  };

  return (
    <div className="form-user">
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
              type="password2"
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
