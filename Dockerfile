FROM node:14.15.5-alpine3.13 AS development

WORKDIR /code/app

COPY package*.json ./
RUN npm install

COPY ./src ./src
RUN npm run build

#########################################

FROM node:14.15.5-alpine3.13 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN addgroup -S backend && adduser -S backend -G backend
# RUN adduser backend

WORKDIR /code/app

COPY package*.json ./

RUN npm install --only=production

COPY --from=development /code/app/dist ./dist

USER backend:backend

# application
EXPOSE 3000
# debug
EXPOSE 3080 

CMD ["node", "dist/main"]