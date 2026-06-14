# AeroCompliance Pro Frontend - Architecture Summary

## Project Overview

Modern Next.js 16.2.6 application for aviation compliance management. Features JWT authentication, real-time data fetching with React Query, and consistent black/gray/white design system with no border radius.

## Key Technologies

- **Framework**: Next.js 16.2.6 with TypeScript
- **Data Fetching**: TanStack React Query 5.100.9 (30s refetch intervals)
- **HTTP Client**: Axios with JWT Bearer token interceptors
- **Styling**: Tailwind CSS 4 (no border-radius enforced globally)
- **State Management**: Available (Zustand) but not actively used
- **Build System**: TypeScript compilation with tsconfig

## Authentication Flow

1. User logs in at `/login` with credentials
2. Backend returns JWT token (60min access, 7day refresh)
3. Token stored in localStorage via `lib/token.ts`
4. Axios interceptor automatically adds `Authorization: Bearer {token}` to all requests
5. Protected routes redirect to login if token missing

### Token Management

- `getToken()` - Retrieve from localStorage
- `setToken(token)` - Store in localStorage
- `clearToken()` - Remove from localStorage

## Architecture

### Pages (App Router)

```
/
  └─ login/
  └─ protected/
      ├─ dashboard/          (fleet statistics + aircraft table)
      ├─ aircraft/
      │   ├─ page.tsx       (aircraft list with search)
      │   └─ [id]/
      │       └─ page.tsx   (aircraft operational detail)
      ├─ mel/               (TODO)
      ├─ ad/                (TODO)
      ├─ amp/               (TODO)
      ├─ compliance/        (TODO)
      ├─ notifications/     (TODO)
      └─ audits/            (TODO)
```

### React Query Hooks Pattern

Each domain has dedicated hooks file following this structure:

```typescript
// List/Read Hooks
export function useResource() {
  return useQuery({
    queryKey: ["resources"],
    queryFn: async () => {
      const res = await api.get(endpoints.resources);
      return res.data as Resource[];
    },
  });
}

// Create Mutation
export function useCreateResource() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Resource>) => {
      const res = await api.post(endpoints.resources, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
  });
}
```

### Hooks Overview

| Hook                    | Location            | Purpose                              | Cache Key                 | Refetch |
| ----------------------- | ------------------- | ------------------------------------ | ------------------------- | ------- |
| useAircraftList         | useAircraft.ts      | List all aircraft                    | ["aircraft"]              | -       |
| useAircraftDetail       | useAircraft.ts      | Single aircraft with all nested data | ["aircraft", id]          | -       |
| useMELItems             | useMEL.ts           | MEL items (global/by aircraft)       | ["mel-items"]             | -       |
| useFleetDashboard       | useDashboard.ts     | Fleet statistics                     | ["fleet-dashboard"]       | 30s     |
| useAircraftDashboard    | useDashboard.ts     | Aircraft dashboard                   | ["aircraft-dashboard"]    | 30s     |
| useADs                  | useAD.ts            | List ADs                             | ["ads"]                   | -       |
| useADCompliances        | useAD.ts            | AD compliance by aircraft            | ["ad-compliances"]        | -       |
| useMaintenanceTasks     | useAMP.ts           | AMP tasks                            | ["maintenance-tasks"]     | -       |
| useComplianceSnapshots  | useCompliance.ts    | Compliance status                    | ["compliance-snapshots"]  | -       |
| useNotifications        | useNotifications.ts | Notifications                        | ["notifications"]         | 30s     |
| usePendingNotifications | useNotifications.ts | Pending only                         | ["pending-notifications"] | 30s     |
| useAuditLogs            | useAuditLogs.ts     | Audit trail                          | ["audit-logs"]            | -       |
| useDocuments            | useDocuments.ts     | Documents                            | ["documents"]             | -       |

> Audit filters must use backend query params. The frontend uses `aircraft_id` when filtering audit logs by aircraft.

### Type Definitions (`types/index.ts`)

Core interfaces matching backend serializers:

- **Aircraft** - Basic aircraft info (id, tail_number, serial_number, etc.)
- **AircraftDetail** - Extends Aircraft with nested relationships
- **MELItem** - Minimum Equipment List items
- **ADCompliance** - Airworthiness Directive compliance
- **MaintenanceTask** - AMP maintenance tasks
- **ComplianceSnapshot** - Compliance status summary
- **Document** - Uploaded files
- **Notification** - Operational notifications
- **AuditLog** - Change audit trail
- **FleetDashboard** - Fleet-wide statistics
- **AircraftDashboard** - Aircraft-specific metrics

### Component Library

#### UI Components (`components/ui/`)

