import { Customer } from "./Customer";

export interface AuthState {
  user: Customer | null;
  accessToken: string | null;
}
