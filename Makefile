RJS=node node_modules/.bin/r.js
BROWSER=google-chrome
RUN_PORT=8082
TEST_PORT=8081
TEST_SERVER=http-server -p $(TEST_PORT)
JSDOC=node node_modules/.bin/jsdoc
JSHINT=node node_modules/.bin/jshint
LESSC=node node_modules/.bin/lessc
SOURCE=test/static/ src/server/ src/static/js/ src/static/pages/
DIST=dist

MOCHA=node node_modules/.bin/mocha-phantomjs
TEST_URL=test/static/test.html

YELLOW='\e[93m'
GREEN='\e[32m'
# disables color output
NC='\e[39m'

__START__=@echo -e $(YELLOW)\> make \'$@\'$(NC)
___OK___= @echo -e $(GREEN)\> make \'$@\' done $(NC)

.PHONY: help
help:
	$(__START__)

	@echo "available make targets:"
	@echo "    all           runs 'clean', 'test' and builds the project to $(DIST)/ folder"
	@echo "    clean         removes $(DIST)/ folder and it's contents"
	@echo "    test          generates unit test list and runs them"
	@echo "    test-server   generates a list of unit tests and runs the server for running them"
	@echo "    jshint        validates javascript files folders: $(SOURCE)"
	@echo "    help          prints this text"
	@echo "    run           run development version"
	@echo "    run-dist      run built version"
	@echo ""
	@echo "to run a target, type 'make <target>'".
	@echo ""
	@echo "note: only the main targets are described here, use others with caution"

	$(___OK___)

.PHONY: all
all: clean test
	$(__START__)
	$(__HELP__)

	# creating required subfolders...

	@mkdir $(DIST)
	@mkdir $(DIST)/static

	# copying content...

	@cp -r src/server $(DIST)/server
	@cp -r src/static/pages $(DIST)/static/pages
	@cp -r src/templates $(DIST)/templates

	@mkdir $(DIST)/static/js

	# running requirejs optimizer...

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
test: jshint test-gen mocha-phantomjs

.PHONY: mocha-phantomjs
mocha-phantomjs:
	$(__START__)
	# running unit tests: $(TEST_URL)

	@$(MOCHA) $(TEST_URL)

	$(___OK___)

.PHONY: test-gen
test-gen:
	$(__START__)
	# generating a list of unit tests

	@node test/static/find-tests.js

	$(___OK___)

.PHONY: test-server
test-server: test-gen test-server-start

.PHONY: test-server-start
test-server-start:
	$(__START__)
	# starting unit testing server"
	# visit http://localhost:$(TEST_PORT)/$(TEST_URL) to run tests

	@$(TEST_SERVER)
	RUN_SERVER=node

.PHONY: jshint
jshint:
	$(__START__)
	# will scan for javascript files in folders: $(SOURCE)

	@$(JSHINT) $(SOURCE)

	$(___OK___)

.PHONY: run
run:
	$(__START__)

	#visit http://localhost:$(RUN_PORT)/ after the server starts

	@PORT=$(RUN_PORT) node src/server/

	$(___OK___)

.PHONY: run-dist
run-dist:
	$(__START__)

	#visit http://localhost:$(RUN_PORT)/ after the server starts

	@PORT=$(RUN_PORT) dist/server/

	$(___OK___)