# TrimTech — Barber Shop SaaS

Aplicação para gerenciamento de barbearias, serviços e agendamentos.

[![My Skills](https://skillicons.dev/icons?i=ts,nodejs,nestjs,prisma,postgres,nextjs,tailwind,docker)](https://skillicons.dev)

---

## Estrutura do repositório

```
.
├── backend/          # api rest — nestjs + prisma + postgresql
├── frontend/         # interface — next.js 14 + tailwind css
├── docker-compose.yml
└── .github/
    └── workflows/
        ├── backend.yml   # ci: build + testes
        └── frontend.yml  # ci: lint + build + deploy vercel
```

---

## Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/FelipeRibeiro12/TrimTech.git
cd TrimTech
```

---

### 2. Via Docker (recomendado)

Pré-requisito: ter o [Docker](https://www.docker.com/) instalado.

```bash
docker-compose up --build
```

Isso sobe três containers automaticamente:

| container | porta | descrição |
| --------- | ----- | --------- |
| `db` | 5432 | PostgreSQL |
| `backend` | 8080 | API NestJS |
| `frontend` | 3000 | Next.js |

Acesse: http://localhost:3000

> **primeira execução:** o banco sobe vazio. para popular com dados de exemplo, abra outro terminal e rode:
> ```bash
> docker-compose exec backend npx prisma db seed
> ```

---

### 3. Local (sem Docker)

Pré-requisitos: [Node.js 20+](https://nodejs.org) e [PostgreSQL](https://www.postgresql.org/) rodando localmente.

**Backend:**

```bash
cd backend
npm install
cp .env.example .env
# edite o .env com sua DATABASE_URL e um JWT_SECRET
npx prisma generate
npx prisma migrate dev --name init_db
npx prisma db seed
npm run start:dev
```

**Frontend** (abra outro terminal):

```bash
cd frontend
npm install
cp env.example .env.local
# edite o .env.local e ajuste NEXT_PUBLIC_API_URL=http://localhost:8080
npm run dev
```

Acesse: http://localhost:3000

---

## Links rápidos

| serviço | url |
| ------- | --- |
| frontend | http://localhost:3000 |
| api | http://localhost:8080 |
| swagger | http://localhost:8080/api |

---

> veja [backend/README.md](backend/README.md) e [frontend/README.md](frontend/README.md) para detalhe.
