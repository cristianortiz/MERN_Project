import axiosClient from "./axios";

//to manage user logged token
const tokenAuth = (token) => {
  if (token) {
    //save token in axios client field
    axiosClient.defaults.headers.common["x-auth-token"] = token;
  } else {
    //if there is no token clean the variable
    delete axiosClient.defaults.headers.common["x-auth-token"];
  }
};
export default tokenAuth;
