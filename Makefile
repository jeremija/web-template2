RJS=node node_modules/.bin/r.js
BROWSER=google-chrome
SERVER_PORT=8080
SERVER=http-server -p $(SERVER_PORT)
JSDOC=node node_modules/.bin/jsdoc
JSHINT=node node_modules/.bin/jshint
LESSC=node node_modules/.bin/lessc
SOURCE=test/static/ src/server/ src/static/js/ src/static/pages/
DIST=dist

MOCHA=node node_modules/.bin/mocha-phantomjs
TEST_URL=test/static/test.html

YELLOW='\e[93m'
GREEN='\e[32m'
# disables color outut
NC='\e[39m'

___OK___= @echo -e $(GREEN)---- make \'$@\' done ----$(NC)
__START__=@echo -e $(YELLOW)---- run make \'$@\' -----$(NC)

.PHONY: help
help:
	$(__START__)

	@echo "available arguments:"
	@echo "    build - builds the project, outputs to $(DIST)/"
	@echo "    clean - removes $(DIST)/ folder and it's contents"
	@echo "    test - generates unit test list and runs them"
	@echo "    test-server - generates unit test list and runs the server for running them"
	@echo "    jshint - validates javascript files folders: $(SOURCE)"
	@echo "    help - prints this text"
	@echo ""
	@echo "note: only the main targets are described here, use others with caution"

	$(___OK___)

.PHONY: build
build:
	$(__START__)

	@echo "* creating required subfolders..."

	@mkdir $(DIST)
	@mkdir $(DIST)/static

	@echo "* copying content..."

	@cp -r src/server $(DIST)/server
	@cp -r src/static/pages $(DIST)/static/pages
	@cp -r src/templates $(DIST)/templates

	@mkdir $(DIST)/static/js

	@echo "* running requirejs optimizer..."

	@$(RJS) -o \
		name="app" \
		baseUrl="src/static/js" \
		paths.requireLib="../bower/requirejs/require" \
		include="requireLib" \
		optimize=none \
		mainConfigFile="./src/static/js/require/config.js" \
		out="$(DIST)/static/js/app.js" \
		preserveLicenseComments=false

	$(___OK___)

.PHONY: clean
clean:
	$(__START__)

	@rm -rf $(DIST)

	$(___OK___)

.PHONY: test
test: test-gen mocha-phantomjs

.PHONY: mocha-phantomjs
mocha-phantomjs:
	$(__START__)
	@echo "* running unit tests..."

	@$(MOCHA) $(TEST_URL)

	$(___OK___)

.PHONY: test-gen
test-gen:
	$(__START__)
	@echo "* generating a list of unit tests"

	@node test/static/find-tests.js

	$(___OK___)

.PHONY: test-server
test-server: test-gen test-server-start

.PHONY: test-server-start
test-server-start:
	$(__START__)
	@echo "* starting unit testing server"
	@echo "* visit http://localhost:$(SERVER_PORT)/$(TEST_URL) to run tests"

	@$(SERVER)

.PHONY: jshint
jshint:
	$(__START__)
	@echo "* will scan for javascript files in folders: $(SOURCE)"

	@$(JSHINT) $(SOURCE)

	$(___OK___)