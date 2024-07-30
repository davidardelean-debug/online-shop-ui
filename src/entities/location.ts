export interface Location {
  id: string;

  name: string;

  address: {
    country: string;

    city: string;

    county: string;

    streetAddress: string;
  };
}
