"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { JobData } from "ts-jobspy";
import { getDomain, removeUndefinedKeyValues } from "@/lib/utils";

export async function fetchJobs(key: Record<string, unknown>) {
  const filteredKey = removeUndefinedKeyValues(key);

  const params = new URLSearchParams(
    filteredKey as Record<string, string>,
  ).toString();

  return await axios.get<JobData[]>(`${getDomain()}/api/jobs?${params}`);
}

export function useJobs(key: Record<string, unknown>) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["jobs", key],
    queryFn: async () => {
      return await fetchJobs(key);
    },
    select: (data) => data.data,
    refetchOnWindowFocus: false,
    gcTime: 0,
    staleTime: 0,
  });

  return { data, isFetching, refetch };
}
