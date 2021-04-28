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

export const ACTIVE_TASK = "ACTIVE_TASK";
