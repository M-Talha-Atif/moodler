// src/modules/user/explore/hooks/useExplore.ts
import { useEffect, useState } from "react";
import { fetchExperiencesForUser } from "../services/exploreService";
import { Experience } from "@/modules/user/home/services/homeService";

export function useExplore(filters?: {
  search?: string;
  time?: string;
  tags?: string[];
}) {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        const data = await fetchExperiencesForUser(filters);
        if (mounted) setExperiences(data);
      } catch (err) {
        setError("Failed to load experiences");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [filters]);

  return { experiences, loading, error };
}
