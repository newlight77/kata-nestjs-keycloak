FROM node:14.15.5-alpine3.13 AS builder

ARG ENV=production
ENV ENV=${ENV}

WORKDIR /code/app

COPY package*.json ./

RUN if [ "$ENV" = "local" -o "$ENV" = "localhost" ] ; then \
        npm install --only=development ; \
    fi

RUN if [ "$ENV" = "dev" -o "$ENV" = "prod" ] ; then \
        npm install --only=production ; \
    fi

COPY . .

RUN npm run build

#########################################

FROM node:14.15.5-alpine3.13

RUN addgroup -S backend && adduser -S backend -G backend
# RUN adduser backend

COPY --from=builder /code/app/dist ./dist

RUN echo '# front' >> ./.build
RUN echo 'ENV=${ENV}' >> ./.build

RUN cat ./.build

USER backend:backend

# application
EXPOSE 3000
# debug
EXPOSE 3080 

CMD ["node", "dist/main"]