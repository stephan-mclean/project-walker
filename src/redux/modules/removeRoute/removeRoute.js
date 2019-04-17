import { createAction, handleActions } from "redux-actions";
import { routesRef } from "../../../firebase";

/**
 * Actions
 */
export const DELETE_ROUTE = createAction("DELETE_ROUTE");
export const DELETE_ROUTE_SUCCESS = createAction("DELETE_ROUTE_SUCCESS");
export const DELETE_ROUTE_FAILURE = createAction("DELETE_ROUTE_FAILURE");

/**
 * Reducer
 */
const defaultState = { loading: false, error: null, deleted: null };
export default handleActions(
  {
    [DELETE_ROUTE]: state => ({
      ...state,
      loading: true,
      error: null
    }),
    [DELETE_ROUTE_SUCCESS]: (state, action) => ({
      ...state,
      loading: false,
      deleted: action.payload
    }),
    [DELETE_ROUTE_FAILURE]: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload
    })
  },
  defaultState
);

/**
 * Action creators
 */
export const removeRoute = route => dispatch => {
  dispatch(DELETE_ROUTE());

  return routesRef
    .doc(route.id)
    .delete()
    .then(
      () => {
        dispatch(DELETE_ROUTE_SUCCESS(route));
      },
      error => {
        dispatch(DELETE_ROUTE_FAILURE(error));
      }
    );
};
