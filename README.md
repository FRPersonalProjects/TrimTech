<!--- # Exemplo de imagem (opcional)

<p align="center">
	<img src=".github/example.png" alt="Barber Shop SaaS">
</p>-->

# Barber Shop SaaS — API Backend

Este repositório contém o backend e frontend do projeto "Barber Shop SaaS": uma aplicação para gerenciamento de barbearias, serviços e agendamentos, feita para praticar conceitos fullstack

## Tech Stack

[![My Skills](https://skillicons.dev/icons?i=ts,nodejs,nestjs,prisma,postgres,nextjs,tailwind)](https://skillicons.dev)

## Estrutura do repositório

- `backend/` — NestJS + PrismaORM + Postgresql
- `frontend/` — Next.js + Tailwind (UI)

## Iniciando (development)

1. Instale dependências na raiz (opcional) e em cada pacote:

```bash
# raiz (opcional)
npm install

# backend
cd backend && npm install

# frontend
cd ../frontend && npm install
```

2. Variáveis de ambiente: crie/edite o arquivo `.env` (na raiz ou em `backend/`) com suas chaves. Exemplo mínimo para o `backend`:

```
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

3. Gerar client Prisma (no `backend`):

```bash
cd backend
npx prisma generate
```

4. Rodar migrações (desenvolvimento):

```bash
npx prisma migrate dev --name init_db
```

5. Popular banco (seed):

```bash
npx prisma db seed
```

6. Iniciar em desenvolvimento:

```bash
# backend
npm run start:dev

# frontend
cd ../frontend && npm run dev
```

<!---## Endpoints principais (resumo)

<details>
	<summary><strong>Auth</strong></summary>

| rota | descrição |
| ---- | --------- |
| <kbd>POST /auth/signin</kbd> | Autenticação / login |

</details>

<details>
	<summary><strong>User</strong></summary>

| rota | descrição |
| ---- | --------- |
| <kbd>POST /user</kbd> | Criar usuário |
| <kbd>GET /user/:id</kbd> | Obter usuário por ID (auth) |
| <kbd>PATCH /user/:id</kbd> | Atualizar usuário (auth) |
| <kbd>DELETE /user/:id</kbd> | Remover usuário (auth) |

</details>

<details>
	<summary><strong>Barbershops</strong></summary>

| rota | descrição |
| ---- | --------- |
| <kbd>POST /barbershops</kbd> | Criar barbearia |
| <kbd>GET /barbershops</kbd> | Listar barbearias |
| <kbd>GET /barbershops/:id</kbd> | Obter barbearia por ID |
| <kbd>PATCH /barbershops/:id</kbd> | Atualizar barbearia |
| <kbd>DELETE /barbershops/:id</kbd> | Remover barbearia |

</details>

<details>
	<summary><strong>Services</strong></summary>

| rota | descrição |
| ---- | --------- |
| <kbd>POST /barbershops/:id/services</kbd> | Criar serviço para barbearia |
| <kbd>GET /services</kbd> | Listar serviços |
| <kbd>GET /services/:id</kbd> | Obter serviço por ID |
| <kbd>PATCH /services/:id</kbd> | Atualizar serviço |
| <kbd>DELETE /services/:id</kbd> | Remover serviço |

</details>

<details>
	<summary><strong>Bookings</strong></summary>

| rota | descrição |
| ---- | --------- |
| <kbd>POST /bookings</kbd> | Criar agendamento |
| <kbd>GET /bookings</kbd> | Listar agendamentos |
| <kbd>GET /bookings/:id</kbd> | Obter agendamento por ID |
| <kbd>PATCH /bookings/:id</kbd> | Atualizar agendamento |
| <kbd>DELETE /bookings/:id</kbd> | Cancelar agendamento |

</details>-

> Observação: rotas e nomes podem variar conforme implementação — use o código em `backend/src` para referência exata. -->

## Contribuir

1. Clone o repositório: `git clone <repo>`
2. Crie uma branch de feature: `git checkout -b feature/nomedafuncao`
3. Siga o padrão de commits e abra um Pull Request explicando a mudança.

## Documentação útil

- [Prisma Docs](https://www.prisma.io/docs)
- [NestJS Docs](https://docs.nestjs.com)
- [Next.js Docs](https://nextjs.org/docs)
