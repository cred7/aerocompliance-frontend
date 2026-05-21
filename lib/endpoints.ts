export const endpoints = {
  users: "/api/users/",

  aircraft: {
    operators: "/api/aircraft/operators/",
    aircraftTypes: "/api/aircraft/aircraft-types/",
    aircraft: "/api/aircraft/aircraft/",
    list: () => "/api/aircraft/aircraft/",
    detail: (id: number | string) => `/api/aircraft/aircraft/${id}/`,
    aircraftDetail: (id: number | string) => `/api/aircraft/aircraft/${id}/aircraft_detail/`,
    melItems: (id: number | string) => `/api/aircraft/aircraft/${id}/mel_items/`,
    adCompliances: (id: number | string) => `/api/aircraft/aircraft/${id}/ad_compliances/`,
    maintenanceTasks: (id: number | string) => `/api/aircraft/aircraft/${id}/maintenance_tasks/`,
    complianceSnapshot: (id: number | string) => `/api/aircraft/aircraft/${id}/compliance_snapshot/`,
    documents: (id: number | string) => `/api/aircraft/aircraft/${id}/documents/`,
    auditHistory: (id: number | string) => `/api/aircraft/aircraft/${id}/audit_history/`,
  },

  amp: {
    tasks: "/api/amp/tasks/",
    taskDetail: (id: number | string) => `/api/amp/tasks/${id}/`,
    byAircraft: (aircraftId: number | string) => `/api/amp/tasks/by_aircraft/?aircraft_id=${aircraftId}`,
    active: () => "/api/amp/tasks/active/",
  },

  mel: {
    mel: "/api/mel/mel/",
    detail: (id: number | string) => `/api/mel/mel/${id}/`,
    byAircraft: (aircraftId: number | string) => `/api/mel/mel/by_aircraft/?aircraft_id=${aircraftId}`,
  },

  ad: {
    ads: "/api/ad/ads/",
    adDetail: (id: number | string) => `/api/ad/ads/${id}/`,
    compliances: "/api/ad/compliances/",
    complianceDetail: (id: number | string) => `/api/ad/compliances/${id}/`,
    byAircraft: (aircraftId: number | string) => `/api/ad/compliances/by_aircraft/?aircraft_id=${aircraftId}`,
    overdue: () => "/api/ad/compliances/overdue/",
  },

  compliance: {
    snapshots: "/api/compliance/snapshots/",
    snapshotDetail: (id: number | string) => `/api/compliance/snapshots/${id}/`,
    byAircraft: (aircraftId: number | string) => `/api/compliance/snapshots/by_aircraft/?aircraft_id=${aircraftId}`,
    unfitAircraft: () => "/api/compliance/snapshots/unfit_aircraft/",
    restrictedAircraft: () => "/api/compliance/snapshots/restricted_aircraft/",
  },

  notifications: {
    notifications: "/api/notifications/notifications/",
    detail: (id: number | string) => `/api/notifications/notifications/${id}/`,
    byAircraft: (aircraftId: number | string) => `/api/notifications/notifications/by_aircraft/?aircraft_id=${aircraftId}`,
    pending: () => "/api/notifications/notifications/pending/",
    runEngine: () => "/api/notifications/notifications/run_engine/",
  },

  records: {
    documents: "/api/records/documents/",
    documentDetail: (id: number | string) => `/api/records/documents/${id}/`,
    byAircraft: (aircraftId: number | string) => `/api/records/documents/by_aircraft/?aircraft_id=${aircraftId}`,
    byType: (type: string) => `/api/records/documents/by_type/?type=${type}`,
  },

  audits: {
    logs: "/api/audits/logs/",
    logDetail: (id: number | string) => `/api/audits/logs/${id}/`,
    byAircraft: (aircraftId: number | string) => `/api/audits/logs/by_aircraft/?aircraft_id=${aircraftId}`,
    byUser: (userId: number | string) => `/api/audits/logs/by_user/?user_id=${userId}`,
    byModel: (modelName: string) => `/api/audits/logs/by_model/?model_name=${modelName}`,
  },

  dashboard: {
    fleet: "/api/dashboard/fleet/",
    aircraft: (id: string | number) => `/api/dashboard/aircraft/${id}/`,
  },
};
