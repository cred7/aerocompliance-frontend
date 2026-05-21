"use client";

import AmpTable from "@/features/amp/components/AmpTable";
import { useAmpTasks } from "@/features/amp/hooks/use-amp-tasks";
import { useCreateMaintenanceTask } from "@/hooks/useAMP";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function AircraftAmpPage() {
  const params = useParams();
  const aircraftId = Number(params.id);
  const { data, isLoading } = useAmpTasks(aircraftId);
  const createTask = useCreateMaintenanceTask();

  const [form, setForm] = useState({
    title: "",
    description: "",
    interval_type: "FH",
    interval_value: "0",
    last_performed_date: "",
    is_active: true,
  });

  const [message, setMessage] = useState<string | null>(null);

  if (!params.id || Number.isNaN(aircraftId)) {
    return <div>Invalid aircraft selected.</div>;
  }

  if (isLoading) {
    return <div>Loading AMP tasks...</div>;
  }

  const tasks = data ?? [];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);

    createTask.mutate(
      {
        aircraft: aircraftId,
        title: form.title,
        description: form.description,
        interval_type: form.interval_type,
        interval_value: Number(form.interval_value) || 0,
        last_performed_date: form.last_performed_date || null,
        is_active: form.is_active,
      },
      {
        onSuccess: () => {
          setMessage("Maintenance task created successfully.");
          setForm({
            title: "",
            description: "",
            interval_type: "FH",
            interval_value: "0",
            last_performed_date: "",
            is_active: true,
          });
        },
        onError: () => {
          setMessage("Failed to create maintenance task.");
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Maintenance Programme</h2>
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
              Interval Type
              <select
                value={form.interval_type}
                onChange={(e) =>
                  setForm({ ...form, interval_type: e.target.value })
                }
                className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-black outline-none focus:border-black"
              >
                <option value="FH">FH</option>
                <option value="FC">FC</option>
                <option value="DAYS">DAYS</option>
              </select>
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block text-sm font-medium text-zinc-700">
              Interval Value
              <input
                type="number"
                min="0"
                value={form.interval_value}
                onChange={(e) =>
                  setForm({ ...form, interval_value: e.target.value })
                }
                className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-black outline-none focus:border-black"
                required
              />
            </label>
            <label className="block text-sm font-medium text-zinc-700">
              Last Performed Date
              <input
                type="date"
                value={form.last_performed_date}
                onChange={(e) =>
                  setForm({ ...form, last_performed_date: e.target.value })
                }
                className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-black outline-none focus:border-black"
              />
            </label>
            <label className="block text-sm font-medium text-zinc-700">
              Active
              <select
                value={form.is_active ? "true" : "false"}
                onChange={(e) =>
                  setForm({ ...form, is_active: e.target.value === "true" })
                }
                className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-black outline-none focus:border-black"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
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
          <button
            type="submit"
            disabled={createTask.isLoading}
            className="inline-flex items-center justify-center rounded bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-900 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {createTask.isLoading ? "Saving..." : "Create AMP Task"}
          </button>
        </form>
      </div>

      {tasks.length === 0 ? (
        <div>No AMP tasks found for this aircraft.</div>
      ) : (
        <AmpTable tasks={tasks} />
      )}
    </div>
  );
}
