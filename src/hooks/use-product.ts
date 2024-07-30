import { useEffect, useState } from "react";
import { PRODUCTS_ENDPOINT } from "../constants";
import Product from "../entities/Product";
import APIClient from "../services/api-client";

const useProduct = (id: string) => {
  const [data, setData] = useState<Product>();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const apiClient = new APIClient(PRODUCTS_ENDPOINT);
    const controller = new AbortController();
    setLoading(true);
    apiClient
      .get(id, { signal: controller.signal })
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
  }, [id]);

  return { data, error, isLoading };
};

export default useProduct;
