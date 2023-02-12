import { onCloseDateModal, onOpenDateModal, uiSlice } from "../../src/store";

describe("prueba uiSlice", () => {
  test("should regresar esto por defecto", () => {
    expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy();
  });

  test("should cambiar isDateModalOpen correctamente", () => {
    let state = uiSlice.getInitialState();
    state = uiSlice.reducer(state, onOpenDateModal());
    expect(state.isDateModalOpen).toBeTruthy();

    state = uiSlice.reducer(state, onCloseDateModal());
    expect(state.isDateModalOpen).toBeFalsy();
  });
});
