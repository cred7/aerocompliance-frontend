# records Feature

## Purpose

This module handles all frontend logic related to **records**.

## Structure

- api/ ? API calls to backend endpoints
- components/ ? UI components
- hooks/ ? React hooks for state/data logic
- types/ ? TypeScript definitions

## Backend Mapping

Connects to backend /api/records/ endpoints (or related domain APIs).

### Record type contract

Frontend record uploads must use backend document types:

- `CRS`
- `WORK_ORDER`
- `INSPECTION`
- `AD_EVIDENCE`
- `MEL_EVIDENCE`
- `AMP_EVIDENCE`

The upload form uses `type` as the backend enum value and `aircraft` as the foreign key ID.
