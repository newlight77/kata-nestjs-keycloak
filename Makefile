#!make

# Makefile for Demo Auth Serve
SHELL := /bin/sh


export ENV ?= local

#export BUILD = $(shell git describe --always)-$(shell date +%Y%m%d%H%M%S)
export TAG = $(shell git describe --abbrev=0 --tags)
#BRANCH = $(shell git branch --show-current)
export VERSION ?= $(shell git describe --always)
export SHORT_VERSION ?= $(git describe --always | cut -d'-' -f1)

$(info environment = $(ENV))
$(info version = $(VERSION))

env:
	@env

help: ## Display this help screen
	@grep -h -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

clean: dc-clean

dc-build:
# required for M1
	@./build-keycloak-image.sh

	@docker system prune -f
	@docker-compose build backend

dc-build-push:
	@docker system prune -f
	@docker-compose build backend
	@docker-compose push backend

dc-push:
	@docker-compose push backend

dc-pull:
	@docker-compose pull

dc-up:
	@docker-compose up -d

dc-up-latest:
	@VERSION=latest && docker-compose up -d

dc-down:
	@docker-compose down

dc-down-clean:
	@docker-compose down
	@docker volume prune
	@docker network prune

dc-clean:
	@docker system prune
	@docker volume prune
	@docker network prune

dc-restart: down up


# make test-api testId=test1
test-api-local:
	@./test-api.sh --api-url=http://localhost:3000/api --client-id=local.frontend.http.localhost-4200 --token-url=http://localhost:1080/auth/realms/local.app/protocol/openid-connect/token --username=newlight77+${testId}@gmail.com

token: 
	@./test-api.sh