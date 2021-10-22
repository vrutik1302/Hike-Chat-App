import { ActionTypes } from "../constants";
const { SET_USER, LOGOUT_USER } = ActionTypes;

export const setUsers = (users) => {
  return {
    type: SET_USER,
    payload: users,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};
