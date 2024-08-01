import { UUID } from "crypto";
import { BASE_API_URL } from "../constants";

class APIClient {
  private baseUrl = BASE_API_URL;
  private accessHeader: string;
  constructor(private endpoint: string, accessToken: string) {
    this.endpoint = endpoint;
    this.accessHeader = `Bearer ${accessToken}`;
  }

  getAll = async (config?: RequestInit) => {
    const response = await fetch(this.baseUrl + this.endpoint, {
      headers: {
        Authorization: this.accessHeader,
      },
      ...config,
    });
    if (!response.ok) throw new Error(`HTTP error: ${response.statusText}`);
    return response;
  };

  get = async (id?: string | number | UUID, config?: RequestInit) => {
    const response = await fetch(this.baseUrl + this.endpoint + id, {
      headers: {
        Authorization: this.accessHeader,
      },
      ...config,
    });
    if (!response.ok) throw new Error(`HTTP error: ${response.statusText}`);
    return response;
  };

  remove = async (id?: string | number | UUID, config?: RequestInit) => {
    const response = await fetch(this.baseUrl + this.endpoint + id, {
      headers: {
        Authorization: this.accessHeader,
      },
      ...config,
      method: "DELETE",
    });
    if (!response.ok) throw new Error(`HTTP error: ${response.statusText}`);
    return response;
  };

  update = async <T>(
    id: string | number | UUID,
    body: T,
    config?: RequestInit
  ) => {
    const response = await fetch(this.baseUrl + this.endpoint + id, {
      method: "PUT",
      headers: {
        Authorization: this.accessHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      ...config,
    });
    if (!response.ok) throw new Error(`HTTP error: ${response.statusText}`);
    return response;
  };

  add = async <T>(body: T, config?: RequestInit) => {
    const response = await fetch(this.baseUrl + this.endpoint, {
      method: "POST",
      headers: {
        Authorization: this.accessHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      ...config,
    });
    if (!response.ok) throw new Error(`HTTP error: ${response.statusText}`);
    return response;
  };
}
export default APIClient;
