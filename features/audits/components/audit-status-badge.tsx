import { cn } from "@/lib/utils";

interface Props {
  action: string;
}

const styles: Record<string, string> = {
  CREATE: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",

  UPDATE: "border-amber-500/30 bg-amber-500/10 text-amber-400",

  DELETE: "border-red-500/30 bg-red-500/10 text-red-400",

  LOGIN: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",

  LOGOUT: "border-zinc-500/30 bg-zinc-500/10 text-zinc-300",
};

export function AuditActionBadge({ action }: Props) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-sm border px-2 py-1 text-xs font-semibold tracking-wide",
        styles[action] ?? "border-zinc-700 bg-zinc-800 text-zinc-300",
      )}
    >
      {action}
    </div>
  );
}
