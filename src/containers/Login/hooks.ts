import { useAppDispatch } from "app/hooks";
import { login, logout } from "./slice";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  return () => dispatch(logout());
};

export const useLogin = () => {
  const dispatch = useAppDispatch();
  return (username: string) => dispatch(login(username));
};

export const useRevalidate = () => {
  const dispatch = useAppDispatch();
  return (username: string) => dispatch(login(username));
};
