import { useQuery } from "@tanstack/react-query";
import { getMel } from "../api/get-mel";

export function useMel(aircraftId?: number) {
  return useQuery({
    queryKey: ["mel", aircraftId],
    queryFn: () => getMel(aircraftId),
    refetchInterval: 15000,
  });
}
