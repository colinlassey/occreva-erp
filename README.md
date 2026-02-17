# Occreva ERP

Production-grade internal agency CRM/ERP built with Next.js, TypeScript, Tailwind, Prisma, and PostgreSQL.

## Current implementation slices

### 1) Repo bootstrap (complete)
- Next.js App Router + TypeScript + Tailwind scaffold
- ESLint + Prettier configuration
- Docker Compose for PostgreSQL + Redis
- Prisma base schema for v1 entities
- Adapter interfaces for payments, email, and storage
- AI service stub for future internal copilot work

### 2) Auth + Workspace + RBAC framework (complete)
- Standardized auth direction: **Auth.js**
- Temporary header-based identity shim (`x-user-id`, `x-workspace-id`) while Auth.js session wiring is pending
- Workspace-scoped auth context resolver
- Server-side RBAC guard utilities
- Workspace membership API with pagination and zod validation
- Audit logging for membership/role changes
- Role model introduced in Prisma for workspace-specific role assignments

## API surface added in slice 2

- `GET /api/me` - returns authenticated actor context
- `GET /api/workspaces/current` - returns current workspace metadata
- `GET /api/workspaces/current/members?page=1&pageSize=20` - workspace members with pagination
- `POST /api/workspaces/current/members` - admin-only add/update member role

Request body for `POST /api/workspaces/current/members`:

```json
{
  "userId": "<user-id>",
  "roleCode": "PM"
}
```

## Local setup

1. Copy env file

```bash
cp .env.example .env
```

2. Start infrastructure

```bash
docker compose up -d
```

3. Install dependencies (if your environment allows npm registry access)

```bash
npm install
```

4. Generate Prisma client, run migrations, and seed default RBAC data

```bash
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed
```

5. Start dev server

```bash
npm run dev
```

## Next slice

Client + Contact management (CRUD + search + activity timeline shell) with route-level RBAC and workspace scoping.
