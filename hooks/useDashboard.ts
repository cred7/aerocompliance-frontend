import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { FleetDashboard, AircraftDashboard } from "@/types";

export function useFleetDashboard() {
  return useQuery({
    queryKey: ["fleet-dashboard"],
    queryFn: async () => {
      const res = await api.get(endpoints.dashboard.fleet);
      return res.data as FleetDashboard;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

export function useAircraftDashboard(aircraftId: number) {
  return useQuery({
    queryKey: ["aircraft-dashboard", aircraftId],
    queryFn: async () => {
      const res = await api.get(endpoints.dashboard.aircraft(aircraftId));
      return res.data as AircraftDashboard;
    },
    refetchInterval: 30000,
  });
}
