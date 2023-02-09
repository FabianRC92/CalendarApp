import axios from "axios";
import { getEnv } from "../helpers";

const { VITE_API_URL } = getEnv();

const calendarAPI = axios.create({
  baseURL: VITE_API_URL,
});

calendarAPI.interceptors.request.use((c) => {
  c.headers = {
    ...c.headers,
    "x-token": localStorage.getItem("token"),
  };

  return c;
});

export default calendarAPI;
