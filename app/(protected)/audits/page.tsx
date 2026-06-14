"use client";

import { useState } from "react";

import { Header } from "@/components/layout/header";
import { AuditFilters } from "@/features/audits/components/audit-filters";
import { AuditLogTable } from "@/features/audits/components/audit-log-table";
import { AuditPageHeader } from "@/features/audits/components/audit-page-header";
import { AuditTableSkeleton } from "@/features/audits/components/audit-table-skeleton";
import { useAuditLogs } from "@/features/audits/hooks/use-audit-logs";

export default function AuditsPage() {
  const [search, setSearch] = useState("");
  const [action, setAction] = useState("");
  const [aircraft, setAircraft] = useState("");

  const { data, isLoading, isError } = useAuditLogs({
    search: search || undefined,
    action: action || undefined,
    aircraftId: aircraft || undefined,
  });

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <AuditPageHeader />

          <AuditFilters
            search={search}
            action={action}
            aircraft={aircraft}
            onSearchChange={setSearch}
            onActionChange={setAction}
            onAircraftChange={setAircraft}
          />

          <div>
            {isLoading ? (
              <AuditTableSkeleton />
            ) : (
              <AuditLogTable data={data?.results ?? []} isError={isError} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
