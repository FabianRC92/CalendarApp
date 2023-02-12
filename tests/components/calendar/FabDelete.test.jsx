import { fireEvent, render, screen } from "@testing-library/react";

import { FabDelete } from "../../../src/calendar/components/FabADelete";
import { useCalendarStore } from "../../../src/hooks/useCalendarStore";

jest.mock("../../../src/hooks/useCalendarStore");

describe("pruebas fabdelete", () => {
  const mockDeleteEvent = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should mostrar componente correctamente", () => {
    useCalendarStore.mockReturnValue({
      activeEvent: false,
    });

    render(<FabDelete />);
    const button = screen.getByRole("button");
    expect(button.disabled).toBeTruthy();
  });

  test("should mostrar botón si hay evento activo", () => {
    useCalendarStore.mockReturnValue({
      activeEvent: true,
    });

    render(<FabDelete />);
    const button = screen.getByRole("button");
    expect(button.disabled).toBeFalsy();
  });

  test("should llamar deleteEvent si hay evento activo", () => {
    useCalendarStore.mockReturnValue({
      activeEvent: true,
      deleteEvent: mockDeleteEvent,
    });

    render(<FabDelete />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockDeleteEvent).toHaveBeenCalled();
  });
});
