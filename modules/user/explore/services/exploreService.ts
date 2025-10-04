// src/modules/user/explore/services/exploreService.ts - OPTIMIZED
import api from "@/services/apiClient";
import { Experience } from "@/types/experience";

export interface FetchExperiencesParams {
  page?: number;
  limit?: number;
  search?: string;
  culture?: string; // Single value instead of array
  emotion?: string;
  outcome?: string;
  timeFilter?: string;
}

export interface ExploreResponse {
  data: Experience[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
  };
}

export async function fetchExperiencesForUser(
  params: FetchExperiencesParams = {}
): Promise<ExploreResponse> {
  const queryParams: Record<string, string> = {
    page: String(params.page ?? 1),
    limit: String(params.limit ?? 10), // Mobile friendly: 10 items
  };

  // Simple filter structure for mobile
  if (params.search?.trim()) {
    queryParams.search = params.search.trim();
  }
  if (params.timeFilter && params.timeFilter !== "anytime") {
    queryParams.timeFilter = params.timeFilter;
  }
  if (params.culture && params.culture !== "all") {
    queryParams.culture = params.culture;
  }
  if (params.outcome && params.outcome !== "all") {
    queryParams.outcome = params.outcome;
  }
  if (params.emotion && params.emotion !== "all") {
    queryParams.emotion = params.emotion;
  }

  const queryString = new URLSearchParams(queryParams).toString();
  const response = await api.get(`/user/experiences?${queryString}`);
  
  return response.data.data; // { data: [], meta: {} }
}