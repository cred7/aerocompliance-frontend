// Aircraft Types
export interface AircraftType {
  id: number;
  manufacturer: string;
  model: string;
  engine_type: string;
}

// Operator Types
export interface Operator {
  id: number;
  name: string;
  code: string;
  country: string;
}

// Aircraft
export interface Aircraft {
  id: number;
  tail_number: string;
  serial_number: string;
  manufacture_date: string;
  total_flight_hours: number;
  total_flight_cycles: number;
  status: string;
  aircraft_type: number | AircraftType;
  aircraft_type_name: string;
  operator: number | Operator;
  operator_name: string;
  created_at: string;
  updated_at: string;
}

// MEL Item
export interface MELItem {
  id: number;
  aircraft: number;
  title: string;
  description: string;
  category: string;
  status: string;
  reported_date: string;
  allowed_duration_hours: number;
  remaining_hours: number;
  resolved_at: string | null;
  created_at: string;
}

// AD Compliance
export interface ADCompliance {
  id: number;
  aircraft: number;
  aircraft_tail: string;
  ad: number;
  ad_number: string;
  ad_title: string;
  status: string;
  last_compliance_fh: number;
  last_compliance_fc: number;
  last_compliance_date: string;
  next_due_date: string;
  created_at: string;
  updated_at: string;
}

// Airworthiness Directive
export interface AirworthinessDirective {
  id: number;
  ad_number: string;
  title: string;
  description: string;
  compliance_type: string;
  interval_fh: number | null;
  interval_fc: number | null;
  interval_days: number | null;
  effective_date: string;
  mandatory: boolean;
  created_at: string;
}

// Maintenance Task
export interface MaintenanceTask {
  id: number;
  title: string;
  description: string;
  aircraft: number;
  interval_type: string;
  interval_value: number;
  last_performed_fh: number;
  last_performed_fc: number;
  last_performed_date: string | null;
  is_active: boolean;
  created_at: string;
}

// Compliance Snapshot
export interface ComplianceSnapshot {
  id: number;
  aircraft: number;
  amp_status: string;
  mel_status: string;
  ad_status: string;
  overall_status: string;
  last_evaluated: string;
}

// Document
export interface Document {
  id: number;
  aircraft: number;
  title: string;
  description: string;
  type: string;
  file: string;
  uploaded_by: number;
  uploaded_at: string;
}

// Notification
export interface Notification {
  id: number;
  aircraft: number;
  user: number;
  title: string;
  message: string;
  type: string;
  status: string;
  created_at: string;
  sent_at: string | null;
}

// Audit Log
export interface AuditLog {
  id: number;
  user: number;
  aircraft: number;
  action: string;
  model_name: string;
  object_id: string;
  before: Record<string, any>;
  after: Record<string, any>;
  timestamp: string;
}

// Aircraft Detail (comprehensive)
export interface AircraftDetail extends Aircraft {
  mel_items: MELItem[];
  ad_compliances: ADCompliance[];
  maintenance_tasks: MaintenanceTask[];
  compliance_snapshot: ComplianceSnapshot | null;
  documents: Document[];
  audit_logs: AuditLog[];
  total_mel_items: number;
  open_mel_items: number;
  total_ad_items: number;
  overdue_ad_items: number;
}

// Fleet Dashboard
export interface FleetDashboard {
  fleet_size: number;
  airworthy: number;
  restricted: number;
  unfit: number;
  mel_open: number;
  mel_overdue: number;
}

// Aircraft Dashboard
export interface AircraftDashboard {
  aircraft: Aircraft;
  total_mel: number;
  open_mel: number;
  expired_mel: number;
  ad_compliant: number;
  ad_overdue: number;
}

// User
export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  is_active_engineer: boolean;
}

// Login Response
export interface LoginResponse {
  user: User;
  access: string;
  refresh: string;
}

// Pagination
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
