import axios from "axios";

const loginUser = (values) => {
  return axios.post("http://127.0.0.1:5000/api/user/login", values);
};
const signUpSupplier = (values) => {
  return axios.post("http://127.0.0.1:5000/api/user/signup", values);
};

const setAuthData = (value) => {
  if (value) {
    localStorage.setItem("authData", JSON.stringify(value));
  }
};

/**
 * It is used to get Logged on user data from local storage
 * @returns IAuthData type of response
 */
const getAuthData = () => {
  const authData = localStorage.getItem("authData");
  if (authData) {
    return JSON.parse(authData);
  }
  return null;
};

const authService = { loginUser, signUpSupplier, setAuthData, getAuthData };

export default authService;
