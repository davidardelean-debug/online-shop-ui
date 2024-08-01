import { useContext } from "react";
import { UserContextObject } from "../entities/UserContextObject";
import { AuthContext } from "../providers/auth-provider";

export const useAuth = () => {
  return useContext<UserContextObject>(AuthContext);
};
