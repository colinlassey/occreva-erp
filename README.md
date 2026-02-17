# Occreva ERP

Production-oriented CRM/ERP foundation for an agency, built with Next.js + TypeScript + Prisma + Postgres.

## Current slice

This commit implements **Repo bootstrap** from the required build order:

- Next.js App Router + TypeScript + Tailwind + ESLint/Prettier scaffold
- Docker Compose for Postgres + Redis
- Prisma schema with workspace-scoped core entities
- Adapter interfaces for payment/email/storage
- AI service stub for future copilot features

## Local setup

1. Copy env vars:

```bash
cp .env.example .env
```

2. Start infrastructure:

```bash
docker compose up -d
```

3. Install dependencies:

```bash
npm install
```

4. Generate Prisma client and run migrations:

```bash
npm run prisma:generate
npm run prisma:migrate
```

5. Start app:

```bash
npm run dev
```

## Next slice

- Auth + workspace membership + RBAC enforcement framework.
