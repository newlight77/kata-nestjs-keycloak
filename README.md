
# Job Posting Application

[repository](https://github.com/newlight77/app-jobs-nestjs-keycloak) maintained by newlight77.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# start database for dev
$ npm run start:dev:db

# seed data for dev
$ npm run start:dev:db:seed

# watch mode
$ npm run start:dev

# debug mode
$ npm run start:debug:remote

# debug from remote mode
$ npm run start:debug:remote

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test cucumber domain
$ npm run test:features:domain

# test cucumber interface
$ npm run test:features:interface

# test coverage
$ npm run test:cov
```

## TODO

- ATTDD using cucumber to test the exposed interface
- Type-safe Error handling : https://dev.to/_gdelgado/type-safe-error-handling-in-typescript-1p4n
- expose a new GraphQL API
- Persist data in a event store
- Implement event source
- 

## DONE

- ATTDD using cucumber to test usecase of the domain
- write feature files
- configure cucumber
- implement CQRS
- add script for typeorm migratation
- add seed script to populate data in the database
- externalise the configuration of TypeORM
- using TypeORM to connect entites to the database
- use docker-compose to launch postgres as database
- add unit tests
- expose jobs crud operations
- expose jobs search by keywords
- expose signup api and service
- implement a keycloak client for signup
- use of nest-keycloak-connect and add JwtAuthGuard
- add test-api.sh to retrieve a token from keycloak token api
- add keycloak configuration and use in docker-compose, add a script to build a M1 based image
- add a Makefile to encapsulate running commands
- dockerise the applicaiton
- segregate modules 
- implement an hexagonal architecture : https://newlight77.medium.com/hexagonal-architecture-a7d956dc4782
- add prettier and tslint, customise configuration in .prettierrc and eslintrc.js : https://github.com/prettier/eslint-plugin-prettier#options
- bootstrap a nestjs application codebase
