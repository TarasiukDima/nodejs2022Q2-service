FROM node:16.16-alpine3.16

WORKDIR /app/musicify/

COPY package*.json .

RUN npm ci --legacy-peer-deps

COPY --chown=node:node . .

COPY --chown=node:node ./.env.example ./.env

EXPOSE ${PORT}

CMD ["npm", "run", "start:migration_dev"]
