# install node_modules
FROM oven/bun:latest AS modules
WORKDIR /app
COPY package.json .
COPY bun.lockb .
RUN bun install

# build the files
FROM oven/bun:latest as builder
WORKDIR /app
COPY --from=modules /app/node_modules node_modules/
COPY . .
RUN bun run build

FROM oven/bun:latest as builder
ARG PORT
COPY --from=modules /app/node_modules node_modules/
COPY --from=builder /app/build /app/build

EXPOSE $PORT
CMD ["bun", "./build/index.js"]
