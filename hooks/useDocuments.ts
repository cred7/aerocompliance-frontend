import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { Document } from "@/types";

export function useDocuments(aircraftId?: number, type?: string) {
  let url = endpoints.records.documents;
  
  if (aircraftId) {
    url = endpoints.records.byAircraft(aircraftId);
  } else if (type) {
    url = endpoints.records.byType(type);
  }

  return useQuery({
    queryKey: ["documents", aircraftId, type],
    queryFn: async () => {
      const res = await api.get(url);
      return res.data as Document[];
    },
  });
}

export function useDocument(id: number) {
  return useQuery({
    queryKey: ["document", id],
    queryFn: async () => {
      const res = await api.get(endpoints.records.documentDetail(id));
      return res.data as Document;
    },
  });
}

export function useUploadDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await api.post(endpoints.records.documents, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["documents", data.aircraft] });
    },
  });
}

export function useUpdateDocument(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Document>) => {
      const res = await api.patch(endpoints.records.documentDetail(id), data);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["document", id] });
      queryClient.invalidateQueries({ queryKey: ["documents", data.aircraft] });
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
    },
  });
}

export function useDownloadDocument(id: number, filename: string) {
  return useMutation({
    mutationFn: async () => {
      const res = await api.get(
        `${endpoints.records.documentDetail(id)}download/`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.parentElement?.removeChild(link);
    },
  });
}
