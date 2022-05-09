import { useState } from "react";
import { AuthContext } from "containers/AuthContext";
import { User } from "models/User.model";
import { fakeAuthProvider } from "utils/fakeAuthProvider";

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const signin = (newUser: User, callback: VoidFunction) => {
    return fakeAuthProvider.signin(() => {
      localStorage.setItem("username", newUser.username);
      setUser(newUser);
      callback();
    });
  };

  const signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      localStorage.removeItem("username");
      setUser(null);
      callback();
    });
  };

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
