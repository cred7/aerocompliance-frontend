import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { MaintenanceTask } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// AMP Queries
export function useMaintenanceTasks(aircraftId?: number) {
  return useQuery({
    queryKey: ["maintenance-tasks", aircraftId],
    queryFn: async () => {
      const url = aircraftId
        ? endpoints.amp.byAircraft(aircraftId)
        : endpoints.amp.tasks;
      const res = await api.get(url);
      return res.data as MaintenanceTask[];
    },
  });
}

export function useMaintenanceTask(id: number) {
  return useQuery({
    queryKey: ["maintenance-task", id],
    queryFn: async () => {
      const res = await api.get(endpoints.amp.taskDetail(id));
      return res.data as MaintenanceTask;
    },
  });
}

export function useActiveTasks() {
  return useQuery({
    queryKey: ["active-tasks"],
    queryFn: async () => {
      const res = await api.get(endpoints.amp.active());
      return res.data as MaintenanceTask[];
    },
  });
}

// AMP Mutations
export function useCreateMaintenanceTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<MaintenanceTask>) => {
      const res = await api.post(endpoints.amp.tasks, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["maintenance-tasks", variables.aircraft],
      });
      queryClient.invalidateQueries({
        queryKey: ["amp-tasks", variables.aircraft],
      });
    },
  });
}

export function useUpdateMaintenanceTask(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<MaintenanceTask>) => {
      const res = await api.put(endpoints.amp.taskDetail(id), data);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["maintenance-task", id] });
      queryClient.invalidateQueries({
        queryKey: ["maintenance-tasks", data.aircraft],
      });
      queryClient.invalidateQueries({ queryKey: ["amp-tasks", data.aircraft] });
      queryClient.invalidateQueries({ queryKey: ["active-tasks"] });
    },
  });
}

export function useDeleteMaintenanceTask(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await api.delete(endpoints.amp.taskDetail(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["maintenance-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["active-tasks"] });
    },
  });
}

export function useRecalculateTaskStatus(id: number) {
  return useMutation({
    mutationFn: async () => {
      const res = await api.get(
        `${endpoints.amp.taskDetail(id)}recalculate_status/`,
      );
      return res.data;
    },
  });
}
