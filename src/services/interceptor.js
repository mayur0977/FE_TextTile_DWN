import { useContext, useEffect } from "react";
import axios from "axios";

import { showNotification } from "@mantine/notifications";

import { useNavigate } from "react-router-dom";
import authService from "./auth.service";
import { AuthContext } from "core/context";

function AuthInterceptor() {
  // We can set the default url also
  axios.defaults.baseURL = "";
  const navigate = useNavigate();
  const { setAuthData } = useContext(AuthContext);

  axios.interceptors.request.use(
    (req) => {
      const authDetail = authService.getAuthData();
      if (authDetail) {
        req.headers.Authorization = `Bearer ${authDetail.accessToken}`;
      }
      return req;
    },
    () => {}
  );

  const axiosResponseInterceptor = axios.interceptors.response.use(
    (res) => {
      const { status } = res;
      switch (status) {
        case 200:
          return Promise.resolve(res?.data);
        case 204:
          return Promise.resolve(res?.data);
        default:
          return Promise.resolve(res);
      }
    },
    async (error) => {
      console.log("Error", error.response);
      if (error.response.status === 400) {
        showNotification({
          id: "bad request",

          message: error.response.data.message,
          color: "red",
          styles: () => ({
            root: {
              marginTop: "2rem",
              padding: "1.2rem 0.5rem",
            },
            body: {
              paddingLeft: "1rem",
            },
          }),
        });
      } else if (error.response.status === 401) {
        localStorage.clear();
        setAuthData(null);
        showNotification({
          id: "unauthorized",

          message: error.response.data.message,
          color: "red",
          styles: () => ({
            root: {
              marginTop: "2rem",
              padding: "1.2rem 0.5rem",
            },
            body: {
              paddingLeft: "1rem",
            },
          }),
        });
        navigate("/");
      } else if (error.response.status === 500) {
        showNotification({
          id: "InternalServerError",
          message: "Internal server error",
          color: "red",
          styles: () => ({
            root: {
              marginTop: "2rem",
              padding: "1.2rem 0.5rem",
            },
          }),
        });
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    return () => {
      axios.interceptors.response.eject(axiosResponseInterceptor);
    };
  });
  return null;
}

export default AuthInterceptor;
