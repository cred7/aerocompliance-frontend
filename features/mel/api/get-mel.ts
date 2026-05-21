import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";

export async function getMel(aircraftId?: number) {
  const url = aircraftId
    ? endpoints.mel.byAircraft(aircraftId)
    : endpoints.mel.mel;
  const res = await api.get(url);

  return res.data;
}
