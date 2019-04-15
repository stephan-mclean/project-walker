import { createAction, handleActions } from "redux-actions";
import { authRef } from "../../firebase";
import { auth } from "firebase";

/**
 * Actions
 */
const GET_USER = createAction("GET_USER");
const GET_USER_FAILED = createAction("GET_USER_FAILED");
const LINK_ACCOUNT = createAction("LINK_ACCOUNT");
const LINK_ACCOUNT_FAILED = createAction("LINK_ACCOUNT_FAILED");

/**
 * Reducer
 */
const defaultState = {
  currentUser: null,
  getUserError: null,
  linkAccountError: null
};
export default handleActions(
  {
    [GET_USER]: (state, action) => ({
      ...state,
      currentUser: action.payload
    }),
    [GET_USER_FAILED]: (state, action) => ({
      currentUser: null,
      getUserError: action.payload
    }),
    [LINK_ACCOUNT]: state => ({
      ...state,
      linkAccountError: null
    }),
    [LINK_ACCOUNT_FAILED]: (state, action) => ({
      ...state,
      linkAccountError: action.payload
    })
  },
  defaultState
);

/**
 * Action creators
 */
export const getCurrentUser = () => dispatch => {
  console.log("get current user");
  authRef().onAuthStateChanged(
    user => {
      console.log("dispatch current user", user);
      dispatch(GET_USER(user));
    },
    error => {
      console.error(error);
      dispatch(GET_USER_FAILED(error));
    }
  );
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

const linkWithProvider = provider => dispatch => {
  return auth()
    .currentUser.linkWithPopup(provider)
    .then(
      () => {
        dispatch(LINK_ACCOUNT());
      },
      error => {
        console.error(error);
        dispatch(LINK_ACCOUNT_FAILED(error));
      }
    );
};

export const linkWithFB = () => dispatch => {
  const provider = new auth.FacebookAuthProvider();
  dispatch(linkWithProvider(provider));
};

export const linkWithGoogle = () => dispatch => {
  const provider = new auth.GoogleAuthProvider();
  dispatch(linkWithProvider(provider));
};

export const signOut = () => () => {
  authRef().signOut();
};
