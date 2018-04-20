
install:
	yarn

start:
	yarn start

test:
	yarn test

# DEPLOYMENT

lint: ## Verify the code and check coding conventions. Usage: make lint
	./node_modules/.bin/eslint public src

prettier: ## Prettify the source code using prettier. Usage: make prettier
	./node_modules/.bin/prettier-eslint --write --list-different "public/**/*.js" "src/**/*.js"
