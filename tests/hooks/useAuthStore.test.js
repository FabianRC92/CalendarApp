import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import calendarAPI from "../../src/api/calendarAPI";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { authSlice } from "../../src/store";
import {
  authenticatedState,
  initialState,
  notAuthenticatedState,
} from "../fixtures/aurh-state";
import {
  loginTestUserCredentials,
  registerUserCredentials,
  testUserCredentials,
} from "../fixtures/user-test";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    },
  });
};

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});

describe("pruebas authstore", () => {
  test("should regresar valores por defecto", () => {
    const mockStore = getMockStore({
      ...initialState,
    });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    expect(result.current).toEqual({
      status: "checkin",
      user: {},
      errorMessage: undefined,
      startLogin: expect.any(Function),
      registerUser: expect.any(Function),
      checkAuthToken: expect.any(Function),
      startLogout: expect.any(Function),
    });
  });

  test("should startLogin", async () => {
    const mockStore = getMockStore({
      ...notAuthenticatedState,
    });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(
      async () =>
        await result.current.startLogin({ ...loginTestUserCredentials })
    );

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({ ...authenticatedState });
    expect(localStorage.getItem("token")).toEqual(expect.any(String));
  });

  test("should startLogin falla", async () => {
    const mockStore = getMockStore({
      ...notAuthenticatedState,
    });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(
      async () =>
        await result.current.startLogin({
          loginEmail: "ja@ja.com",
          loginPassword: "1234556",
        })
    );

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      ...notAuthenticatedState,
      errorMessage: expect.any(String),
    });
    expect(localStorage.getItem("token")).toBeNull();
  });

  test("should registerUser fallar", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.registerUser(registerUserCredentials);
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: expect.any(String),
      status: "not-authenticated",
      user: {},
    });
  });

  test("should registerUser", async () => {
    const newUser = {
      email: "algo@google.com",
      password: "123456789",
      name: "Test User 2",
    };
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const spy = jest.spyOn(calendarAPI, "post").mockReturnValue({
      data: {
        ok: true,
        uid: "1263781293",
        name: "Test User",
        token: "ALGUN-TOKEN",
      },
    });

    await act(async () => {
      await result.current.registerUser(newUser);
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: { name: "Test User", uid: "1263781293" },
    });

    spy.mockRestore();
  });

  test("checkAuthToken fallar", async () => {
    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.checkAuthToken();
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      ...notAuthenticatedState,
    });

    expect(localStorage.getItem("token")).toBeNull();
  });

  test("checkAuthToken autenticar usuario", async () => {
    const { data } = await calendarAPI.post("/auth", testUserCredentials);

    localStorage.setItem("token", data.token);

    const mockStore = getMockStore({ ...authenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const spy = jest.spyOn(calendarAPI, "get").mockReturnValue({
      data: {
        ok: true,
        uid: "63e51a3afe920c4f186354dd",
        name: "Fabiána",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
      },
    });

    await act(async () => {
      await result.current.checkAuthToken();
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: { name: "Fabiána", uid: "63e51a3afe920c4f186354dd" },
    });

    spy.mockRestore();
  });
});
