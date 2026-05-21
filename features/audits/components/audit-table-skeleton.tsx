export function AuditTableSkeleton() {
  return (
    <div className="overflow-hidden border border-zinc-800 bg-zinc-950/50">
      <div className="animate-pulse space-y-3 p-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="h-14 rounded-md bg-zinc-900" />
        ))}
      </div>
    </div>
  );
}
