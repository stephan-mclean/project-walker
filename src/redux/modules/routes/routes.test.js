import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as mockfirebase from "../../../firebase/__mocks__";
import reducer, {
  GET_ROUTES,
  GET_ROUTES_SUCCESS,
  getAllRoutes,
  getSortedRoutes,
  GET_ROUTES_FAILED
} from "./routes";
import { Route } from "../../models/route";

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

describe("Testing routes actions", () => {
  beforeEach(mockFirebaseAuth);

  it("Should retrieve routes successfully", () => {
    const expected = [GET_ROUTES(), GET_ROUTES_SUCCESS([])];
    const store = mockStore({
      routes: { items: [], loading: false, error: null }
    });

    mockfirebase.routesRef.autoFlush();
    return store.dispatch(getAllRoutes()).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });

  it("Should retrieve the correct data for each route", () => {
    const mockRoute = {
      title: "title",
      description: "description",
      creator: mockCurrentUser.uid,
      dateAdded: new Date()
    };
    const mockRouteID = "mock-route";
    const store = mockStore({
      routes: { items: [], loading: false, error: null }
    });
    const expected = [
      GET_ROUTES(),
      GET_ROUTES_SUCCESS([new Route({ id: mockRouteID, ...mockRoute })])
    ];

    mockfirebase.routesRef.doc(mockRouteID).set(mockRoute);
    mockfirebase.routesRef.autoFlush();
    return store.dispatch(getAllRoutes()).then(() => {
      expect(store.getActions()).toEqual(expected);
      mockfirebase.routesRef.doc(mockRouteID).delete();
    });
  });

  it("Should not retrieve routes for another user", () => {
    const mockRoute = new Route({
      title: "title",
      description: "description",
      creator: "someoneElse",
      dateAdded: new Date()
    });
    const store = mockStore({
      routes: { items: [], loading: false, error: null }
    });
    const expected = [GET_ROUTES(), GET_ROUTES_SUCCESS([])];

    mockfirebase.routesRef.add(mockRoute);
    mockfirebase.routesRef.autoFlush();
    return store.dispatch(getAllRoutes()).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });
});

describe("Testing the routes reducer", () => {
  it("Should return the default state", () => {
    const expected = {
      items: [],
      loading: false,
      error: null
    };

    expect(reducer(undefined, {})).toEqual(expected);
  });

  it("Should handle GET_ROUTES", () => {
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

    expect(reducer(defaultState, GET_ROUTES())).toEqual(expected);
  });

  it("Should handle GET_ROUTES_SUCCESS", () => {
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

    expect(reducer(defaultState, GET_ROUTES_SUCCESS([1, 2, 3]))).toEqual(
      expected
    );
  });

  it("Should handle GET_ROUTES_FAILED", () => {
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

    expect(reducer(defaultState, GET_ROUTES_FAILED(err))).toEqual(expected);
  });
});

describe("Testing the routes selector", () => {
  it("Should sort the routes by date added", () => {
    const routeOne = {
      dateAdded: new Date(1970, 1, 1)
    };
    const routeTwo = {
      dateAdded: new Date(1970, 1, 2)
    };

    const unsorted = [routeOne, routeTwo];
    const state = { routes: { items: unsorted } };
    const expected = [routeTwo, routeOne];

    expect(getSortedRoutes(state)).toEqual(expected);
  });
});
