#!/bin/bash
.PHONY: default
.SILENT:
# VARIABLES 
SERVICE ?=all
FRONT_SERVICE ?=vue-knowledge-front
STORYBOOK_SERVICE ?=storybook

default:

setup:
	docker network create vue-knowledge-front-network || true

start:
ifeq ($(SERVICE), all)
	docker-compose -f docker-compose.yml up --detach --force-recreate --build --remove-orphans
else
	docker-compose -f docker-compose.yml up $(SERVICE) --detach --force-recreate --build --remove-orphans	
endif

start-front: 
	docker-compose -f docker-compose.yml up $(FRONT_SERVICE) --detach --force-recreate --build --remove-orphans

start-storybook: 
	docker-compose -f docker-compose.yml up $(STORYBOOK_SERVICE) --detach --force-recreate --build --remove-orphans

start-no-detach:
	docker-compose -f docker-compose.yml up --force-recreate --build --remove-orphans

stop:
	docker-compose -f docker-compose.yml down --remove-orphans

shell:
	docker-compose -f docker-compose.yml stop vue-knowledge-front
	docker-compose -f docker-compose.yml run --rm --service-ports vue-knowledge-front bash

restart:
	docker-compose -f docker-compose.yml down --remove-orphans
	docker-compose -f docker-compose.yml up --detach --force-recreate --build --remove-orphans

logs:
	docker-compose -f docker-compose.yml logs -f

run-tests-coverage:
	docker-compose -f docker-compose.yml run -it vue-knowledge-front npm run test:unit-coverage

run-tests:
	docker-compose -f docker-compose.yml run -it vue-knowledge-front npm run test:unit

ps:
	docker-compose -f docker-compose.yml ps

clean-containers:
	docker-compose -f docker-compose.yml rm --force --stop -v

clean-volumes:
	docker-compose -f docker-compose.yml down --remove-orphans --volumes

clean-layers:
	-docker images -q -f dangling=true | xargs docker rmi -f

clean-images: clean-layers
	docker-compose -f docker-compose.yml down --remove-orphans --volumes --rmi local

clean-all: clean-layers
	docker-compose -f docker-compose.yml down --remove-orphans --volumes --rmi all