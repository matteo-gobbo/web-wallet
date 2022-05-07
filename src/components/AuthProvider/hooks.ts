import { useContext } from "react";
import { AuthContext } from "containers/AuthContext";

export const useAuth = () => {
  return useContext(AuthContext);
};
