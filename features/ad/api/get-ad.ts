import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";

export async function getAd(aircraftId?: number) {
  const url = aircraftId
    ? endpoints.ad.byAircraft(aircraftId)
    : endpoints.ad.compliances;
  const res = await api.get(url);

  return res.data;
}
