import { createAction, handleActions } from "redux-actions";
import { authRef } from "../../firebase";
import { auth } from "firebase";

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
  authRef().onAuthStateChanged(user => {
    dispatch(GET_USER(user));
  });
};

export const signInAnonymously = () => () => {
  authRef().signInAnonymously();
};

const signInWithProvider = provider => {
  return authRef().signInWithPopup(provider);
};

export const signInWithFB = () => () => {
  const provider = new auth.FacebookAuthProvider();
  signInWithProvider(provider);
};

export const signInWithGoogle = () => () => {
  const provider = new auth.GoogleAuthProvider();
  signInWithProvider(provider);
};

const linkWithProvider = provider => {
  return auth().currentUser.linkWithPopup(provider);
};

export const linkWithFB = () => () => {
  const provider = new auth.FacebookAuthProvider();
  linkWithProvider(provider);
};

export const linkWithGoogle = () => () => {
  const provider = new auth.GoogleAuthProvider();
  linkWithProvider(provider);
};
