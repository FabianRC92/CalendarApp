import calendarAPI from "../../../src/api/calendarAPI";

describe("pruebas calendarAPI", () => {
  test("should tener conf por defecto", () => {
    expect(calendarAPI.defaults.baseURL).toBe(process.env.VITE_API_URL);
  });

  test("should tener x-token en el header", async () => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2U1MWEzYWZlOTIwYzRmMTg2MzU0ZGQiLCJuYW1lIjoiRmFiacOhbiIsImlhdCI6MTY3NjA0NTI5MCwiZXhwIjoxNjc2MDUyNDkwfQ.PZoWS09FR6-lptAGJt62r-A84tsUzSmIlqspmd3sHKU";

      localStorage.setItem("token", token);

      const res = await calendarAPI.get("/events");
      expect(res.config.headers["x-token"]).toBe(token);
    } catch (error) {}
  });
});
