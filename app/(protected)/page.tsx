"use client";

import { Header } from "@/components/layout/header";
import { SkeletonLoader } from "@/components/ui/skeleton-loader";
import { useAircraftList } from "@/hooks/useAircraft";
import { useFleetDashboard } from "@/hooks/useDashboard";
import Link from "next/link";

const quickLinks = [
  {
    href: "/aircraft",
    label: "Aircraft",
    description: "Fleet overview and aircraft details",
  },
  { href: "/audits", label: "Audits", description: "Audit trail and history" },
  {
    href: "/compliance",
    label: "Compliance",
    description: "Compliance snapshots and status",
  },
  {
    href: "/notifications",
    label: "Notifications",
    description: "Active notifications",
  },
  {
    href: "/records",
    label: "Records",
    description: "Document records and files",
  },
];

export default function DashboardPage() {
  const { data: dashboard, isLoading: dashLoading } = useFleetDashboard();
  const { data: aircraft, isLoading: aircraftLoading } = useAircraftList();
  const isLoading = dashLoading || aircraftLoading;

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="mb-10">
          <p className="text-sm uppercase tracking-[0.32em] text-gray-600">
            Protected Dashboard
          </p>
          <h1 className="mt-3 text-4xl font-bold text-black">
            AeroCompliance Fleet Control
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-gray-600">
            View the latest fleet metrics, then choose a protected page to
            manage aircraft, audits, compliance, notifications, or records.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3 mb-10">
          <StatCard label="Total Aircraft" value={dashboard?.fleet_size ?? 0} />
          <StatCard label="Airworthy" value={dashboard?.airworthy ?? 0} />
          <StatCard label="Restricted" value={dashboard?.restricted ?? 0} />
          <StatCard label="Unfit for Service" value={dashboard?.unfit ?? 0} />
          <StatCard label="Open MEL Items" value={dashboard?.mel_open ?? 0} />
          <StatCard
            label="Overdue MEL Items"
            value={dashboard?.mel_overdue ?? 0}
          />
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 mb-10">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group block border border-gray-300 bg-gray-50 p-6 text-black transition hover:border-black hover:bg-gray-100"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-700">
                {link.label}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 group-hover:text-black">
                {link.description}
              </p>
            </Link>
          ))}
        </section>

        <section className="border border-gray-300 bg-gray-50 p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-black">
                Recent Aircraft
              </h2>
              <p className="text-sm text-gray-600">
                Quick access to your latest fleet items.
              </p>
            </div>
            <Link
              href="/aircraft"
              className="text-sm font-semibold text-black hover:text-gray-700"
            >
              View all aircraft
            </Link>
          </div>

          {isLoading ? (
            <SkeletonLoader />
          ) : aircraft && aircraft.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-left text-sm">
                <thead className="bg-white border-b border-gray-300">
                  <tr>
                    <th className="px-4 py-4 font-semibold text-black">
                      Tail Number
                    </th>
                    <th className="px-4 py-4 font-semibold text-black">
                      Serial Number
                    </th>
                    <th className="px-4 py-4 font-semibold text-black">Type</th>
                    <th className="px-4 py-4 font-semibold text-black">
                      Operator
                    </th>
                    <th className="px-4 py-4 font-semibold text-black">
                      Status
                    </th>
                    <th className="px-4 py-4 font-semibold text-black">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {aircraft.slice(0, 6).map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-300 hover:bg-gray-100"
                    >
                      <td className="px-4 py-4 text-black">
                        {item.tail_number}
                      </td>
                      <td className="px-4 py-4 text-black font-mono">
                        {item.serial_number}
                      </td>
                      <td className="px-4 py-4 text-black">
                        {item.aircraft_type_name}
                      </td>
                      <td className="px-4 py-4 text-black">
                        {item.operator_name}
                      </td>
                      <td className="px-4 py-4 text-black">{item.status}</td>
                      <td className="px-4 py-4 text-black">
                        <Link
                          href={`/aircraft/${item.id}`}
                          className="underline hover:text-gray-700"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-8 text-center text-gray-600">
              No aircraft available
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: number;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="border border-gray-300 bg-white p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">
        {label}
      </p>
      <p className="mt-4 text-3xl font-bold text-black">{value}</p>
    </div>
  );
}
