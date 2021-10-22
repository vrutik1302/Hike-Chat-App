import { ActionTypes } from "../constants";

const initialState = {
  user: null,
  loading: true,
};

const { SET_USER, LOGOUT_USER } = ActionTypes;

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return { ...state, user: payload, loading: false };

    case LOGOUT_USER:
      return { user: null };

    default:
      return state;
  }
};
