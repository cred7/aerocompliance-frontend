import { useQuery } from "@tanstack/react-query";
import { getAircraft } from "../api/getAircraft";

export function useAircraft() {
  return useQuery({
    queryKey: ["aircraft"],
    queryFn: getAircraft,
  });
}
