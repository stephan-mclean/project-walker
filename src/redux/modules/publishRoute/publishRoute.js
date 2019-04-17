import { createAction, handleActions } from "redux-actions";
import uuid from "uuid";
import { routesRef, authRef } from "../../../firebase";
import { Route } from "../../models/route";

/**
 * Actions
 */
export const PUBLISH_ROUTE = createAction("PUBLISH_ROUTE");
export const PUBLISH_ROUTE_SUCCESS = createAction("PUBLISH_ROUTE_SUCCESS");
export const PUBLISH_ROUTE_FAILURE = createAction("PUBLISH_ROUTE_FAILURE");

/**
 * Reducer
 */
const defaultState = { loading: false, error: null, published: null };
export default handleActions(
  {
    [PUBLISH_ROUTE]: state => ({
      ...state,
      loading: true,
      error: null
    }),
    [PUBLISH_ROUTE_SUCCESS]: (state, action) => ({
      ...state,
      loading: false,
      published: action.payload
    }),
    [PUBLISH_ROUTE_FAILURE]: (state, action) => ({
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
export const publishRoute = route => dispatch => {
  dispatch(PUBLISH_ROUTE());

  const currentUser = authRef().currentUser;
  const id = route.id || uuid();
  const creator = currentUser.uid;
  delete route.id;
  route.dateAdded = route.dateAdded || new Date();
  return routesRef
    .doc(id)
    .set({ creator, ...route })
    .then(
      () => {
        const published = new Route({ creator, id, ...route });
        dispatch(PUBLISH_ROUTE_SUCCESS(published));
      },
      error => {
        dispatch(PUBLISH_ROUTE_FAILURE(error));
      }
    );
};
