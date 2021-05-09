import React, { useReducer } from "react";
import axiosClient from "../../config/axios";
import { REGISTER_ERROR, REGISTER_SUCCESS } from "../../types";
import authContext from "./authContext";
import authReducer from "./authReducer";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    auth: null,
    user_data: null,
    message: null,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  //functions to dispatch in authReducer
  //register a new user, the data came from Register component
  const registerUser = async (data) => {
    try {
      const response = await axiosClient.post("/api/users", data);
      console.log(response.data);
      //the api returns a user token, it´s will be the payload
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      //accesing the custom error from api response and use it to config an alert
      const alert = {
        msg: error.response.data.msg,
        category: "error",
      };
      //the alert object is the payload
      dispatch({
        type: REGISTER_ERROR,
        payload: alert,
      });
    }
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,
        auth: state.auth,
        user_data: state.user_data,
        message: state.message,
        registerUser,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
