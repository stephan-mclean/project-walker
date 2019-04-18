import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as mockfirebase from "../../../firebase/__mocks__";
import reducer, {
  getAllTags,
  getSortedTags,
  GET_TAGS,
  GET_TAGS_SUCCESS,
  GET_TAGS_FAILURE
} from "./tags";
import { Tag } from "../../models/tag";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock("../../../firebase", () => {
  return mockfirebase;
});

const mockCurrentUser = {
  uid: 1234567
};

const mockFirebaseAuth = () => {
  mockfirebase.authRef().changeAuthState(mockCurrentUser);
  mockfirebase.authRef().flush();
};

describe("Testing tags actions", () => {
  beforeEach(mockFirebaseAuth);

  it("Should retrieve tags successfully", () => {
    const expected = [GET_TAGS(), GET_TAGS_SUCCESS([])];
    const store = mockStore({
      tags: { items: [], loading: false, error: null }
    });

    mockfirebase.tagsRef.autoFlush();
    return store.dispatch(getAllTags()).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });

  it("Should retrieve the correct data for each tag", () => {
    const mockTag = {
      tag: "one",
      text: "text",
      creator: mockCurrentUser.uid
    };
    const mockTagID = "mock-tag";
    const store = mockStore({
      tags: { items: [], loading: false, error: null }
    });
    const expected = [
      GET_TAGS(),
      GET_TAGS_SUCCESS([new Tag({ id: mockTagID, ...mockTag })])
    ];

    mockfirebase.tagsRef.doc(mockTagID).set(mockTag);
    mockfirebase.tagsRef.autoFlush();
    return store.dispatch(getAllTags()).then(() => {
      expect(store.getActions()).toEqual(expected);
      mockfirebase.tagsRef.doc(mockTagID).delete();
    });
  });

  it("Should not retrieve tags for another user", () => {
    const mockTag = new Tag({
      tag: "one",
      text: "text",
      creator: "someoneElse"
    });
    const store = mockStore({
      tags: { items: [], loading: false, error: null }
    });
    const expected = [GET_TAGS(), GET_TAGS_SUCCESS([])];

    mockfirebase.tagsRef.add(mockTag);
    mockfirebase.tagsRef.autoFlush();
    return store.dispatch(getAllTags()).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });
});

describe("Testing the tags reducer", () => {
  it("Should return the default state", () => {
    const expected = {
      items: [],
      loading: false,
      error: null
    };

    expect(reducer(undefined, {})).toEqual(expected);
  });

  it("Should handle GET_TAGS", () => {
    const defaultState = {
      items: [],
      loading: false,
      error: null
    };

    const expected = {
      items: [],
      loading: true,
      error: null
    };

    expect(reducer(defaultState, GET_TAGS())).toEqual(expected);
  });

  it("Should handle GET_TAGS_SUCCESS", () => {
    const defaultState = {
      items: [],
      loading: true,
      error: null
    };

    const expected = {
      items: [1, 2, 3],
      loading: false,
      error: null
    };

    expect(reducer(defaultState, GET_TAGS_SUCCESS([1, 2, 3]))).toEqual(
      expected
    );
  });

  it("Should handle GET_TAGS_FAILURE", () => {
    const defaultState = {
      items: [],
      loading: true,
      error: null
    };
    const err = new Error("msg");
    const expected = {
      items: [],
      loading: false,
      error: err
    };

    expect(reducer(defaultState, GET_TAGS_FAILURE(err))).toEqual(expected);
  });
});

describe("Testing the tags selector", () => {
  it("Should sort the tags by text", () => {
    const tagOne = {
      text: "b"
    };
    const tagTwo = {
      text: "a"
    };
    const tagThree = {
      text: "c"
    };

    const unsorted = [tagOne, tagTwo, tagThree];
    const state = { tags: { items: unsorted } };
    const expected = [tagTwo, tagOne, tagThree];

    expect(getSortedTags(state)).toEqual(expected);
  });

  it("Should handle equally sorted tags", () => {
    const tagOne = {
      text: "a"
    };
    const tagTwo = {
      text: "a"
    };

    const unsorted = [tagOne, tagTwo];
    const state = { tags: { items: unsorted } };
    const expected = [tagOne, tagTwo];

    expect(getSortedTags(state)).toEqual(expected);
  });
});
