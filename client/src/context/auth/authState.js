import React, { useReducer } from "react";
import axiosClient from "../../config/axios";
import {
  GET_USER,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  SESSION_CLOSE,
} from "../../types";
import authContext from "./authContext";
import authReducer from "./authReducer";
import tokenAuth from "../../config/tokenAuth";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"), //user token generated in backend
    auth: null, //to flag a user as logged in the app
    user_data: null, //object whit the user data from BD
    message: null, //object to create and alert
    loading: true,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  /*------------functions to dispatch in authReducer------------*/
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

      //get the data from the new registered user, and their token
      authenticatedUser();
    } catch (error) {
      //accesing the custom error from api response and use it to config an alert
      const alert = {
        msg: error.response.data.msg,
        category: "alert-error",
      };
      //the alert object is the payload
      dispatch({
        type: REGISTER_ERROR,
        payload: alert,
      });
    }
  }; //--end registerUSer--

  //add the authenticated user data in user_data state prop
  const authenticatedUser = async () => {
    //get token from local storage
    const token = localStorage.getItem("token");
    if (token) {
      //to send the token to server by headers whit axios  use config/tokenAuth
      tokenAuth(token);
    }
    try {
      //call authenticatedUser api method in server
      const response = await axiosClient.get("/api/auth");
      //console.log(response.data);
      dispatch({
        type: GET_USER,
        payload: response.data.user,
      });
    } catch (error) {
      //console.log(error.response);
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  }; //--end authetincatedUser--

  //when a registered user login in the app
  const loginUser = async (data) => {
    try {
      const response = await axiosClient.post("/api/auth", data);
      //console.log(response);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      });
      //get data of a correct logged user and their token
      authenticatedUser();
      //if login fails catch the error and show and alert object
    } catch (error) {
      //console.log(error.response.data.msg);
      const alert = {
        msg: error.response.data.msg,
        category: "alert-error",
      };
      dispatch({
        type: LOGIN_ERROR,
        payload: alert,
      });
    }
  }; //--end loginUser--

  //close user 'session'
  const signOutUser = () => {
    dispatch({
      type: SESSION_CLOSE,
    });
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,
        auth: state.auth,
        user_data: state.user_data,
        message: state.message,
        loading: state.loading,
        registerUser,
        loginUser,
        authenticatedUser,
        signOutUser,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
