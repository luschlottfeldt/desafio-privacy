# Seguir criadora

API e página em que um usuário segue e deixa de seguir uma criadora e vê quantos seguidores ela tem.

- **backend/**: NestJS + Prisma (PostgreSQL)
- **frontend/**: React + Vite + styled-components
- **docker-compose.yml**: PostgreSQL 17

## Pré-requisitos

- Node.js 22+ e npm 10+
- Docker com Docker Compose

## Como rodar

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
npm run setup
npm run dev
```

O `npm run setup` instala as dependências, sobe o banco, gera o Prisma Client, aplica as migrations e roda o seed (1 criadora e 10 usuários).

- API: http://localhost:3000 (status em `GET /healthcheck`)
- Página: http://localhost:5173

## Testes

Os testes e2e precisam do banco rodando (`npm run db:up`).

```bash
npm test
npm run test:e2e
```

## Scripts da raiz

| Script | O que faz |
| --- | --- |
| `npm run setup` | Instala dependências, sobe o banco, gera o client, migra e popula |
| `npm run dev` | Sobe backend e frontend juntos |
| `npm run db:up` / `npm run db:down` | Sobe / derruba o PostgreSQL |
| `npm run prisma:generate` | Gera o Prisma Client |
| `npm run prisma:migrate` | Aplica as migrations |
| `npm run prisma:seed` | Popula o banco (idempotente) |
| `npm test` | Testes unitários da API |
| `npm run test:e2e` | Testes e2e da API |
