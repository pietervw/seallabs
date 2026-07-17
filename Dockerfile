# syntax=docker/dockerfile:1

# Production image for Coolify / Docker hosts.
# Health: GET /api/health
#
# NEXT_PUBLIC_* values are inlined by `next build` — pass them as --build-arg
# (or Coolify build-time env). Runtime --env-file alone cannot fix missing client keys.
#
#   docker build -t seallabs \
#     --build-arg NEXT_PUBLIC_SITE_URL=https://seallabs.io \
#     .
#   docker run --rm -p 3000:3000 --env-file .env seallabs

ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-bookworm-slim AS deps
WORKDIR /app
RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates \
  && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json ./
RUN npm ci

FROM node:${NODE_VERSION}-bookworm-slim AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_SITE_URL=https://seallabs.io
ARG NEXT_PUBLIC_SITE_NAME=Seal Labs
ARG NEXT_PUBLIC_SITE_LEGAL_NAME=Seal Labs
ARG NEXT_PUBLIC_SUPPORT_EMAIL=hello@seallabs.io
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY=
ARG NEXT_PUBLIC_UMAMI_WEBSITE_ID=
ARG NEXT_PUBLIC_UMAMI_SRC=
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID=
ARG NEXT_PUBLIC_SOCIAL_GITHUB=
ARG NEXT_PUBLIC_SOCIAL_LINKEDIN=
ARG NEXT_PUBLIC_SOCIAL_X=
ARG NEXT_PUBLIC_SOCIAL_EMAIL=mailto:hello@seallabs.io

ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_SITE_NAME=$NEXT_PUBLIC_SITE_NAME \
    NEXT_PUBLIC_SITE_LEGAL_NAME=$NEXT_PUBLIC_SITE_LEGAL_NAME \
    NEXT_PUBLIC_SUPPORT_EMAIL=$NEXT_PUBLIC_SUPPORT_EMAIL \
    NEXT_PUBLIC_TURNSTILE_SITE_KEY=$NEXT_PUBLIC_TURNSTILE_SITE_KEY \
    NEXT_PUBLIC_UMAMI_WEBSITE_ID=$NEXT_PUBLIC_UMAMI_WEBSITE_ID \
    NEXT_PUBLIC_UMAMI_SRC=$NEXT_PUBLIC_UMAMI_SRC \
    NEXT_PUBLIC_GA_MEASUREMENT_ID=$NEXT_PUBLIC_GA_MEASUREMENT_ID \
    NEXT_PUBLIC_SOCIAL_GITHUB=$NEXT_PUBLIC_SOCIAL_GITHUB \
    NEXT_PUBLIC_SOCIAL_LINKEDIN=$NEXT_PUBLIC_SOCIAL_LINKEDIN \
    NEXT_PUBLIC_SOCIAL_X=$NEXT_PUBLIC_SOCIAL_X \
    NEXT_PUBLIC_SOCIAL_EMAIL=$NEXT_PUBLIC_SOCIAL_EMAIL

RUN npm run build

FROM node:${NODE_VERSION}-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates \
  && rm -rf /var/lib/apt/lists/* \
  && groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
