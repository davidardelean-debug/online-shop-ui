import { Customer } from "./Customer";

export interface UserContextObject {
  user: Customer;
  accessToken: string;
  login: (data: UserContextObject) => void;
  logout: () => void;
}
