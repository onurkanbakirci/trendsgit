FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat openssl openssl-dev python3 make g++ gcc
WORKDIR /app

# Copy prisma files first to ensure schema is available
COPY prisma ./prisma/

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma/

# Copy remaining files
COPY . .
# Remove any .env files that might have been copied
RUN rm -f .env .env.* || true

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED=1

# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Install OpenSSL in the runner stage
RUN apk add --no-cache openssl openssl-dev libc6-compat

# Create the nextjs user and group
RUN addgroup -g 1001 nodejs
RUN adduser -S nextjs -u 1001 -G nodejs

# Copy necessary files and directories
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Copy node_modules and prisma files
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma/

# Regenerate Prisma Client in the runner stage
RUN npx prisma generate

# Set the correct permission for prerender cache and prisma directory
RUN mkdir .next
RUN chown nextjs:nodejs /app/.next

# Ensure prisma directory and database file have correct permissions
RUN chown -R nextjs:nodejs /app/prisma
RUN chmod 755 /app/prisma
RUN chmod 644 /app/prisma/trendsgit.db || true
RUN chmod 644 /app/prisma/schema.prisma

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
# Set DATABASE_URL environment variable to match Prisma schema
ENV DATABASE_URL="file:/app/prisma/trendsgit.db"

ENTRYPOINT ["node", "server.js"] 