import { createContext, ReactNode, useMemo } from "react";
import { Customer } from "../entities/Customer";
import { UserContextObject } from "../entities/UserContextObject";
import { useLocalStorage } from "../hooks/use-local-storage";

interface AuthProviderProps {
  children: ReactNode | ReactNode[];
}

export const AuthContext = createContext({} as UserContextObject);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useLocalStorage("user", null);

  const value = useMemo(() => {
    const login = (data: UserContextObject) => {
      setCurrentUser(data);
    };

    const logout = () => {
      setCurrentUser(null);
    };

    return {
      user: currentUser?.user as Customer,
      login,
      logout,
      accessToken: currentUser?.accessToken,
    } as UserContextObject;
  }, [currentUser, setCurrentUser]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
