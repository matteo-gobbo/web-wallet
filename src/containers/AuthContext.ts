import { createContext } from "react";
import { User } from "models/User.model";

interface AuthContextType {
  user: User | null;
  signin: (user: User, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  signin: () => {},
  signout: () => {},
});
