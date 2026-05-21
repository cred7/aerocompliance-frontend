import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";

import { AuditLogResponse } from "../types/audit.types";

interface GetAuditLogsParams {
  search?: string;
  aircraft?: string;
  action?: string;
  page?: number;
}

export async function getAuditLogs(
  params?: GetAuditLogsParams,
): Promise<AuditLogResponse> {
  const response = await api.get<AuditLogResponse>(endpoints.audits.logs, {
    params,
  });

  return response.data;
}
