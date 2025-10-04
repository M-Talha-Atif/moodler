// src/modules/user/home/hooks/useHome.ts
import { useState, useEffect } from "react";
import { homeService, HomeData } from "../services/homeService";

export const useHome = () => {
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await homeService.getHomeData();
      setHomeData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load home data");
      console.error("Home data error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  return {
    homeData,
    loading,
    error,
    refetch: fetchHomeData,
  };
};