import { createAction, handleActions } from "redux-actions";
import { authRef } from "../../firebase";

/**
 * Actions
 */
export const GET_USER = createAction("GET_USER");
export const GET_USER_FAILED = createAction("GET_USER_FAILED");
export const LINK_ACCOUNT = createAction("LINK_ACCOUNT");
export const LINK_ACCOUNT_FAILED = createAction("LINK_ACCOUNT_FAILED");

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
      getUserError: action.payload,
      linkAccountError: null
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
  return authRef().onAuthStateChanged(
    user => {
      dispatch(GET_USER(user));
    },
    error => {
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

export const signInWithGoogle = () => () => {
  const provider = new authRef.GoogleAuthProvider();
  signInWithProvider(provider);
};

const linkWithProvider = provider => dispatch => {
  return authRef()
    .currentUser.linkWithPopup(provider)
    .then(
      () => {
        dispatch(LINK_ACCOUNT());
      },
      error => {
        dispatch(LINK_ACCOUNT_FAILED(error));
      }
    );
};

export const linkWithGoogle = () => dispatch => {
  const provider = new authRef.GoogleAuthProvider();
  return dispatch(linkWithProvider(provider));
};

export const signOut = () => () => {
  authRef().signOut();
};
