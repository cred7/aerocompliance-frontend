"use client";

import { Header } from "@/components/layout/header";
import {
  useComplianceSnapshots,
  useRestrictedAircraft,
  useUnfitAircraft,
} from "@/hooks/useCompliance";
import { useState } from "react";

export default function CompliancePage() {
  const [aircraftFilter, setAircraftFilter] = useState("");
  const aircraftId = Number(aircraftFilter);

  const { data: snapshots, isLoading } = useComplianceSnapshots(
    Number.isNaN(aircraftId) ? undefined : aircraftId,
  );
  const { data: unfitAircraft } = useUnfitAircraft();
  const { data: restrictedAircraft } = useRestrictedAircraft();

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Compliance Snapshots</h1>
          <p className="text-sm text-gray-600">
            View compliance status for aircraft and search snapshots by aircraft
            ID.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="border border-gray-300 bg-gray-50 p-6">
            <p className="text-xs text-gray-500 uppercase">Unfit Aircraft</p>
            <p className="mt-3 text-3xl font-bold text-black">
              {unfitAircraft?.length ?? 0}
            </p>
          </div>
          <div className="border border-gray-300 bg-gray-50 p-6">
            <p className="text-xs text-gray-500 uppercase">
              Restricted Aircraft
            </p>
            <p className="mt-3 text-3xl font-bold text-black">
              {restrictedAircraft?.length ?? 0}
            </p>
          </div>
          <div className="border border-gray-300 bg-gray-50 p-6">
            <p className="text-xs text-gray-500 uppercase">
              Filtered By Aircraft
            </p>
            <p className="mt-3 text-3xl font-bold text-black">
              {aircraftFilter || "all"}
            </p>
          </div>
        </div>

        <div className="mb-8 border border-gray-300 bg-gray-50 p-6">
          <label className="block text-sm font-semibold text-black">
            Search by Aircraft ID
          </label>
          <input
            type="text"
            value={aircraftFilter}
            onChange={(event) => setAircraftFilter(event.target.value)}
            placeholder="Enter aircraft ID"
            className="mt-2 w-full border border-gray-300 bg-white px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {isLoading ? (
          <div className="border border-gray-300 bg-gray-50 p-6 text-gray-600">
            Loading compliance snapshots…
          </div>
        ) : snapshots && snapshots.length > 0 ? (
          <div className="overflow-x-auto border border-gray-300 bg-white">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-gray-100 border-b border-gray-300">
                <tr>
                  <th className="px-4 py-4 font-semibold text-black">
                    Aircraft ID
                  </th>
                  <th className="px-4 py-4 font-semibold text-black">
                    Snapshot Status
                  </th>
                  <th className="px-4 py-4 font-semibold text-black">
                    Last Evaluated
                  </th>
                  <th className="px-4 py-4 font-semibold text-black">AMP</th>
                  <th className="px-4 py-4 font-semibold text-black">MEL</th>
                  <th className="px-4 py-4 font-semibold text-black">AD</th>
                </tr>
              </thead>
              <tbody>
                {snapshots.map((snapshot) => (
                  <tr
                    key={snapshot.id}
                    className="border-b border-gray-300 hover:bg-gray-50"
                  >
                    <td className="px-4 py-4 text-black">
                      {snapshot.aircraft}
                    </td>
                    <td className="px-4 py-4 text-black">
                      {snapshot.overall_status}
                    </td>
                    <td className="px-4 py-4 text-black">
                      {new Date(snapshot.last_evaluated).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 text-black">
                      {snapshot.amp_status}
                    </td>
                    <td className="px-4 py-4 text-black">
                      {snapshot.mel_status}
                    </td>
                    <td className="px-4 py-4 text-black">
                      {snapshot.ad_status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="border border-gray-300 bg-gray-50 p-6 text-gray-600">
            No compliance snapshots found.
          </div>
        )}
      </main>
    </div>
  );
}
