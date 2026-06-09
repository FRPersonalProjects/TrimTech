# TrimTech — Backend

API REST do TrimTech, feita com NestJS + Prisma + PostgreSQL.

## Stack

- **NestJS** — framework node.js
- **Prisma** — orm + migrations
- **PostgreSQL** — banco de dados
- **Passport + JWT** — autenticação via cookie httpOnly
- **Swagger** — documentação das rotas em `/api`

---

## Estrutura de pastas

```
src/
├── app.module.ts               # modulo raiz, registra tudo
├── main.ts                     # bootstrap, cors, cookie-parser, swagger
│
├── auth/                       # autenticacao
│   ├── auth.controller.ts      # POST /auth/login e /auth/logout
│   ├── auth.service.ts         # valida usuario e gera jwt
│   ├── auth.strategy.ts        # estrategia local (email+senha)
│   ├── jwt.strategy.ts         # estrategia jwt (cookie)
│   ├── jwt-auth.guards.ts      # guard global — protege todas as rotas
│   ├── local-auth.guards.ts
│   └── public.decorator.ts     # @Public() — marca rota como aberta
│
├── user/
│   ├── user.controller.ts      # CRUD de usuarios
│   ├── user.service.ts         # logica + hash de senha
│   ├── user.service.spec.ts    # testes unitarios
│   └── dto/
│       ├── create-user.dto.ts
│       └── update-user.dto.ts
│
├── barbershop/
│   ├── barbershop.controller.ts
│   ├── barbershop.service.ts
│   ├── barbershop.service.spec.ts
│   └── dto/
│       ├── create-barbershop.dto.ts
│       └── update-barbershop.dto.ts
│
├── barbershop-service/         # servicos oferecidos pelas barbearias
│   ├── barbershop-service.controller.ts
│   ├── barbershop-service.service.ts
│   └── dto/
│       ├── create-barbershop-service.dto.ts
│       └── update-barbershop-service.dto.ts
│
├── booking/                    # agendamentos
│   ├── booking.controller.ts
│   ├── booking.service.ts
│   ├── booking.service.spec.ts
│   └── dto/
│       ├── create-booking.dto.ts
│       └── update-booking.dto.ts
│
└── database/
    ├── prisma.service.ts       # singleton do prisma client
    └── database.module.ts
```

---

## Rotas

Todas as rotas exigem JWT (cookie `access_token`), exceto onde indicado.

### Auth

| método | rota | auth | descrição |
| ------ | ---- | ---- | --------- |
| POST | `/auth/login` | público | login — seta cookie jwt |
| POST | `/auth/logout` | sim | remove o cookie |

### Users

| método | rota | auth | descrição |
| ------ | ---- | ---- | --------- |
| POST | `/users/register` | público | cadastro de novo usuario |
| GET | `/users/me` | sim | perfil do usuario logado |
| GET | `/users` | sim | listar todos |
| GET | `/users/:id` | sim | buscar por id |
| PATCH | `/users/:id` | sim | atualizar nome/email/senha |
| DELETE | `/users/:id` | sim | remover usuario |

### Barbershops

| método | rota | auth | descrição |
| ------ | ---- | ---- | --------- |
| POST | `/barbershops` | sim | criar barbearia |
| GET | `/barbershops` | sim | listar todas |
| GET | `/barbershops/:id` | sim | buscar por id |
| PATCH | `/barbershops/:id` | sim | atualizar |
| DELETE | `/barbershops/:id` | sim | remover |

### Barbershop Services

| método | rota | auth | descrição |
| ------ | ---- | ---- | --------- |
| POST | `/barbershop-services` | sim | criar serviço |
| GET | `/barbershop-services` | sim | listar todos |
| GET | `/barbershop-services/:id` | sim | buscar por id |
| PATCH | `/barbershop-services/:id` | sim | atualizar |
| DELETE | `/barbershop-services/:id` | sim | remover |

### Bookings

| método | rota | auth | descrição |
| ------ | ---- | ---- | --------- |
| POST | `/bookings` | sim | criar agendamento |
| GET | `/bookings` | sim | listar agendamentos do usuario logado |
| GET | `/bookings/:id` | sim | buscar por id (só o dono acessa) |
| PATCH | `/bookings/:id` | sim | alterar data ou serviço |
| DELETE | `/bookings/:id` | sim | cancelar agendamento |

---

## Banco de dados

```
Barbershop (1) ──── (N) BarbershopService
                              │
                              │ (N)
                           Booking
                              │
                              │ (N)
                            User (1)
```

Relações:
- `Barbershop` → `BarbershopService`: 1 para N
- `User` ↔ `BarbershopService` via `Booking`: N para M

---

## Variáveis de ambiente

Crie um `.env` na pasta `backend/` com:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/trimtech"
JWT_SECRET="sua_chave_secreta"
```

---

## Comandos

```bash
npm install                        # instala dependencias
npx prisma generate                # gera o client do prisma
npx prisma migrate dev             # roda migrations
npx prisma db seed                 # popula o banco com dados de exemplo
npm run start:dev                  # inicia em modo dev (hot reload)
npm run build                      # compila para producao
npm run test                       # testes unitarios
npm run test:cov                   # testes com cobertura
```

---

## Documentação interativa

Com o servidor rodando, acesse: http://localhost:8080/api
