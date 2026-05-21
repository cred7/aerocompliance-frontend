"use client";

import { Header } from "@/components/layout/header";
import { SkeletonDetailPage } from "@/components/ui/skeleton-loader";
import AircraftTabs from "./AircraftTabs";
import { useAircraftDetail } from "@/hooks/useAircraft";
import { useParams } from "next/navigation";

export default function AircraftDetailPage() {
  const params = useParams();
  const aircraftId = Number(params.id);

  const { data: aircraft, isLoading } = useAircraftDetail(
    aircraftId,
    !Number.isNaN(aircraftId),
  );

  if (!params.id || Number.isNaN(aircraftId)) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-black">Invalid aircraft selected.</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {isLoading ? (
          <SkeletonDetailPage />
        ) : aircraft ? (
          <>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-black mb-2">
                {aircraft.tail_number}
              </h1>
              <p className="text-gray-600">
                {aircraft.aircraft_type_name} • {aircraft.operator_name}
              </p>
            </div>

            <AircraftTabs aircraftId={String(aircraftId)} />

            {/* Aircraft Information */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <InfoCard label="Serial Number" value={aircraft.serial_number} />
              <InfoCard
                label="Manufacture Date"
                value={aircraft.manufacture_date || "N/A"}
              />
              <InfoCard label="Status" value={aircraft.status} />
              <InfoCard
                label="Total Flight Hours"
                value={aircraft.total_flight_hours.toString()}
              />
              <InfoCard
                label="Total Flight Cycles"
                value={aircraft.total_flight_cycles.toString()}
              />
              <InfoCard
                label="Last Updated"
                value={new Date(aircraft.updated_at).toLocaleDateString()}
              />
            </div>

            {/* Compliance Status */}
            {aircraft.compliance_snapshot && (
              <div className="border border-gray-300 bg-gray-50 p-6 mb-8">
                <h2 className="text-lg font-bold text-black mb-4">
                  Compliance Status
                </h2>
                <div className="grid grid-cols-4 gap-4">
                  <StatusBadge
                    label="Overall"
                    value={aircraft.compliance_snapshot.overall_status}
                  />
                  <StatusBadge
                    label="AMP"
                    value={aircraft.compliance_snapshot.amp_status}
                  />
                  <StatusBadge
                    label="MEL"
                    value={aircraft.compliance_snapshot.mel_status}
                  />
                  <StatusBadge
                    label="AD"
                    value={aircraft.compliance_snapshot.ad_status}
                  />
                </div>
              </div>
            )}

            {/* Operational Summary */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              <SummaryCard
                label="Total MEL Items"
                value={aircraft.total_mel_items}
              />
              <SummaryCard
                label="Open MEL Items"
                value={aircraft.open_mel_items}
              />
              <SummaryCard
                label="Total AD Items"
                value={aircraft.total_ad_items}
              />
              <SummaryCard
                label="Overdue AD"
                value={aircraft.overdue_ad_items}
              />
            </div>

            {/* MEL Items */}
            {aircraft.mel_items && aircraft.mel_items.length > 0 && (
              <div className="border border-gray-300 mb-8">
                <div className="bg-gray-100 border-b border-gray-300 px-6 py-4">
                  <h2 className="text-lg font-bold text-black">
                    Minimum Equipment List
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-300">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-black">
                          Title
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-black">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-black">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-black">
                          Remaining Hours
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {aircraft.mel_items.map((item) => (
                        <tr
                          key={item.id}
                          className="border-b border-gray-300 hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 text-sm text-black">
                            {item.title}
                          </td>
                          <td className="px-6 py-4 text-sm text-black">
                            {item.category}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-900 text-xs font-semibold">
                              {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-black">
                            {item.remaining_hours.toFixed(1)} hrs
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* AD Compliances */}
            {aircraft.ad_compliances && aircraft.ad_compliances.length > 0 && (
              <div className="border border-gray-300 mb-8">
                <div className="bg-gray-100 border-b border-gray-300 px-6 py-4">
                  <h2 className="text-lg font-bold text-black">
                    Airworthiness Directives
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-300">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-black">
                          AD Number
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-black">
                          Title
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-black">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-black">
                          Next Due
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {aircraft.ad_compliances.map((item) => (
                        <tr
                          key={item.id}
                          className="border-b border-gray-300 hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 text-sm text-black font-mono">
                            {item.ad_number}
                          </td>
                          <td className="px-6 py-4 text-sm text-black">
                            {item.ad_title}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <span
                              className={`px-2 py-1 text-xs font-semibold ${
                                item.status === "COMPLIANT"
                                  ? "bg-green-100 text-green-900"
                                  : item.status === "OVERDUE"
                                    ? "bg-red-100 text-red-900"
                                    : "bg-yellow-100 text-yellow-900"
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-black">
                            {item.next_due_date || "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Maintenance Tasks */}
            {aircraft.maintenance_tasks &&
              aircraft.maintenance_tasks.length > 0 && (
                <div className="border border-gray-300">
                  <div className="bg-gray-100 border-b border-gray-300 px-6 py-4">
                    <h2 className="text-lg font-bold text-black">
                      Maintenance Tasks
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-300">
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-black">
                            Title
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-black">
                            Interval
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-black">
                            Last Performed
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-black">
                            Active
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {aircraft.maintenance_tasks.map((task) => (
                          <tr
                            key={task.id}
                            className="border-b border-gray-300 hover:bg-gray-50"
                          >
                            <td className="px-6 py-4 text-sm text-black">
                              {task.title}
                            </td>
                            <td className="px-6 py-4 text-sm text-black">
                              {task.interval_value} {task.interval_type}
                            </td>
                            <td className="px-6 py-4 text-sm text-black">
                              {task.last_performed_date || "Never"}
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <span
                                className={`px-2 py-1 text-xs font-semibold ${
                                  task.is_active
                                    ? "bg-green-100 text-green-900"
                                    : "bg-gray-200 text-gray-700"
                                }`}
                              >
                                {task.is_active ? "Yes" : "No"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
          </>
        ) : null}
      </main>
    </div>
  );
}

interface InfoCardProps {
  label: string;
  value: string;
}

function InfoCard({ label, value }: InfoCardProps) {
  return (
    <div className="border border-gray-300 bg-gray-50 p-4">
      <p className="text-xs font-semibold text-gray-600 mb-1">{label}</p>
      <p className="text-lg font-bold text-black">{value}</p>
    </div>
  );
}

interface StatusBadgeProps {
  label: string;
  value: string;
}

function StatusBadge({ label, value }: StatusBadgeProps) {
  const bgClasses: Record<string, string> = {
    AIRWORTHY: "bg-green-100 text-green-900",
    RESTRICTED: "bg-yellow-100 text-yellow-900",
    UNFIT: "bg-red-100 text-red-900",
  };

  return (
    <div className="border border-gray-300 bg-white p-4">
      <p className="text-xs font-semibold text-gray-600 mb-2">{label}</p>
      <span
        className={`px-3 py-1 text-sm font-bold ${bgClasses[value] || "bg-gray-200 text-gray-900"}`}
      >
        {value}
      </span>
    </div>
  );
}

interface SummaryCardProps {
  label: string;
  value: number;
}

function SummaryCard({ label, value }: SummaryCardProps) {
  return (
    <div className="border border-gray-300 bg-gray-50 p-4">
      <p className="text-xs font-semibold text-gray-600 mb-2">{label}</p>
      <p className="text-3xl font-bold text-black">{value}</p>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: any }) {
  return (
    <div className="border rounded-xl p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
