"use client";

import { useAircraftDocuments } from "@/hooks/useRecords";
import { useParams } from "next/navigation";

export default function AircraftRecordsPage() {
  const params = useParams();
  const aircraftId = Number(params.id);
  const { data, isLoading } = useAircraftDocuments(aircraftId);

  if (!params.id || Number.isNaN(aircraftId)) {
    return <div>Invalid aircraft selected.</div>;
  }

  if (isLoading) {
    return <div>Loading records...</div>;
  }

  const documents = data ?? [];

  if (documents.length === 0) {
    return <div>No records found for this aircraft.</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Aircraft Records</h2>

      {documents.map((doc: any) => (
        <div key={doc.id} className="border rounded-xl p-4">
          <p className="font-bold">
            {doc.document_type || doc.type || "Document"}
          </p>
          <p>{doc.title || doc.file_name}</p>
          <p className="text-sm text-gray-500">
            Uploaded: {doc.uploaded_at || "Unknown"}
          </p>
        </div>
      ))}
    </div>
  );
}
