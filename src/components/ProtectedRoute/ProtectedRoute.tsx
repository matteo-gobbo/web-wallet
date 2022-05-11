import { useRevalidate } from "containers/Login/hooks";
import { Navigate, useLocation } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const revalidate = useRevalidate();

  if (!localStorage.getItem("username")) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  revalidate(localStorage.getItem("username")!);
  return children;
};

export default ProtectedRoute;
