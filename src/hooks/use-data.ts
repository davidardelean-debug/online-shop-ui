import { useEffect, useState } from "react";
import APIClient from "../services/api-client";
import { useAuth } from "./use-auth";

const useData = <T>(endpoint: string) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { accessToken } = useAuth();

  useEffect(() => {
    const apiClient = new APIClient(endpoint, accessToken);

    const controller = new AbortController();
    setLoading(true);
    apiClient
      .getAll({ signal: controller.signal })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [endpoint, accessToken]);

  return { data, error, isLoading };
};

export default useData;
