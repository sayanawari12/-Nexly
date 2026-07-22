# ── Stage 1: Builder ──────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package manifests first
COPY package*.json ./

# Copy prisma directory and configuration before dependency installation
COPY prisma ./prisma/
COPY prisma.config.ts ./

# Install dependencies (runs postinstall -> prisma generate)
RUN npm ci || npm install

# Copy TypeScript configuration and source files
COPY tsconfig.json ./
COPY src ./src

# Force explicit generation of fresh Prisma Client types for Alpine Linux target
RUN npx prisma generate

# Compile TypeScript code to JS in dist
RUN npm run build

# Prune devDependencies to keep production node_modules lean
RUN npm prune --production

# ── Stage 2: Runtime ──────────────────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy package info, node_modules (with generated Prisma Client), compiled dist, and schema
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./

EXPOSE 5000

CMD ["npm", "start"]