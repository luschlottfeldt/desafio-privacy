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

Os testes e2e precisam do banco rodando (`npm run db:up`). Eles usam um banco separado, `privacy_test`, criado e migrado automaticamente a partir de `backend/.env.test`, então não alteram os dados de desenvolvimento.

```bash
npm test
npm run test:e2e
```

## API

| Rota | Descrição |
| --- | --- |
| `GET /healthcheck` | Status da API e do banco |
| `GET /users` | Usuários disponíveis para o switch |
| `GET /creators` | Lista de criadoras |
| `GET /creators/:creatorId` | Dados da criadora (`404` se não existir) |
| `POST /creators/:creatorId/followers` | Corpo `{ "userId" }`. `201` ao seguir, `409` se já segue, `404` se criadora ou usuário não existe |
| `DELETE /creators/:creatorId/followers/:userId` | `204` ao deixar de seguir, `404` se não segue |
| `GET /creators/:creatorId/followers/count?userId=` | `{ creatorId, count }`, com `isFollowing` quando `userId` é informado |

IDs inválidos (não UUID) retornam `400`.

## Páginas

- `/`: lista de criadoras.
- `/creators/:creatorId?userId=`: perfil da criadora. O usuário selecionado fica na URL. Sem usuário, abre o seletor e a página mostra só o número de seguidores.

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
