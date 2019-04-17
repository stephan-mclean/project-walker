import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as mockfirebase from "../../../firebase/__mocks__";
import reducer, {
  publishRoute,
  PUBLISH_ROUTE,
  PUBLISH_ROUTE_SUCCESS,
  PUBLISH_ROUTE_FAILURE
} from "./publishRoute";
import { Route } from "../../models/route";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let mockID = 0;
jest.mock("uuid", () => {
  return () => ++mockID;
});

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

describe("Testing the publish route actions", () => {
  beforeEach(mockFirebaseAuth);

  it("Should publish a route successfully", () => {
    const toPublish = {
      title: "title",
      description: "description",
      dateAdded: new Date()
    };

    const expectedRoute = new Route({
      title: toPublish.title,
      description: toPublish.description,
      dateAdded: toPublish.dateAdded,
      creator: mockCurrentUser.uid,
      id: mockID + 1
    });

    const expected = [PUBLISH_ROUTE(), PUBLISH_ROUTE_SUCCESS(expectedRoute)];

    const store = mockStore({
      publishRoute: { published: null, loading: false, error: null }
    });

    mockfirebase.routesRef.autoFlush();
    return store.dispatch(publishRoute(toPublish)).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });
});

describe("Testing the publish route reducer", () => {
  it("Should return the default state", () => {
    const expected = { loading: false, error: null, published: null };

    expect(reducer(undefined, {})).toEqual(expected);
  });

  it("Should handle PUBLISH_ROUTE", () => {
    const defaultState = { loading: false, error: null, published: null };
    const expected = { loading: true, error: null, published: null };

    expect(reducer(defaultState, PUBLISH_ROUTE())).toEqual(expected);
  });

  it("Should handle PUBLISH_ROUTE_SUCCESS", () => {
    const toPublish = {};
    const defaultState = { loading: true, error: null, published: null };
    const expected = { loading: false, error: null, published: toPublish };

    expect(reducer(defaultState, PUBLISH_ROUTE_SUCCESS(toPublish))).toEqual(
      expected
    );
  });

  it("Should handle PUBLISH_ROUTE_FAILURE", () => {
    const err = new Error("msg");
    const defaultState = { loading: true, error: null, published: null };
    const expected = { loading: false, error: err, published: null };

    expect(reducer(defaultState, PUBLISH_ROUTE_FAILURE(err))).toEqual(expected);
  });
});
