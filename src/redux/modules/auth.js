import { createAction, handleActions } from "redux-actions";
import { authRef } from "../../firebase";

/**
 * Actions
 */
const GET_USER = createAction("GET_USER");

/**
 * Reducer
 */
const defaultState = { currentUser: null };
export default handleActions(
  {
    [GET_USER]: (state, action) => ({
      ...state,
      currentUser: action.payload
    })
  },
  defaultState
);

/**
 * Action creators
 */
export const getCurrentUser = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    dispatch(GET_USER(user));
  });
};

export const signInAnonymously = () => () => {
  authRef.signInAnonymously();
};
