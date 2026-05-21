import { useQuery } from "@tanstack/react-query";
import { getAmpTasks } from "../api/get-amp-tasks";

export function useAmpTasks(aircraftId?: number) {
  return useQuery({
    queryKey: ["amp-tasks", aircraftId],
    queryFn: () => getAmpTasks(aircraftId),
    refetchInterval: 30000,
  });
}
