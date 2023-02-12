import { useDispatch, useSelector } from "react-redux";
import calendarAPI from "../api/calendarAPI";
import { onCheckin, onLogin, onLogout, onLogoutCalendar } from "../store";

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { status, user, errorMessage } = useSelector((state) => state.auth);

  const startLogin = async ({ loginEmail, loginPassword }) => {
    try {
      dispatch(onCheckin());
      const { data } = await calendarAPI.post("/auth", {
        email: loginEmail,
        password: loginPassword,
      });

      localStorage.setItem("token", data.token);

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout("Credenciales incorrectas"));
    }
  };

  const registerUser = async ({
    registerName,
    registerEmail,
    registerPassword,
  }) => {
    try {
      const { data } = await calendarAPI.post("/auth/new", {
        name: registerName,
        password: registerPassword,
        email: registerEmail,
      });
      localStorage.setItem("token", data.token);
      dispatch( onLogin({ name: data.name, uid: data.uid }) );
    } catch (error) {
      dispatch(
        onLogout(
          error.response.data?.msg ||
            JSON.stringify(error.response.data?.errors) ||
            "Error registrando"
        )
      );
    }
  };

  const checkAuthToken = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return dispatch(onLogout());

      const { data } = await calendarAPI.get("/auth/renew");
      localStorage.setItem("token", data.token);
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
    dispatch(onLogoutCalendar());
  };

  return {
    status,
    user,
    errorMessage,

    startLogin,
    registerUser,
    checkAuthToken,
    startLogout,
  };
};
