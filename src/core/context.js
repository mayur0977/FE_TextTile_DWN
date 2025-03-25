import { createContext } from "react";

export const AuthContext = createContext({
  authData: null,
  setAuthData: () => {},
});
