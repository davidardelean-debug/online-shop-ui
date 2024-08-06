import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../../store";

interface ProtectedRouteProps {
  children: ReactNode | ReactNode[];
}
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const location = useLocation().pathname;

  if (!user && location !== "/login") {
    return <Navigate to="/login" replace />;
  } else if (user && location === "/login") {
    return <Navigate to="/products" replace />;
  }
  return children;
};
