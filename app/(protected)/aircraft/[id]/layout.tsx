"use client";

import { usePathname, useParams } from "next/navigation";
import AircraftTabs from "./AircraftTabs";

export default function AircraftLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const pathname = usePathname();
  const aircraftId = params?.id;

  if (!aircraftId) {
    return (
      <div className="min-h-screen bg-white text-black p-8">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-black">Aircraft page</h1>
          <p className="mt-2 text-gray-600">
            Aircraft ID is missing from the route. Please navigate from the
            aircraft list or use a valid aircraft URL.
          </p>
        </div>
      </div>
    );
  }

  const basePath = `/aircraft/${aircraftId}`;
  const isOverview = pathname === basePath || pathname === `${basePath}/`;

  return (
    <div className="space-y-6">
      {!isOverview && <AircraftTabs aircraftId={aircraftId} />}
      {children}
    </div>
  );
}
