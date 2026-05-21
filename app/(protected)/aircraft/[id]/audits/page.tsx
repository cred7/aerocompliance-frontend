"use client";

import { useAircraftAuditLog } from "@/hooks/useAuditLogs";
import { useParams } from "next/navigation";

export default function AircraftAuditsPage() {
  const params = useParams();
  const aircraftId = Number(params.id);
  const { data, isLoading } = useAircraftAuditLog(aircraftId);

  if (!params.id || Number.isNaN(aircraftId)) {
    return <div>Invalid aircraft selected.</div>;
  }

  if (isLoading) {
    return <div>Loading audits...</div>;
  }

  const auditLogs = data ?? [];

  if (auditLogs.length === 0) {
    return <div>No audit logs found for this aircraft.</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Audit Logs</h2>

      {auditLogs.map((log: any) => (
        <div key={log.id} className="border rounded-xl p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
            <div>
              <p className="font-bold">{log.action}</p>
              <p className="text-sm text-gray-600">Model: {log.model_name}</p>
            </div>
            <div className="text-right">
              <p className="text-sm">Object ID: {log.object_id}</p>
              <p className="text-xs text-gray-500">
                {new Date(log.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
