import { createContext, ReactNode, useMemo } from "react";
import { Customer } from "../entities/Customer";
import { User as UserContextObject } from "../entities/User";
import { useLocalStorage } from "../hooks/use-local-storage";

interface AuthProviderProps {
  children: ReactNode | ReactNode[];
}

const initialUserState: UserContextObject = {
  user: null,
  accessToken: "",
  login: () => {},
  logout: () => {},
};
export const AuthContext = createContext(initialUserState);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useLocalStorage("user", null);

  const value = useMemo(() => {
    const login = async (data: UserContextObject) => {
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
