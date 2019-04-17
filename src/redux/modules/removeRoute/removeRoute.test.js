import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as mockfirebase from "../../../firebase/__mocks__";

import reducer, {
  removeRoute,
  DELETE_ROUTE,
  DELETE_ROUTE_SUCCESS,
  DELETE_ROUTE_FAILURE
} from "./removeRoute";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock("../../../firebase", () => {
  return mockfirebase;
});

describe("Testing the remove route acions", () => {
  it("Should remove a route successfully", () => {
    const mockRouteID = "mock-route";
    const mockRoute = {
      title: "title",
      description: "description",
      id: mockRouteID
    };
    mockfirebase.routesRef.doc(mockRouteID).set(mockRoute);

    const expected = [DELETE_ROUTE(), DELETE_ROUTE_SUCCESS(mockRoute)];

    const store = mockStore({
      removeRoute: { loading: false, deleted: null, error: null }
    });

    mockfirebase.routesRef.autoFlush();
    return store.dispatch(removeRoute(mockRoute)).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });
});

describe("Testing the remove route reducer", () => {
  it("Should return the default state", () => {
    const expected = { loading: false, error: null, deleted: null };

    expect(reducer(undefined, {})).toEqual(expected);
  });

  it("Should handle DELETE_ROUTE", () => {
    const defaultState = { loading: false, error: null, deleted: null };
    const expected = { loading: true, error: null, deleted: null };

    expect(reducer(defaultState, DELETE_ROUTE())).toEqual(expected);
  });

  it("Should handle DELETE_ROUTE_SUCCESS", () => {
    const defaultState = { loading: true, error: null, deleted: null };
    const toDelete = { id: 1 };
    const expected = { loading: false, error: null, deleted: toDelete };

    expect(reducer(defaultState, DELETE_ROUTE_SUCCESS(toDelete))).toEqual(
      expected
    );
  });

  it("Should handle DELETE_ROUTE_FAILURE", () => {
    const defaultState = { loading: true, error: null, deleted: null };
    const err = new Error("err");
    const expected = { loading: false, error: err, deleted: null };

    expect(reducer(defaultState, DELETE_ROUTE_FAILURE(err))).toEqual(expected);
  });
});
