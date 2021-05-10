import {
  GET_USER,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    //the api return a token from jwt in case of register success o login of registered user
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        auth: true,
        msg: null,
      };
    case GET_USER:
      return {
        ...state,
        user_data: action.payload,
      };
    case LOGIN_ERROR:
    case REGISTER_ERROR:
      //for safety remove the token
      localStorage.removeItem("token");
      //An alert object (if an register error occurs) is the payload
      return {
        ...state,
        token: null,
        //message is the alert object, inside has msg,category
        message: action.payload,
      };
    default:
      return state;
  }
};
