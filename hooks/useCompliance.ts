import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { ComplianceSnapshot } from "@/types";

export function useComplianceSnapshots(aircraftId?: number) {
  return useQuery({
    queryKey: ["compliance-snapshots", aircraftId],
    queryFn: async () => {
      const url = aircraftId 
        ? endpoints.compliance.byAircraft(aircraftId)
        : endpoints.compliance.snapshots;
      const res = await api.get(url);
      return res.data as ComplianceSnapshot[];
    },
  });
}

export function useComplianceSnapshot(id: number) {
  return useQuery({
    queryKey: ["compliance-snapshot", id],
    queryFn: async () => {
      const res = await api.get(endpoints.compliance.snapshotDetail(id));
      return res.data as ComplianceSnapshot;
    },
  });
}

export function useUnfitAircraft() {
  return useQuery({
    queryKey: ["unfit-aircraft"],
    queryFn: async () => {
      const res = await api.get(endpoints.compliance.unfitAircraft());
      return res.data;
    },
  });
}

export function useRestrictedAircraft() {
  return useQuery({
    queryKey: ["restricted-aircraft"],
    queryFn: async () => {
      const res = await api.get(endpoints.compliance.restrictedAircraft());
      return res.data;
    },
  });
}
