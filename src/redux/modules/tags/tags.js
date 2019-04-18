import { createAction, handleActions } from "redux-actions";
import { createSelector } from "reselect";
import { tagsRef, authRef } from "../../../firebase";
import { Tag } from "../../models/tag";

/**
 * Actions
 */
export const GET_TAGS = createAction("GET_TAGS");
export const GET_TAGS_SUCCESS = createAction("GET_TAGS_SUCCESS");
export const GET_TAGS_FAILURE = createAction("GET_TAGS_FAILURE");

/**
 * Reducer
 */
const defaultState = { items: [], loading: false, error: null };
export default handleActions(
  {
    [GET_TAGS]: state => ({
      ...state,
      loading: true,
      error: null
    }),
    [GET_TAGS_SUCCESS]: (state, action) => ({
      ...state,
      items: action.payload,
      loading: false
    }),
    [GET_TAGS_FAILURE]: (state, action) => ({
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
export const getAllTags = () => dispatch => {
  const currentUser = authRef().currentUser;

  dispatch(GET_TAGS());
  return tagsRef
    .where("creator", "==", currentUser.uid)
    .get()
    .then(
      snapshot => {
        const tags = [];

        snapshot.forEach(tag => {
          tags.push(new Tag({ id: tag.id, ...tag.data() }));
        });

        dispatch(GET_TAGS_SUCCESS(tags));
      },
      error => {
        dispatch(GET_TAGS_FAILURE(error));
      }
    );
};

/**
 * Selectors
 */
export const getSortedTags = createSelector(
  state => state.tags.items,
  tags =>
    tags.sort((a, b) => {
      if (a.text > b.text) {
        return 1;
      } else if (a.text < b.text) {
        return -1;
      }
      return 0;
    })
);
