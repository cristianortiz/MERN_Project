import { REGISTER_ERROR, REGISTER_SUCCESS } from "../../types";

export default (state, action) => {
  switch (action.type) {
    //the api return a token from jwt in case of register success
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        auth: true,
        msg: null,
      };
    case REGISTER_ERROR:
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
