import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { Document, PaginatedResponse } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAircraftDocuments(aircraftId: number) {
  return useQuery({
    queryKey: ["aircraft-documents", aircraftId],
    queryFn: async () => {
      const res = await api.get(endpoints.records.byAircraft(aircraftId));
      return res.data as Document[];
    },
  });
}

export function useAllDocuments() {
  return useQuery({
    queryKey: ["documents"],
    queryFn: async () => {
      const res = await api.get(endpoints.records.documents);
      return res.data as PaginatedResponse<Document>;
    },
  });
}

export function useCreateDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      const res = await api.post(endpoints.records.documents, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data as Document;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      queryClient.invalidateQueries({ queryKey: ["aircraft-documents"] });
    },
  });
}

export function useDeleteDocument(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await api.delete(endpoints.records.documentDetail(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      queryClient.invalidateQueries({ queryKey: ["aircraft-documents"] });
    },
  });
}
