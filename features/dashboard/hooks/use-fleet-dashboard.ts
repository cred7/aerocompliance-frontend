import { useQuery } from "@tanstack/react-query";
import { getFleetDashboard } from "../api/get-fleet-dashboard";
import { FleetDashboardResponse } from "../types";

export function useFleetDashboard() {
  return useQuery<FleetDashboardResponse>({
    queryKey: ["fleet"],
    queryFn: getFleetDashboard,
    refetchInterval: 30000,
  });
}
