import { Customer } from "./Customer";

export interface AuthState {
  user?: Customer;
  accessToken?: string;
}
