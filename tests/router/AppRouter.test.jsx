import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CalendarPage } from "../../src/calendar";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { AppRouter } from "../../src/router/AppRouter";

jest.mock("../../src/hooks/useAuthStore");
jest.mock("../../src/calendar", () => ({
  CalendarPage: () => <h1>CalendarPage</h1>,
}));

describe("Prueba approuter", () => {
  const mockCheckAuthToken = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should mostrar pantalla carga y llamar checkAuthToken", () => {
    useAuthStore.mockReturnValue({
      status: "checkin",
      checkAuthToken: mockCheckAuthToken,
    });

    render(<AppRouter />);

    expect(screen.getByText("Cargando...")).toBeTruthy();
    expect(mockCheckAuthToken).toHaveBeenCalled();
  });

  test("should mostrar login en caso de no estar autenticado", () => {
    useAuthStore.mockReturnValue({
      status: "not-authenticated",
      checkAuthToken: mockCheckAuthToken,
    });

    const { container } = render(
      <MemoryRouter initialEntries={["/auth/algo"]}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText("Ingreso")).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test("should mostrar calendarPage", () => {
    useAuthStore.mockReturnValue({
      status: "authenticated",
      checkAuthToken: mockCheckAuthToken,
    });

    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText("CalendarPage")).toBeTruthy();
  });
});
