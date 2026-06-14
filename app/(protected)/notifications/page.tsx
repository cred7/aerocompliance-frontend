"use client";

import { Header } from "@/components/layout/header";
import {
  useNotifications,
  usePendingNotifications,
  useRunNotificationEngine,
} from "@/hooks/useNotifications";
import { useState } from "react";

export default function NotificationsPage() {
  const [aircraftFilter, setAircraftFilter] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const aircraftId = Number(aircraftFilter);

  const { data: notifications, isLoading } = useNotifications(
    Number.isNaN(aircraftId) ? undefined : aircraftId,
  );
  const { data: pendingNotifications } = usePendingNotifications();
  const runEngine = useRunNotificationEngine();

  const handleRunEngine = () => {
    setStatusMessage(null);
    runEngine.mutate(undefined, {
      onSuccess: (result) => {
        setStatusMessage(result.status || "Notification engine triggered.");
      },
      onError: () => {
        setStatusMessage("Failed to start notifications. Try again.");
      },
    });
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Notifications</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="border border-gray-300 bg-gray-50 p-6">
            <p className="text-xs text-gray-500 uppercase">
              Total Notifications
            </p>
            <p className="mt-3 text-3xl font-bold text-black">
              {notifications?.length ?? 0}
            </p>
          </div>
          <div className="border border-gray-300 bg-gray-50 p-6">
            <p className="text-xs text-gray-500 uppercase">Pending</p>
            <p className="mt-3 text-3xl font-bold text-black">
              {pendingNotifications?.length ?? 0}
            </p>
          </div>
          <div className="border border-gray-300 bg-gray-50 p-6">
            <p className="text-xs text-gray-500 uppercase">
              Notification Engine
            </p>
            <button
              type="button"
              onClick={handleRunEngine}
              disabled={runEngine.isPending}
              className="mt-3 inline-flex items-center justify-center rounded bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-900 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {runEngine.isPending ? "Starting..." : "Start Notifications"}
            </button>
            {statusMessage && (
              <p className="mt-3 text-sm text-gray-600">{statusMessage}</p>
            )}
          </div>
        </div>

        <div className="mb-8 border border-gray-300 bg-gray-50 p-6">
          <label className="block text-sm font-semibold text-black">
            Filter by Aircraft ID
          </label>
          <input
            type="text"
            value={aircraftFilter}
            onChange={(event) => setAircraftFilter(event.target.value)}
            placeholder="Leave empty for all"
            className="mt-2 w-full border border-gray-300 bg-white px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {isLoading ? (
          <div className="border border-gray-300 bg-gray-50 p-6 text-gray-600">
            Loading notifications…
          </div>
        ) : notifications && notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="border border-gray-300 bg-white p-4 hover:bg-gray-50"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-semibold text-black">
                      {notification.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {notification.aircraft !== null &&
                        notification.aircraft !== undefined && (
                          <span>{`Aircraft ID: ${notification.aircraft}`}</span>
                        )}
                      {notification.aircraft !== null &&
                        notification.aircraft !== undefined &&
                        notification.user !== null &&
                        notification.user !== undefined && <span> • </span>}
                      {notification.user !== null &&
                        notification.user !== undefined && (
                          <span>{`User ID: ${notification.user}`}</span>
                        )}
                    </p>
                  </div>
                  <div className="space-y-1 text-right shrink-0">
                    <span
                      className={`block px-2 py-1 text-xs font-semibold rounded ${
                        notification.status === "SENT"
                          ? "bg-green-100 text-green-900"
                          : notification.status === "FAILED"
                            ? "bg-red-100 text-red-900"
                            : "bg-yellow-100 text-yellow-900"
                      }`}
                    >
                      {notification.status}
                    </span>
                    <p className="text-xs text-gray-500">{notification.type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-gray-300 bg-gray-50 p-6 text-gray-600">
            No notifications found.
          </div>
        )}
      </main>
    </div>
  );
}
