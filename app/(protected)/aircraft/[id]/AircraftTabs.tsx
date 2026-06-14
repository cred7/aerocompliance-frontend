"use client";

import Link from "next/link";

interface AircraftTabsProps {
  aircraftId: string | string[];
}

export default function AircraftTabs({ aircraftId }: AircraftTabsProps) {
  const basePath = `/aircraft/${Array.isArray(aircraftId) ? aircraftId[0] : aircraftId}`;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <nav className="flex flex-wrap gap-2">
        <Link
          href={basePath}
          className="rounded px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100"
        >
          Overview
        </Link>
        <Link
          href={`${basePath}/mel`}
          className="rounded px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100"
        >
          MEL
        </Link>
        <Link
          href={`${basePath}/ad`}
          className="rounded px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100"
        >
          AD
        </Link>
        <Link
          href={`${basePath}/amp`}
          className="rounded px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100"
        >
          AMP
        </Link>
        <Link
          href={`${basePath}/records`}
          className="rounded px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100"
        >
          Records
        </Link>
        <Link
          href={`${basePath}/audits`}
          className="rounded px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100"
        >
          Audits
        </Link>
      </nav>
    </div>
  );
}
