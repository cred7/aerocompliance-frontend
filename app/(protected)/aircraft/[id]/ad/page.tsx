"use client";

import { useAd } from "@/features/ad/hooks/use-ad";
import { useParams } from "next/navigation";

export default function AircraftAdPage() {
  const params = useParams();
  const aircraftId = Number(params.id);
  const { data, isLoading } = useAd(aircraftId);

  if (!params.id || Number.isNaN(aircraftId)) {
    return <div>Invalid aircraft selected.</div>;
  }

  if (isLoading) {
    return <div>Loading AD...</div>;
  }

  const results = data ?? [];

  if (results.length === 0) {
    return <div>No active airworthiness directives.</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Airworthiness Directives</h2>

      {results.map((ad: any) => (
        <div key={ad.id} className="border rounded-xl p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <div>
              <p className="font-bold">{ad.ad_number}</p>
              <p className="text-sm text-gray-600">{ad.ad_title}</p>
            </div>

            <div className="text-right">
              <p className="font-semibold">{ad.status}</p>
              {ad.next_due_date && (
                <p className="text-sm text-gray-500">
                  Next due: {ad.next_due_date}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
