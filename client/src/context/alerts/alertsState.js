import React, { useReducer } from "react";
import { HIDE_ALERT, SHOW_ALERT } from "../../types";
import alertsContext from "./alertsContext";
import alertsReducer from "./alertsReducer";

//custom useState hook to handle props and functions relative to Alerts
const AlertsState = (props) => {
  const initialState = {
    alert: null,
  };
  //dispatch to executes actions whit useReducer hook relatives to Projects
  const [state, dispatch] = useReducer(alertsReducer, initialState);

  //dispatch to executes actions whit useReducer hook relatives to Alerts
  const showAlert = (msg, category) => {
    dispatch({
      type: SHOW_ALERT,
      payload: { msg: msg, category: category },
    });

    //timeout to hide the alert after 5 secs
    setTimeout(() => {
      dispatch({
        type: HIDE_ALERT,
      });
    }, 5000);
  };

  //provider
  return (
    <alertsContext.Provider value={{ alert: state.alert, showAlert }}>
      {props.children}
    </alertsContext.Provider>
  );
};
export default AlertsState;
