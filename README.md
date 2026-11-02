# Quantum Analytics Pro

Quantum Analytics Pro is a production-oriented analytics platform starter built with a modern frontend and a secure API foundation.

## Stack

- Frontend: React + Vite + TypeScript
- Backend: Node.js + Express + TypeScript
- Auth: JWT-based authentication
- Data layer: PostgreSQL-ready schema with mock data fallback
- Infra: Docker Compose for local database setup

## Repository structure

```text
.
├── apps/
│   ├── api/
│   └── web/
├── docker-compose.yml
├── .env.example
├── README.md
└── package.json
```

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Start PostgreSQL locally:

```bash
docker compose up -d
```

4. Start API:

```bash
npm run dev:api
```

5. Start frontend:

```bash
npm run dev
```

## Default login

The starter includes a demo login for local testing:

- Email: admin@quantumpro.io
- Password: password123

## Included features

- Executive dashboard with KPIs
- Revenue trends and performance cards
- Customer management module
- Secure API routes with JWT middleware
- Role-aware user model
- Ready-to-expand codebase structure

## Notes

This project is intentionally structured as a strong starting point for a real SaaS product, but it still uses mock data in the API layer to keep the repo runnable without a full database migration workflow.

## Next steps

- Add Prisma or Drizzle ORM
- Implement real PostgreSQL schema migration
- Add RBAC to routes
- Add report export workflows
- Connect charts to live metrics
