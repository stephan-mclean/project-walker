import { createAction, handleActions } from "redux-actions";
import { createSelector } from "reselect";
import { routesRef, authRef } from "../../firebase";
import { Route } from "../models/route";

/**
 * Actions
 */
export const GET_ROUTES = createAction("GET_ROUTES");
export const GET_ROUTES_SUCCESS = createAction("GET_ROUTES_SUCCESS");
export const GET_ROUTES_FAILED = createAction("GET_ROUTES_FAILED");

/**
 * Reducer
 */
const defaultState = {
  items: [],
  loading: false,
  error: null
};
export default handleActions(
  {
    [GET_ROUTES]: state => ({
      ...state,
      loading: true,
      error: null
    }),
    [GET_ROUTES_SUCCESS]: (state, action) => ({
      ...state,
      loading: false,
      items: action.payload
    }),
    [GET_ROUTES_FAILED]: (state, action) => ({
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
export const getAllRoutes = () => dispatch => {
  const currentUser = authRef().currentUser;

  dispatch(GET_ROUTES());
  return routesRef
    .where("creator", "==", currentUser.uid)
    .get()
    .then(
      snapshot => {
        const routes = [];

        snapshot.forEach(route => {
          routes.push(new Route({ id: route.id, ...route.data() }));
        });

        dispatch(GET_ROUTES_SUCCESS(routes));
      },
      error => {
        dispatch(GET_ROUTES_FAILED(error));
      }
    );
};

/**
 * Selectors
 */
export const getSortedRoutes = createSelector(
  state => state.routes.items,
  routes => routes.sort((a, b) => b.dateAdded - a.dateAdded)
);
