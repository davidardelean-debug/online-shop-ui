import { Customer } from "./Customer";

export interface UserContextObject {
  user: Customer | null;
  accessToken: string;
  login: (data: UserContextObject) => void;
  logout: () => void;
}
