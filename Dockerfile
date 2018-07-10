# Build

FROM node:8.11.3-alpine AS build

WORKDIR /usr/src

ADD . .

RUN npm i && npm run build

# Production

FROM node:8.11.3-alpine

WORKDIR /usr/src

COPY --from=build /usr/src/dist/ ./dist/

ADD package.json package-lock.json ./

RUN npm i --production

ENV PORT=80
ENV SHUTDOWN_TIMEOUT=10000
ENV SERVICE_NAME=customer-area
ENV SERVICE_CHECK_HTTP=/healthcheck
ENV SERVICE_CHECK_INTERVAL=10s
ENV SERVICE_CHECK_TIMEOUT=2s

EXPOSE $PORT

ENTRYPOINT ["node", "dist/index.js"]
