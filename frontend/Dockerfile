# ---- Base Node ----
FROM node:12-alpine3.12 AS base
WORKDIR /app

# ---- Dependencies ----
FROM base AS dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn

# ---- Copy Files/Build ----
FROM dependencies AS build
COPY . /app
RUN yarn build

# ---- Prod Dependencies ----
FROM base AS prodDependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn --production

# ---- Release ----
FROM base AS release
COPY --from=prodDependencies /app/package.json ./
COPY --from=prodDependencies /app/yarn.lock ./
COPY --from=prodDependencies /app/node_modules ./node_modules
COPY --from=build /app/src ./src
EXPOSE 80
CMD ["yarn", "start"]
