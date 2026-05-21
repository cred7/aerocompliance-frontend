import { useQuery } from "@tanstack/react-query";
import { getAd } from "../api/get-ad";

export function useAd(aircraftId?: number) {
  return useQuery({
    queryKey: ["ad", aircraftId],
    queryFn: () => getAd(aircraftId),
  });
}
