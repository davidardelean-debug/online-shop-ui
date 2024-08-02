import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

interface ProtectedRouteProps {
  children: ReactNode | ReactNode[];
}
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const location = useLocation().pathname;

  if (!user && location !== "/login") {
    return <Navigate to="/login" replace />;
  } else if (user && location === "/login") {
    return <Navigate to="/products" replace />;
  }
  return children;
};
