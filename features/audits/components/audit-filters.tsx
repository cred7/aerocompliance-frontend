"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface AuditFiltersProps {
  search: string;
  action: string;
  aircraft: string;
  onSearchChange: (value: string) => void;
  onActionChange: (value: string) => void;
  onAircraftChange: (value: string) => void;
}

export function AuditFilters({
  search,
  action,
  aircraft,
  onSearchChange,
  onActionChange,
  onAircraftChange,
}: AuditFiltersProps) {
  return (
    <div className="grid gap-4 border border-zinc-800 bg-zinc-950/50 p-4 lg:grid-cols-4">
      <div className="relative lg:col-span-2">
        <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />

        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search aircraft, model, object id..."
          className="border-zinc-800 bg-zinc-900 pl-10 text-zinc-100"
        />
      </div>

      <Select
        value={action}
        onChange={(event) => onActionChange(event.target.value)}
        className="border-zinc-800 bg-zinc-900 text-zinc-100"
      >
        <option value="">All Actions</option>
        <option value="CREATE">CREATE</option>
        <option value="UPDATE">UPDATE</option>
        <option value="DELETE">DELETE</option>
        <option value="LOGIN">LOGIN</option>
        <option value="LOGOUT">LOGOUT</option>
      </Select>

      <Input
        value={aircraft}
        onChange={(event) => onAircraftChange(event.target.value)}
        placeholder="Aircraft Registration"
        className="border-zinc-800 bg-zinc-900 text-zinc-100"
      />
    </div>
  );
}
