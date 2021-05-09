//type to set projectState show_form prop in projectReducer
export const PROJECT_FORM = "PROJECT_FORM";
//get projects via dispatch
export const GET_PROJECTS = "GET_PROJECTS";
//add new project via dispatch
export const ADD_PROJECT = "ADD_PROJECT";
//add new project via dispatch
export const VALIDATE_FORM = "VALIDATE_FORM";
//flag a project in active mode
export const ACTIVE_PROJECT = "ACTIVE_PROJECT";
export const DELETE_PROJECT = "DELETE_PROJECT";

/*--------Types for tasks related dispatch functions-----*/
//get the list of tasks associated whit a a project id
export const TASKS_PROJECT = "TASKS_PROJECT";
//add a new task to a project
export const ADD_TASK = "ADD_TASK";
//error in task form validation
export const VALIDATE_TASK = "VALIDATE_TASK";
export const DELETE_TASK = "DELETE_TASK";
//to flag a task like complete or pending
export const TASK_STATE = "TASK_STATE";
//to flag a task as active whrn user click edit on it
export const ACTIVE_TASK = "ACTIVE_TASK";
//to update a task
export const UPDATE_TASK = "UPDATE_TASK";
//reset the taskState prop active_task
export const RESET_ACT = "RESET_ACT";

/*---Types for Alerts in login and sign in forms--*/
export const SHOW_ALERT = "SHOW_ALERT";

export const HIDE_ALERT = "HIDE_ALERT";

/*---Types for user authentication register and login--*/
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";
//to get data of a logged user
export const GET_USER = "GET_USER";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const SESSION_CLOSE = "SESSION_CLOSE";
