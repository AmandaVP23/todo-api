FROM node:20

WORKDIR /app

COPY . .
RUN chmod +x /app/wait-for-db.sh
RUN chmod +x /app/docker-start.sh

# RUN yarn global add pm2
RUN apt-get update && apt-get install -y netcat-openbsd

RUN yarn install

RUN yarn build

EXPOSE 8080

# CMD ["./wait-for-db.sh", "db", "yarn", "typeorm", "migration:run", "&&", "yarn", "start:prod"]

# CMD ./wait-for-db.sh db yarn typeorm migration:run && yarn start:prod
CMD ./docker-start.sh

# CMD ["pm2", "start", "dist/main.js"]
# CMD ["./wait-for-db.sh", "db", "yarn typeorm migration:run && yarn start:prod"]