- **SkeletonLoader** - Generic animated skeleton
- **SkeletonCard** - Card skeleton
- **SkeletonTable** - Table skeleton
- **SkeletonDetailPage** - Multi-section skeleton

#### Layout (`components/layout/`)

- **Header** - Black background, navigation links, logout button
  - Links to: Dashboard, Aircraft, MEL, AD, AMP, Compliance, Notifications, Audit Trail

#### Utility Components (inline in pages)

- **InfoCard** - Display label + value pairs
- **StatusBadge** - Color-coded status (AIRWORTHY/RESTRICTED/UNFIT)
- **SummaryCard** - Large stat display

### Design System

#### Colors

- **Black**: #000000 (text, header background)
- **Gray**: #808080 (borders), #404040 (darker), #F5F5F5 (light)
- **White**: #ffffff (backgrounds)

#### Components

- No border-radius on any element (enforced by `globals.css`)
- Borders: 1px solid #D1D5DB (gray-300)
- Spacing: 4px grid (Tailwind default)
- Tables:
  - Header: bg-gray-100
  - Rows: hover:bg-gray-50
  - Borders: bottom only between rows

#### Status Colors

- **AIRWORTHY**: Green (bg-green-100, text-green-900)
- **RESTRICTED**: Yellow (bg-yellow-100, text-yellow-900)
- **UNFIT**: Red (bg-red-100, text-red-900)

## API Integration

### Endpoints (`lib/endpoints.ts`)

Organized by domain with full nested routes:

```typescript
endpoints.aircraft.detail(id); // /api/aircraft/aircraft/{id}/
endpoints.aircraft.melItems(id); // /api/aircraft/aircraft/{id}/mel_items/
endpoints.aircraft.adCompliances(id); // /api/aircraft/aircraft/{id}/ad_compliances/
endpoints.mel.byAircraft(aircraftId); // /api/mel/mel/by_aircraft/?aircraft_id=
endpoints.ad.compliances; // /api/ad/compliances/
endpoints.compliance.unfitAircraft(); // /api/compliance/snapshots/unfit_aircraft/
// ... more endpoints
```

### Request Pattern

```typescript
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";

// GET
const res = await api.get(endpoints.resource.list());
const data = res.data;

// POST
const res = await api.post(endpoints.resource.list(), { ...data });

// PUT/PATCH
const res = await api.put(endpoints.resource.detail(id), { ...data });

// DELETE
await api.delete(endpoints.resource.detail(id));
```

### Headers

All requests automatically include:

```
Authorization: Bearer {token}
Content-Type: application/json
```

## Data Flow

1. **Component** mounts → triggers React Query hook
2. **Hook** calls `api.get()` with endpoint URL
3. **Axios interceptor** adds JWT token to header
4. **Backend** processes request, returns JSON
5. **Hook** caches data in React Query store
6. **Component** renders from cached data
7. **On mutation success** → invalidate cache keys
8. **React Query** auto-refetches stale data

## Loading States

All data-loading pages use skeleton screens:

```typescript
{isLoading ? (
  <SkeletonDetailPage />
) : (
  <DetailView data={data} />
)}
```

Skeletons show placeholder content with `animate-pulse` while data loads.

## Next Steps

**When Token Resets:**

1. Create remaining pages (MEL, AD, AMP, Notifications, Compliance, Audits)
2. Each page follows Dashboard pattern:
   - Use hook to fetch data
   - Show SkeletonLoader while loading
   - Render table/list with data
   - Add filters/search as needed
3. Create form components for create/update operations
4. Add modal components for delete confirmation
5. Implement file upload for documents
6. Add search and filtering capabilities
7. Wire up notification badge in header

See `front.md` for detailed progress and pending tasks.

## Development Commands

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# TypeScript check
npx tsc --noEmit

# ESLint
npm run lint
```

## File Size Reference

- Dashboard page: ~200 lines
- Aircraft detail page: ~350 lines
- Aircraft list page: ~180 lines
- Each hook file: ~60-100 lines
- Skeleton components: ~120 lines

## Cache Strategy

- **Default**: No refetch (manual invalidation on mutation)
- **Dashboard**: 30s refetch interval (real-time updates)
- **Notifications**: 30s refetch interval (real-time updates)
- **Most queries**: Cache invalidated on create/update/delete

## Error Handling

Currently basic (logs to console). Enhancement areas:

1. Error boundaries for entire page sections
2. Toast notifications for operation results
3. Retry logic for failed requests
4. User-friendly error messages

## Security Notes

- Token stored in localStorage (consider secure cookies)
- No token refresh logic (backend supports refresh tokens)
- No CORS issues (backend handles)
- XSS protection via React's JSX escaping
- CSRF protection handled by Django

---

**Status**: Frontend foundation complete. Ready for page wiring and form implementation.
