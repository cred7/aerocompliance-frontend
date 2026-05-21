import { ClipboardList } from "lucide-react";

export function AuditPageHeader() {
  return (
    <div className="border border-zinc-800 bg-zinc-950/70 p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-md border border-cyan-500/30 bg-cyan-500/10">
          <ClipboardList className="h-6 w-6 text-cyan-400" />
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-wide text-zinc-100">
            Operational Audit Logs
          </h1>

          <p className="mt-1 text-sm text-zinc-400">
            Immutable operational traceability and system forensic history.
          </p>
        </div>
      </div>
    </div>
  );
}
