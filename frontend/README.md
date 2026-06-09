# TrimTech — Frontend

Interface do TrimTech, feita com Next.js 14 (App Router) + Tailwind CSS.

## Stack

- **Next.js 14** — app router, server components, server actions
- **Tailwind CSS** — estilização
- **shadcn/ui** — componentes base (button, card, badge, avatar, input)
- **Lucide React** — ícones

---

## Estrutura de pastas

```
src/
├── app/
│   ├── layout.tsx                  # layout raiz (fonte, globals)
│   ├── not-found.tsx               # pagina 404
│   ├── globals.css
│   │
│   ├── (auth)/                     # grupo de rotas publicas
│   │   ├── login/page.tsx          # tela de login
│   │   └── register/page.tsx       # tela de cadastro
│   │
│   ├── (home)/
│   │   └── page.tsx                # home — lista de barbearias
│   │
│   ├── barbershops/
│   │   └── [id]/page.tsx           # detalhes da barbearia
│   │
│   └── bookings/
│       └── page.tsx                # meus agendamentos
│
├── components/
│   ├── header.tsx                  # cabecalho com logo e menu
│   ├── barbershop-item.tsx         # card de barbearia na listagem
│   ├── booking-item.tsx            # card de atalho para agendamentos
│   ├── logout-button.tsx           # botao de sair
│   └── ui/                         # componentes shadcn
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       └── input.tsx
│
├── services/                       # chamadas para a api
│   ├── api.ts                      # fetch base com tratamento de erro
│   ├── auth.ts                     # login e logout
│   ├── barbershop.ts               # listar e buscar barbearias
│   ├── booking.ts                  # criar, listar e cancelar agendamentos
│   └── user.ts                     # perfil e cadastro
│
├── constants/
│   └── quickSearchOptions.ts       # opcoes de busca rapida na home
│
├── lib/
│   └── utils.ts                    # helper do tailwind (cn)
│
└── middleware.ts                   # redireciona para /login se nao autenticado
```

---

## Telas

| rota | descrição |
| ---- | --------- |
| `/login` | login com email e senha |
| `/register` | cadastro de novo usuario |
| `/` | home com busca e listagem de barbearias |
| `/barbershops/:id` | detalhes da barbearia (nome, endereço, serviços) |
| `/bookings` | agendamentos do usuario — proximos e finalizados |

---

## Autenticação

O middleware (`src/middleware.ts`) protege todas as rotas. Se o cookie `access_token` não existir, redireciona para `/login`. Rotas `/login` e `/register` redirecionam para `/` se já estiver logado.

---

## Variáveis de ambiente

Crie um `.env.local` na pasta `frontend/` com:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

---

## Comandos

```bash
npm install        # instala dependencias
npm run dev        # inicia em modo dev
npm run build      # build de producao
npm run lint       # verifica erros de lint
npm start          # inicia o servidor de producao
```

---

## Deploy

O deploy é feito automaticamente na Vercel via GitHub Actions sempre que há push em `main` com mudanças em `frontend/` e o build passa. Veja [`.github/workflows/frontend.yml`](../.github/workflows/frontend.yml).
