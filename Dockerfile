FROM alpine:latest

LABEL author="Bartosz Kozaczuk"

RUN apk update && \
    apk add --no-cache nodejs npm curl
WORKDIR /app

COPY ./src/package.json ./package.json
COPY ./src/server.js ./server.js

RUN npm install --production
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/ || exit 1

CMD ["node", "server.js"]
