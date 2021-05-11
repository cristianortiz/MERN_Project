import {
  GET_USER,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  SESSION_CLOSE,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    //the api return a token from jwt in case of register success o login of registered user
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      //save the token ui local storage
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        auth: true, //flag the user as authenticated
        msg: null, //clean any alert messages
        loading: false,
      };
    //from authenticatedUSer()
    case GET_USER:
      return {
        ...state,
        auth: true,
        //add the authenticated user data in user_data state prop
        user_data: action.payload,
        loading: false,
      };
    case LOGIN_ERROR:
    case REGISTER_ERROR:
    case SESSION_CLOSE:
      //for safety remove the token
      localStorage.removeItem("token");
      //An alert object (if an register error occurs) is the payload
      return {
        ...state,
        token: null,
        user_data: null,
        auth: null,
        //message is the alert object, inside has msg,category
        message: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
