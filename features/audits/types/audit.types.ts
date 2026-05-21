export type AuditAction = "CREATE" | "UPDATE" | "DELETE" | "LOGIN" | "LOGOUT";

export interface AuditUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface AuditAircraft {
  id: number;
  registration: string;
}

export interface AuditLog {
  id: number;
  user: AuditUser | null;
  aircraft: AuditAircraft | null;

  action: AuditAction;

  model: string;
  object_id: string;

  before: Record<string, unknown> | null;
  after: Record<string, unknown> | null;

  timestamp: string;
}

export interface AuditLogResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: AuditLog[];
}
[];
