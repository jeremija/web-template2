RJS=node node_modules/.bin/r.js
BROWSER=google-chrome
SERVER_PORT=8080
SERVER=http-server -p $(SERVER_PORT)
JSDOC=node node_modules/.bin/jsdoc
JSHINT=node node_modules/.bin/jshint
LESSC=node node_modules/.bin/lessc
SOURCE=src/js/**/*.js

MOCHA=node node_modules/.bin/mocha-phantomjs
TEST_URL=test/static/test.html

GREEN='\e[32m'
NO_COLOR='\e[39m'

___OK___=echo -e $(GREEN)---- OK ----$(NO_COLOR)

.PHONY: build
build:
	@mkdir dist
	@mkdir dist/static
	@cp -r src/server dist/server
	@cp -r src/static/pages dist/static/pages
	@cp -r src/templates dist/templates

	@mkdir dist/static/js

	@$(RJS) -o \
		name="app" \
		baseUrl="src/static/js" \
		paths.requireLib="../bower/requirejs/require" \
		include="requireLib" \
		optimize=none \
		mainConfigFile="./src/static/js/require/config.js" \
		out="dist/static/js/app.js" \
		preserveLicenseComments=false

	@$(___OK___)

.PHONY: clean
clean:
	@rm -rf dist
	@$(___OK___)

.PHONY: test
test: test-gen mocha-phantomjs

.PHONY: mocha-phantomjs
mocha-phantomjs:
	$(MOCHA) $(TEST_URL)
	@$(___OK___)

.PHONY: test-gen
test-gen:
	@node test/static/find-tests.js
	@$(___OK___)

.PHONY: test-server
test-server: test-gen test-server-start

.PHONY: test-server-start
test-server-start:
	@echo -e "starting unit tests server"
	@echo -e "visit http://localhost:$(SERVER_PORT)/$(TEST_URL) to run tests"
	@$(SERVER)
