FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# gera o client prisma antes de buildar
RUN npx prisma generate
RUN npm run build

# imagem final sem dependencies
FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 8080

# roda as migrations e depois sobe o servidor
CMD sh -c "npx prisma migrate deploy --schema=prisma/schema.prisma && node dist/main"
