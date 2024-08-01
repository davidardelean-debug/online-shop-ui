import { Customer } from "./Customer";

export interface User {
  user: Customer | null;
  accessToken: string;
  login: (data: User) => void;
  logout: () => void;
}
