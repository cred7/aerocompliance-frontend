import { useQuery } from "@tanstack/react-query";
import { getAircraftDashboard } from "../api/getAircraftList";

export function useAircraftDashboard(id: string) {
  return useQuery({
    queryKey: ["aircraft-dashboard", id],
    queryFn: () => getAircraftDashboard(id),
    enabled: !!id,
  });
}
