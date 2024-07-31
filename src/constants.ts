import { CustomerRoles } from "./entities/CustomerRoles";

export const FALLBACK_IMAGE = "src/assets/image-not-found.png";

export const BASE_API_URL = "http://localhost:3333/api/";

export const PRODUCTS_ENDPOINT = "products/";

export const ORDERS_ENDPOINT = "orders/";

export const PRODUCT_CATEGORY_ENDPOINT = "product-category/";

export const LOCATION = {
  id: "e918072a-0fdf-44e3-90dd-1be08ac5a670",
  name: "Magazin Bucuresti",
  address: {
    country: "Romania",
    city: "Bucuresti",
    streetAddress: "Piata Operei",
    county: "Sector 4",
  },
};

export const CUSTOMER = {
  firstName: "David",
  lastName: "Ardelean",
  username: "davidardelean",
  emailAddress: "david.ardelean@msg.group",
  role: CustomerRoles.ADMIN,
  id: "b5151d8c-d01e-4dab-9c62-1a88ce8c9369",
};
