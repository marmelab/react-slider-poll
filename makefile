.PHONY: help install start build test lint prettier

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help

## Install

install: ## Install dependencies. `Usage: make install`.
	yarn install

## Development

PORT ?= 8000

start: ## Run the example in development mode. `Usage: (PORT=8000) make run`.
	PORT=$(PORT) yarn start

## Production

build: ## Build the example application. Usage: `make build`.
	rm -rf build
	yarn build

## Contribute

test: ## Run tests. Usage: `make test`.
	yarn test

lint: ## Verify the code and check coding conventions. Usage: make lint
	./node_modules/.bin/eslint public src

prettier: ## Prettify the source code using prettier. Usage: make prettier
	./node_modules/.bin/prettier-eslint --write --list-different "public/**/*.js" "src/**/*.js"
