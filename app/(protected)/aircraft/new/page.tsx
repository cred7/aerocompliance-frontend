"use client";

import { Header } from "@/components/layout/header";
import {
  useAircraftTypes,
  useCreateAircraft,
  useCreateAircraftType,
  useCreateOperator,
  useOperators,
} from "@/hooks/useAircraft";
import Link from "next/link";
import { useState } from "react";

export default function NewAircraftPage() {
  const { data: types } = useAircraftTypes();
  const { data: operators } = useOperators();
  const createAircraft = useCreateAircraft();
  const createAircraftType = useCreateAircraftType();
  const createOperator = useCreateOperator();

  const [aircraftData, setAircraftData] = useState({
    tail_number: "",
    serial_number: "",
    manufacture_date: "",
    total_flight_hours: "0",
    total_flight_cycles: "0",
    status: "AIRWORTHY",
    aircraft_type: "",
    operator: "",
  });

  const [typeData, setTypeData] = useState({
    manufacturer: "",
    model: "",
    engine_type: "",
  });

  const [operatorData, setOperatorData] = useState({
    name: "",
    code: "",
    country: "",
  });

  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const onAircraftSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage(null);

    const payload = {
      tail_number: aircraftData.tail_number,
      serial_number: aircraftData.serial_number,
      manufacture_date: aircraftData.manufacture_date,
      total_flight_hours: Number(aircraftData.total_flight_hours) || 0,
      total_flight_cycles: Number(aircraftData.total_flight_cycles) || 0,
      status: aircraftData.status,
      aircraft_type: Number(aircraftData.aircraft_type) || undefined,
      operator: Number(aircraftData.operator) || undefined,
    };

    createAircraft.mutate(payload, {
      onSuccess: (data) => {
        setStatusMessage(
          `Created aircraft ${data.tail_number} (ID ${data.id})`,
        );
        setAircraftData({
          tail_number: "",
          serial_number: "",
          manufacture_date: "",
          total_flight_hours: "0",
          total_flight_cycles: "0",
          status: "AIRWORTHY",
          aircraft_type: "",
          operator: "",
        });
      },
      onError: () => {
        setStatusMessage(
          "Failed to create aircraft. Check your values and retry.",
        );
      },
    });
  };

  const onTypeSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage(null);

    createAircraftType.mutate(typeData, {
      onSuccess: (data) => {
        setStatusMessage(
          `Created aircraft type ${data.manufacturer} ${data.model}`,
        );
        setTypeData({ manufacturer: "", model: "", engine_type: "" });
      },
      onError: () => {
        setStatusMessage("Failed to save aircraft type.");
      },
    });
  };

  const onOperatorSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage(null);

    createOperator.mutate(operatorData, {
      onSuccess: (data) => {
        setStatusMessage(`Created operator ${data.name}`);
        setOperatorData({ name: "", code: "", country: "" });
      },
      onError: () => {
        setStatusMessage("Failed to save operator.");
      },
    });
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Create Fleet Data</h1>
            <p className="text-gray-600">
              Add new aircraft, operators, or aircraft type entries without
              selecting an existing aircraft.
            </p>
          </div>
          <Link
            href="/aircraft"
            className="rounded bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black"
          >
            Back to Aircraft List
          </Link>
        </div>

        {statusMessage && (
          <div className="rounded border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900">
            {statusMessage}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Create New Aircraft</h2>
            <form onSubmit={onAircraftSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-zinc-700">
                  Tail Number
                  <input
                    type="text"
                    value={aircraftData.tail_number}
                    onChange={(e) =>
                      setAircraftData({
                        ...aircraftData,
                        tail_number: e.target.value,
                      })
                    }
                    className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-black outline-none focus:border-black"
                    required
                  />
                </label>
                <label className="block text-sm font-medium text-zinc-700">
                  Serial Number
                  <input
                    type="text"
                    value={aircraftData.serial_number}
                    onChange={(e) =>
                      setAircraftData({
                        ...aircraftData,
                        serial_number: e.target.value,
                      })
                    }
                    className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-black outline-none focus:border-black"
                    required
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-zinc-700">
                  Manufacture Date
                  <input
                    type="date"
                    value={aircraftData.manufacture_date}
                    onChange={(e) =>
                      setAircraftData({
                        ...aircraftData,
                        manufacture_date: e.target.value,
                      })
                    }
                    className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-black outline-none focus:border-black"
                  />
                </label>
                <label className="block text-sm font-medium text-zinc-700">
                  Status
                  <select
                    value={aircraftData.status}
                    onChange={(e) =>
                      setAircraftData({
                        ...aircraftData,
                        status: e.target.value,
                      })
                    }
                    className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-black outline-none focus:border-black"
                  >
                    <option value="AIRWORTHY">AIRWORTHY</option>
                    <option value="RESTRICTED">RESTRICTED</option>
                    <option value="UNFIT">UNFIT</option>
                  </select>
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-zinc-700">
                  Flight Hours
                  <input
                    type="number"
                    min="0"
                    value={aircraftData.total_flight_hours}
                    onChange={(e) =>
                      setAircraftData({
                        ...aircraftData,
                        total_flight_hours: e.target.value,
                      })
                    }
                    className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-black outline-none focus:border-black"
                  />
                </label>
                <label className="block text-sm font-medium text-zinc-700">
                  Flight Cycles
                  <input
                    type="number"
                    min="0"
                    value={aircraftData.total_flight_cycles}
                    onChange={(e) =>
                      setAircraftData({
                        ...aircraftData,
                        total_flight_cycles: e.target.value,
                      })
                    }
                    className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-black outline-none focus:border-black"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-zinc-700">
                  Aircraft Type
                  <select
                    value={aircraftData.aircraft_type}
                    onChange={(e) =>
                      setAircraftData({
                        ...aircraftData,
                        aircraft_type: e.target.value,
                      })
                    }
                    className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-black outline-none focus:border-black"
                    required
                  >
                    <option value="">Select type</option>
                    {types?.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.manufacturer} {type.model}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm font-medium text-zinc-700">
                  Operator
                  <select
                    value={aircraftData.operator}
                    onChange={(e) =>
                      setAircraftData({
                        ...aircraftData,
                        operator: e.target.value,
                      })
                    }
                    className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-black outline-none focus:border-black"
                    required
                  >
                    <option value="">Select operator</option>
                    {operators?.map((operator) => (
                      <option key={operator.id} value={operator.id}>
                        {operator.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <button
                type="submit"
                disabled={createAircraft.isLoading}
                className="inline-flex items-center justify-center rounded bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-900 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {createAircraft.isLoading ? "Saving..." : "Save Aircraft"}
              </button>
            </form>
          </section>

          <div className="space-y-6">
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">
                Create Aircraft Type
              </h2>
              <form onSubmit={onTypeSubmit} className="space-y-4">
                <label className="block text-sm font-medium text-zinc-700">
                  Manufacturer
                  <input
                    type="text"
                    value={typeData.manufacturer}
                    onChange={(e) =>
                      setTypeData({ ...typeData, manufacturer: e.target.value })
                    }
                    className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-black outline-none focus:border-black"
                    required
                  />
                </label>
                <label className="block text-sm font-medium text-zinc-700">
                  Model
                  <input
                    type="text"
                    value={typeData.model}
                    onChange={(e) =>
                      setTypeData({ ...typeData, model: e.target.value })
                    }
                    className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-black outline-none focus:border-black"
                    required
                  />
                </label>
                <label className="block text-sm font-medium text-zinc-700">
                  Engine Type
                  <input
                    type="text"
                    value={typeData.engine_type}
                    onChange={(e) =>
                      setTypeData({ ...typeData, engine_type: e.target.value })
                    }
                    className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-black outline-none focus:border-black"
                    required
                  />
                </label>
                <button
                  type="submit"
                  disabled={createAircraftType.isLoading}
                  className="inline-flex items-center justify-center rounded bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-900 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  {createAircraftType.isLoading ? "Saving..." : "Create Type"}
                </button>
              </form>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Create Operator</h2>
              <form onSubmit={onOperatorSubmit} className="space-y-4">
                <label className="block text-sm font-medium text-zinc-700">
                  Name
                  <input
                    type="text"
                    value={operatorData.name}
                    onChange={(e) =>
                      setOperatorData({ ...operatorData, name: e.target.value })
                    }
                    className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-black outline-none focus:border-black"
                    required
                  />
                </label>
                <label className="block text-sm font-medium text-zinc-700">
                  Code
                  <input
                    type="text"
                    value={operatorData.code}
                    onChange={(e) =>
                      setOperatorData({ ...operatorData, code: e.target.value })
                    }
                    className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-black outline-none focus:border-black"
                    required
                  />
                </label>
                <label className="block text-sm font-medium text-zinc-700">
                  Country
                  <input
                    type="text"
                    value={operatorData.country}
                    onChange={(e) =>
                      setOperatorData({
                        ...operatorData,
                        country: e.target.value,
                      })
                    }
                    className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-black outline-none focus:border-black"
                    required
                  />
                </label>
                <button
                  type="submit"
                  disabled={createOperator.isLoading}
                  className="inline-flex items-center justify-center rounded bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-900 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  {createOperator.isLoading ? "Saving..." : "Create Operator"}
                </button>
              </form>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
