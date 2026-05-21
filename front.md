# Frontend Next Steps

## What was wired

- Removed legacy `app/protected` segment route and stale `app/page.tsx` so the app now uses only:
  - `app/login/page.tsx`
  - `app/(protected)/layout.tsx`
  - `app/(protected)/page.tsx`
  - `app/(protected)/aircraft/*`
  - `app/(protected)/audits/page.tsx`
  - `app/(protected)/compliance/page.tsx`
  - `app/(protected)/notifications/page.tsx`
  - `app/(protected)/records/page.tsx`
- Updated header navigation to match actual protected pages.
- Updated dashboard page to show fleet summary and quick links.
- Constrained layout widths to `max-w-6xl` and kept the palette black / gray / white.
- Added aircraft route navigation for detail pages under `/aircraft/[id]`.
- Added a new creation page at `/aircraft/new` for aircraft, aircraft types, and operator records.

## Next work items

1. Confirm the dashboard payload shape from `/api/dashboard/fleet/` and update page fields if the backend returns different names.
2. Verify `frontend/lib/auth.ts` is posting to `/api/users/users/login/` and that login sets auth tokens correctly.
3. Wire `/audits`, `/compliance`, `/notifications`, and `/records` protected pages to their backend endpoints and add aircraft-specific filters where needed.
4. Add record upload form and notification create form so the frontend can populate backend data.
5. Validate the aircraft detail child pages (`amp`, `mel`, `ad`, `records`, `audits`) against actual backend responses for the current aircraft.
6. Run the frontend dev server and browse `/login`, then complete login and test `/aircraft/{id}` with each detail tab.
7. Add an aircraft creation page at `/aircraft/new` and navigation links from `app/(protected)/aircraft/[id]/` to `/mel`, `/ad`, `/amp`, `/records`, and `/audits`.
8. Update aircraft list and aircraft detail routes so users can create new fleet records and navigate directly to aircraft-specific subdomains.

## Notes

- The `(protected)` route group is the correct Next.js structure for protected routes.
- If the backend returns a different field name, update the dashboard hook and page field names to match.
