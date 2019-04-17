import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as mockfirebase from "../../../firebase/__mocks__";
import reducer, {
  getCurrentUser,
  signInAnonymously,
  linkWithGoogle,
  signInWithGoogle,
  signOut,
  GET_USER,
  LINK_ACCOUNT,
  LINK_ACCOUNT_FAILED,
  GET_USER_FAILED
} from "./auth";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock("../../../firebase", () => {
  return mockfirebase;
});

describe("Testing auth actions", () => {
  it("Should return detect if the current user has changed", () => {
    const expected = [GET_USER({})];

    const store = mockStore({ auth: { currentUser: null } });

    store.dispatch(getCurrentUser());

    mockfirebase.authRef().changeAuthState({});
    mockfirebase.authRef().flush();

    expect(store.getActions()).toEqual(expected);
  });

  it("Should allow the user to sign in anonymously", () => {
    const expected = [
      GET_USER({ isAnonymous: true }),
      GET_USER({ isAnonymous: true })
    ];

    const store = mockStore({ auth: { currentUser: null } });
    store.dispatch(signInAnonymously());
    store.dispatch(getCurrentUser());

    mockfirebase.authRef().flush();

    expect(store.getActions()).toEqual(expected);
  });

  it("Should allow the user to link a Google account", () => {
    const expected = [LINK_ACCOUNT()];
    const store = mockStore({ auth: { currentUser: null } });

    const mockUser = {
      linkWithPopup: () => {
        return new Promise(resolve => {
          resolve();
        });
      }
    };

    mockfirebase.authRef().changeAuthState(mockUser);
    mockfirebase.authRef().flush();

    return store.dispatch(linkWithGoogle()).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });

  it("Should handle failing to link an account", () => {
    const error = { message: "My error" };
    const expected = [LINK_ACCOUNT_FAILED(error)];
    const store = mockStore({ auth: { currentUser: null } });

    const mockUser = {
      linkWithPopup: () => {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    };

    mockfirebase.authRef().changeAuthState(mockUser);
    mockfirebase.authRef().flush();

    return store.dispatch(linkWithGoogle()).then(
      () => {},
      () => {
        expect(store.getActions()).toEqual(expected);
      }
    );
  });

  it("Should allow the user to sign out", () => {
    const expected = [GET_USER({}), GET_USER(null)];

    const store = mockStore({ auth: { currentUser: null } });

    store.dispatch(getCurrentUser());

    mockfirebase.authRef().changeAuthState({});

    store.dispatch(signOut());

    mockfirebase.authRef().flush();

    expect(store.getActions()).toEqual(expected);
  });

  it("Should allow the user to sign in with Google", () => {
    const expectedUser = {
      isAnonymous: false,
      providerData: [new mockfirebase.authRef.GoogleAuthProvider()]
    };
    const expected = [GET_USER(expectedUser)];

    const store = mockStore({ auth: { currentUser: null } });
    store.dispatch(getCurrentUser());

    store.dispatch(signInWithGoogle());
    mockfirebase.authRef().flush();
    expect(store.getActions()).toEqual(expected);
  });
});

describe("Testing the auth reducer", () => {
  it("Should return the default state", () => {
    const expected = {
      currentUser: null,
      getUserError: null,
      linkAccountError: null
    };

    expect(reducer(undefined, {})).toEqual(expected);
  });

  it("Should handle GET_USER", () => {
    const mockUser = { name: "something" };
    const expected = {
      currentUser: mockUser,
      getUserError: null,
      linkAccountError: null
    };

    expect(reducer(undefined, GET_USER(mockUser))).toEqual(expected);
  });

  it("Should handle GET_USER_FAILED", () => {
    const err = { message: "err" };
    const defaultState = {
      currentUser: { name: "user" },
      getUserError: null,
      linkAccountError: null
    };

    const expected = {
      currentUser: null,
      getUserError: err,
      linkAccountError: null
    };

    expect(reducer(defaultState, GET_USER_FAILED(err))).toEqual(expected);
  });

  it("Should handle LINK_ACCOUNT", () => {
    const defaultState = {
      linkAccountError: {}
    };

    const expected = {
      linkAccountError: null
    };

    expect(reducer(defaultState, LINK_ACCOUNT())).toEqual(expected);
  });

  it("Should handle LINK_ACCOUNT_FAILED", () => {
    const err = { message: "err" };
    const defaultState = {
      linkAccountError: null
    };

    const expected = {
      linkAccountError: err
    };

    expect(reducer(defaultState, LINK_ACCOUNT_FAILED(err))).toEqual(expected);
  });
});
