import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { AuditLog } from "@/types";

export function useAuditLogs(filters?: {
  aircraftId?: number;
  userId?: number;
  action?: string;
  modelName?: string;
}) {
  let url = endpoints.audits.logs;
  
  if (filters?.aircraftId) {
    url = endpoints.audits.byAircraft(filters.aircraftId);
  } else if (filters?.userId) {
    url = endpoints.audits.byUser(filters.userId);
  } else if (filters?.action) {
    url = `${endpoints.audits.logs}?action=${filters.action}`;
  } else if (filters?.modelName) {
    url = endpoints.audits.byModel(filters.modelName);
  }

  return useQuery({
    queryKey: ["audit-logs", filters],
    queryFn: async () => {
      const res = await api.get(url);
      return res.data as AuditLog[];
    },
  });
}

export function useAuditLog(id: number) {
  return useQuery({
    queryKey: ["audit-log", id],
    queryFn: async () => {
      const res = await api.get(endpoints.audits.logDetail(id));
      return res.data as AuditLog;
    },
  });
}

export function useAircraftAuditLog(aircraftId: number) {
  return useQuery({
    queryKey: ["aircraft-audit-log", aircraftId],
    queryFn: async () => {
      const res = await api.get(endpoints.audits.byAircraft(aircraftId));
      return res.data as AuditLog[];
    },
  });
}

export function useUserAuditLog(userId: number) {
  return useQuery({
    queryKey: ["user-audit-log", userId],
    queryFn: async () => {
      const res = await api.get(endpoints.audits.byUser(userId));
      return res.data as AuditLog[];
    },
  });
}
