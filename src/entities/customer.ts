import { CustomerRoles } from "./CustomerRoles";

export interface Customer {
  id?: string;

  firstName: string;

  lastName: string;

  username: string;

  emailAddress: string;

  role: CustomerRoles;
}
