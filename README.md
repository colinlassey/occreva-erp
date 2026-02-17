# Occreva ERP

Production-grade internal agency CRM/ERP built with Next.js, TypeScript, Tailwind, Prisma, and PostgreSQL.

## Bootstrap status

This repository includes the initial bootstrap slice:

- Next.js App Router + TypeScript + Tailwind scaffold
- ESLint + Prettier configuration
- Docker Compose for PostgreSQL + Redis
- Prisma schema for v1 entities and indexes
- Adapter interfaces for payments, email, and storage
- AI service stub for future internal copilot work

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

4. Generate Prisma client and run migrations

```bash
npm run prisma:generate
npm run prisma:migrate -- --name init
```

5. Start dev server

```bash
npm run dev
```

## Next slice

Auth + workspace + RBAC framework (server-enforced) with route-level guards and workspace scoping utilities.
