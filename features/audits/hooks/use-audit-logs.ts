"use client";

import { useQuery } from "@tanstack/react-query";

import { getAuditLogs } from "../api/get-audit-logs";

interface UseAuditLogsParams {
  search?: string;
  aircraftId?: string;
  action?: string;
  page?: number;
}

export function useAuditLogs(params?: UseAuditLogsParams) {
  return useQuery({
    queryKey: ["audit-logs", params],

    queryFn: () => getAuditLogs(params),

    refetchInterval: 30000,

    staleTime: 15000,
  });
}
