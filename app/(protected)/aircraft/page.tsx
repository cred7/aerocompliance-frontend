"use client";

import { Header } from "@/components/layout/header";
import { SkeletonLoader } from "@/components/ui/skeleton-loader";
import { useAircraftList } from "@/hooks/useAircraft";
import Link from "next/link";
import { useState } from "react";

export default function AircraftPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: aircraft, isLoading } = useAircraftList();

  const filteredAircraft =
    aircraft?.filter(
      (item) =>
        item.tail_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.serial_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.aircraft_type_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
    ) ?? [];

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col gap-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black">Aircraft Fleet</h1>
              <p className="text-gray-600">
                Browse all aircraft and open the detail page for maintenance,
                MEL, and AD workflows.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/aircraft/new"
                className="inline-flex items-center justify-center rounded bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-900"
              >
                Add New Aircraft
              </Link>
            </div>
          </div>

          <div className="border border-gray-300 bg-gray-50 p-4">
            <input
              type="text"
              placeholder="Search by tail number, serial number, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white px-4 py-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <div className="border border-gray-300 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-gray-100 border-b border-gray-300">
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
                      Flight Hours
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
                  {filteredAircraft.length > 0 ? (
                    filteredAircraft.map((item) => (
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
                        <td className="px-4 py-4 text-black">
                          {item.total_flight_hours}
                        </td>
                        <td className="px-4 py-4 text-black">
                          <span className="text-xs font-semibold text-black">
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-black">
                          <Link
                            href={`/aircraft/${item.id}`}
                            className="underline hover:text-gray-700"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-8 text-center text-gray-600"
                      >
                        No aircraft found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors = {
    AIRWORTHY: "text-green-500",
    RESTRICTED: "text-yellow-500",
    UNFIT: "text-red-500",
  };

  return (
    <span className={colors[status as keyof typeof colors]}>{status}</span>
  );
}
