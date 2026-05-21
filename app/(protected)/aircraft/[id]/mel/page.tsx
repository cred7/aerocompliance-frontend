"use client";

import { useMel } from "@/features/mel/hooks/use-mel";
import { useCreateMEL } from "@/hooks/useMEL";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function AircraftMelPage() {
  const params = useParams();
  const aircraftId = Number(params.id);
  const { data, isLoading } = useMel(aircraftId);
  const createMel = useCreateMEL();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    status: "OPEN",
    allowed_duration_hours: "0",
  });

  const [message, setMessage] = useState<string | null>(null);

  if (!params.id || Number.isNaN(aircraftId)) {
    return <div>Invalid aircraft selected.</div>;
  }

  if (isLoading) {
    return <div>Loading MEL...</div>;
  }

  const results = data ?? [];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);

    createMel.mutate(
      {
        aircraft: aircraftId,
        title: form.title,
        description: form.description,
        category: form.category,
        status: form.status,
        allowed_duration_hours: Number(form.allowed_duration_hours) || 0,
      },
      {
        onSuccess: () => {
          setMessage("MEL item added successfully.");
          setForm({
            title: "",
            description: "",
            category: "",
            status: "OPEN",
            allowed_duration_hours: "0",
          });
        },
        onError: () => {
          setMessage("Failed to create MEL item. Check your inputs and retry.");
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">MEL Defects</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {message && (
            <div className="rounded border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-slate-800">
              {message}
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-zinc-700">
              Title
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-black outline-none focus:border-black"
                required
              />
            </label>
            <label className="block text-sm font-medium text-zinc-700">
              Category
              <input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-black outline-none focus:border-black"
                required
              />
            </label>
          </div>
          <label className="block text-sm font-medium text-zinc-700">
            Description
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-black outline-none focus:border-black"
              rows={3}
              required
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block text-sm font-medium text-zinc-700">
              Status
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-black outline-none focus:border-black"
              >
                <option value="OPEN">OPEN</option>
                <option value="CLOSED">CLOSED</option>
                <option value="PENDING">PENDING</option>
              </select>
            </label>
            <label className="block text-sm font-medium text-zinc-700">
              Allowed Hours
              <input
                type="number"
                min="0"
                value={form.allowed_duration_hours}
                onChange={(e) =>
                  setForm({ ...form, allowed_duration_hours: e.target.value })
                }
                className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-black outline-none focus:border-black"
              />
            </label>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={createMel.isLoading}
                className="w-full rounded bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-900 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {createMel.isLoading ? "Saving..." : "Add MEL Item"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="grid gap-3">
        {results.map((item: any) => (
          <div key={item.id} className="border rounded-xl p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
              <div>
                <p className="font-bold">{item.title}</p>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>

              <div className="text-right">
                <p className="font-semibold">{item.category}</p>
                <p className="text-sm text-gray-500">
                  Remaining:{" "}
                  {item.remaining_hours ?? item.allowed_duration_hours ?? "N/A"}{" "}
                  hrs
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
