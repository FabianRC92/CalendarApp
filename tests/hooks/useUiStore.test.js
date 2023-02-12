import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { useUIStore } from "../../src/hooks/useUIStore";
import { store, uiSlice } from "../../src/store";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer,
    },
    preloadedState: {
      ui: { ...initialState },
    },
  });
};

describe("pruebas uiStore", () => {
  test("should regresar valores por defecto", () => {
    const mockStore = getMockStore({
      isDateModalOpen: false,
    });

    const { result } = renderHook(() => useUIStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    expect(result.current).toEqual({
      isDateModalOpen: false,
      openDateModal: expect.any(Function),
      closeDateModal: expect.any(Function),
      toggleModal: expect.any(Function),
    });
  });

  test("should openDateModal true", () => {
    const mockStore = getMockStore({
      isDateModalOpen: false,
    });

    const { result } = renderHook(() => useUIStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const { openDateModal } = result.current;

    act(() => openDateModal());

    expect(result.current.isDateModalOpen).toBeTruthy();
  });

  test("should closeDateModal true", () => {
    const mockStore = getMockStore({
      isDateModalOpen: true,
    });

    const { result } = renderHook(() => useUIStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const { closeDateModal } = result.current;

    act(() => closeDateModal());

    expect(result.current.isDateModalOpen).toBeFalsy();
  });

  test("should toggleModal true", () => {
    const mockStore = getMockStore({
      isDateModalOpen: false,
    });

    const { result } = renderHook(() => useUIStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const { toggleModal } = result.current;

    act(() => toggleModal());

    expect(result.current.isDateModalOpen).toBeTruthy();

    act(() => result.current.toggleModal());

    expect(result.current.isDateModalOpen).toBeFalsy();
  });
});
