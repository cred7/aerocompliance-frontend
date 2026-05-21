"use client";

import { Header } from "@/components/layout/header";
import { useAllDocuments, useCreateDocument } from "@/hooks/useRecords";
import { Document } from "@/types";
import { useState, type FormEvent } from "react";

export default function RecordsPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [aircraftId, setAircraftId] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const { data, isLoading } = useAllDocuments();
  const createDocument = useCreateDocument();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("type", typeValue);
    if (aircraftId) {
      formData.append("aircraft", aircraftId);
    }

    if (file) {
      formData.append("file", file);
    }

    await createDocument.mutateAsync(formData);
    setTitle("");
    setDescription("");
    setTypeValue("");
    setAircraftId("");
    setFile(null);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Records</h1>
          <p className="text-sm text-gray-600">
            Upload and manage document records for aircraft operations.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 mb-8">
          <section className="border border-gray-300 bg-gray-50 p-6">
            <h2 className="text-xl font-semibold text-black mb-4">
              Upload Record
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black">
                  Title
                </label>
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="mt-2 w-full border border-gray-300 bg-white px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows={4}
                  className="mt-2 w-full border border-gray-300 bg-white px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-black">
                    Type
                  </label>
                  <input
                    value={typeValue}
                    onChange={(event) => setTypeValue(event.target.value)}
                    className="mt-2 w-full border border-gray-300 bg-white px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">
                    Aircraft ID
                  </label>
                  <input
                    value={aircraftId}
                    onChange={(event) => setAircraftId(event.target.value)}
                    className="mt-2 w-full border border-gray-300 bg-white px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-black">
                  File
                </label>
                <input
                  type="file"
                  onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                  className="mt-2 w-full text-black"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-none border border-black bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-gray-900"
              >
                Upload Record
              </button>
            </form>
          </section>

          <section className="border border-gray-300 bg-gray-50 p-6">
            <h2 className="text-xl font-semibold text-black mb-4">
              Uploaded Records
            </h2>
            {isLoading ? (
              <div className="text-gray-600">Loading records…</div>
            ) : data?.results?.length ? (
              <div className="space-y-4">
                {data.results.map((record: Document) => (
                  <div
                    key={record.id}
                    className="rounded-none border border-gray-300 bg-white p-4"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                      <div>
                        <p className="font-semibold text-black">
                          {record.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          {record.description}
                        </p>
                        <p className="text-xs text-gray-500">
                          Aircraft: {record.aircraft ?? "N/A"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{record.type}</p>
                        <p className="text-xs text-gray-500">
                          Uploaded:{" "}
                          {new Date(record.uploaded_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-600">No records available.</div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
