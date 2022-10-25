FROM docker.repo.tehik.ee/node:lts-bullseye-slim
WORKDIR /workspace

COPY package*.json /workspace/
RUN npm ci

COPY ./ /workspace/

RUN npm run build
# COPY ./.npmrc ./dist/packages/components
WORKDIR /workspace/dist/packages/components
RUN npm publish
