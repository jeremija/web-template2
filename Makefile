RJS=node node_modules/.bin/r.js
BROWSER=google-chrome
SERVER_PORT=8080
SERVER=http-server -p $(SERVER_PORT)
JSDOC=node node_modules/.bin/jsdoc
JSHINT=node node_modules/.bin/jshint
LESSC=node node_modules/.bin/lessc
SOURCE=test/static/ src/server/ src/static/js/ src/static/pages/

MOCHA=node node_modules/.bin/mocha-phantomjs
TEST_URL=test/static/test.html

YELLOW='\e[93m'
GREEN='\e[32m'
NO_COLOR='\e[39m'

___OK___=echo -e $(GREEN)done$(NO_COLOR) '\n'

.PHONY: build
build:
	@echo -e $(YELLOW)build: starting build$(NO_COLOR)

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
	@echo -e $(YELLOW)cleaning dist/ folder$(NO_COLOR)

	@rm -rf dist

	@$(___OK___)

.PHONY: test
test: test-gen mocha-phantomjs

.PHONY: mocha-phantomjs
mocha-phantomjs:
	@echo -e $(YELLOW)mocha-phantomjs: running unit tests$(NO_COLOR)

	@$(MOCHA) $(TEST_URL)

	@$(___OK___)

.PHONY: test-gen
test-gen:
	@echo -e $(YELLOW)test-gen: generating unit tests list$(NO_COLOR)

	@node test/static/find-tests.js

	@$(___OK___)

.PHONY: test-server
test-server: test-gen test-server-start

.PHONY: test-server-start
test-server-start:
	@echo -e $(YELLOW)test-server-start: starting unit tests server$(NO_COLOR)

	@echo visit http://localhost:$(SERVER_PORT)/$(TEST_URL) to run tests

	@$(SERVER)

.PHONY: jshint
jshint:
	@echo -e $(YELLOW)jshint - scanning source folders: $(SOURCE) $(NO_COLOR)

	@$(JSHINT) $(SOURCE)

	@$(___OK___)