FROM docker.repo.tehik.ee/node:lts-bullseye-slim
WORKDIR /workspace

COPY package*.json /workspace/
RUN npm ci

COPY ./ /workspace/

RUN npm run build
RUN cd ./dist/packages/components
RUN npm publish
