"use client";

import { format } from "date-fns";

import { AuditLog } from "../types/audit.types";
import { AuditActionBadge } from "./audit-status-badge";

interface AuditLogTableProps {
  data: AuditLog[];
  isError: boolean;
}

export function AuditLogTable({ data, isError }: AuditLogTableProps) {
  if (isError) {
    return (
      <div className="border border-red-500/20 bg-red-500/5 p-6 text-sm text-red-400">
        Failed to load operational audit logs.
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="border border-gray-300 bg-gray-50 p-6 text-gray-600">
        No audit logs matched your filters.
      </div>
    );
  }

  return (
    <div className="overflow-hidden border border-zinc-800 bg-zinc-950/50">
      <div className="overflow-x-auto">
        <table className="w-full min-w-300 border-collapse">
          <thead className="bg-zinc-900">
            <tr className="border-b border-zinc-800">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Timestamp
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">
                User
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Aircraft
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Action
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Model
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Object ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Change Summary
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((log) => (
              <tr
                key={log.id}
                className="border-b border-zinc-900 transition-colors hover:bg-zinc-900/60"
              >
                <td className="whitespace-nowrap px-4 py-4 text-sm text-zinc-300">
                  {format(new Date(log.timestamp), "dd MMM yyyy HH:mm")}
                </td>
                <td className="px-4 py-4 text-sm text-zinc-100">
                  {log.user
                    ? `${log.user.first_name} ${log.user.last_name}`
                    : "System"}
                </td>
                <td className="px-4 py-4 text-sm font-medium tracking-wider text-cyan-400">
                  {log.aircraft?.registration ?? "N/A"}
                </td>
                <td className="px-4 py-4">
                  <AuditActionBadge action={log.action} />
                </td>
                <td className="px-4 py-4 text-sm text-zinc-300">{log.model}</td>
                <td className="px-4 py-4 font-mono text-xs text-zinc-400">
                  {log.object_id}
                </td>
                <td className="max-w-105 px-4 py-4 text-sm text-zinc-400">
                  {renderChangeSummary(log.before, log.after)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function renderChangeSummary(
  before: Record<string, unknown> | null,
  after: Record<string, unknown> | null,
) {
  if (!before && after) {
    return "Operational record created.";
  }

  if (before && !after) {
    return "Operational record deleted.";
  }

  if (before && after) {
    const changedFields = Object.keys(after).filter(
      (key) => before[key] !== after[key],
    );

    if (!changedFields.length) {
      return "No detectable field modifications.";
    }

    return `Modified fields: ${changedFields.join(", ")}`;
  }

  return "No operational delta available.";
}
