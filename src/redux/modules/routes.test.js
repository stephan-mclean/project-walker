import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as mockfirebase from "../../firebase/__mocks__";
import { GET_ROUTES, GET_ROUTES_SUCCESS, getAllRoutes } from "./routes";
import { Route } from "../models/route";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock("../../firebase", () => {
  return mockfirebase;
});

const mockCurrentUser = {
  uid: 1234567
};

describe("Testing routes actions", () => {
  beforeEach(() => {
    mockfirebase.authRef().changeAuthState(mockCurrentUser);
    mockfirebase.authRef().flush();
  });

  it("Should retrieve routes successfully", () => {
    const expected = [GET_ROUTES(), GET_ROUTES_SUCCESS([])];
    const store = mockStore({
      routes: { routes: [], loading: false, failed: false }
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
      routes: { routes: [], loading: false, failed: false }
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
      routes: { routes: [], loading: false, failed: false }
    });
    const expected = [GET_ROUTES(), GET_ROUTES_SUCCESS([])];

    mockfirebase.routesRef.add(mockRoute);
    mockfirebase.routesRef.autoFlush();
    return store.dispatch(getAllRoutes()).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });
});
