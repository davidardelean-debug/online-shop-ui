import { CustomerRoles } from "./customer-roles";

export interface Customer {
  id?: string;

  firstName: string;

  lastName: string;

  username: string;

  emailAddress: string;

  password?: string;

  role: CustomerRoles;
}
