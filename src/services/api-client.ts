import { UUID } from "crypto";
import { BASE_API_URL } from "../constants";

class APIClient {
  baseUrl = BASE_API_URL;
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (config?: RequestInit) => {
    const response = await fetch(this.baseUrl + this.endpoint, config);
    if (!response.ok) throw new Error(`HTTP error: ${response.statusText}`);
    return response;
  };

  get = async (id?: string | number | UUID, config?: RequestInit) => {
    const response = await fetch(this.baseUrl + this.endpoint + id, config);
    if (!response.ok) throw new Error(`HTTP error: ${response.statusText}`);
    return response;
  };

  remove = async (id?: string | number | UUID, config?: RequestInit) => {
    const response = await fetch(this.baseUrl + this.endpoint + id, {
      ...config,
      method: "DELETE",
    });
    if (!response.ok) throw new Error(`HTTP error: ${response.statusText}`);
    return response;
  };

  update = async <T>(
    id: string | number | UUID,
    body: T,
    config?: RequestInit,
  ) => {
    const response = await fetch(this.baseUrl + this.endpoint + id, {
      method: "PUT",
      headers: {
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
