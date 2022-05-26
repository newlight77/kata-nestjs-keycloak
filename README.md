
# Job Posting Application

## TODO

- ARCHI: type-safe Error handling : https://dev.to/_gdelgado/type-safe-error-handling-in-typescript-1p4n
- DDD: implement aggregates, value objects, entities, repositories, factories (vs hexagonal)
- NEST: implement NestJs events listene and emiter : https://docs.nestjs.com/techniques/events
- NEST: lazy loading modules : https://blog.devgenius.io/nestjs-with-dynamic-module-loading-6391baf94f43
- ES: implements event sourcing with an event store
- ARCHI: expose a new GraphQL API
- TEST: add more code coverage
- BUILD: add github actions
- RUN: create deployement script for kubernetes

## DONE

- TEST: using [nyc](https://github.com/istanbuljs/nyc) to get code coverage from unit and cucumber tests
- TEST: setup in-memory databsae for typeorm : https://dkzeb.medium.com/unit-testing-in-ts-jest-with-typeorm-entities-ad5de5f95438
- TEST: ATTDD using cucumber to test the exposed interfaces
- TEST: ATTDD using cucumber to test usecases of the domain
- TEST: write feature files
- TEST: configure cucumber
- CQRS: implement CQRS
- DB: add script for typeorm migratation
- DB: add seed script to populate data in the database
- DB: externalise the configuration of TypeORM
- DB: using TypeORM to connect entites to the database
- BUILD: use docker-compose to launch postgres as database
- TEST: add unit tests
- FEATURE: expose jobs crud operations
- FEATURE: expose jobs search by keywords
- FEATURE: expose signup api and service
- AUTH: implement a keycloak client for signup
- AUTH: use of nest-keycloak-connect and add JwtAuthGuard
- TEST: add test-api.sh to retrieve a token from keycloak token api
- BUILD: add keycloak configuration and use in docker-compose, add a script to build a M1 based image
- BUILD: add a Makefile to encapsulate running commands
- BUILD: dockerise the applicaiton
- ARCHI: segregate modules
- ARCHI: implement an hexagonal architecture : https://newlight77.medium.com/hexagonal-architecture-a7d956dc4782
- LINT: add prettier and tslint, customise configuration in .prettierrc and eslintrc.js : https://github.com/prettier/eslint-plugin-prettier#options
- NEST: bootstrap a nestjs application codebase
