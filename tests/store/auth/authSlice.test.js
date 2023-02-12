import { authSlice, onLogin, onLogout } from "../../../src/store/auth/authSlice";
import {
  authenticatedState,
  initialState,
  notAuthenticatedState,
} from "../../fixtures/aurh-state";
import { testUserCredentials } from "../../fixtures/user-test";

describe("Pruebas authSlice", () => {
  test("should regresar estado inicial", () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });

  test("should realizar un login", () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredentials));

    expect(state).toEqual({
      status: authenticatedState.status,
      user: testUserCredentials,
      errorMessage: authenticatedState.errorMessage,
    });
  });

  test("should realizar logout", () => {
    const state = authSlice.reducer(authenticatedState, onLogout());

    expect(state).toEqual({
      status: notAuthenticatedState.status,
      user: {},
      errorMessage: undefined,
    });
  });

  test("should realizar logout con mensaje", () => {
    const errorMessage = "Error";
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));

    expect(state).toEqual({
      status: notAuthenticatedState.status,
      user: {},
      errorMessage: errorMessage,
    });
  });
});
