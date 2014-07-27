RJS=node node_modules/.bin/r.js
BROWSER=google-chrome
SERVER_PORT=8080
SERVER=http-server -p $(SERVER_PORT)
JSDOC=node node_modules/.bin/jsdoc
JSHINT=node node_modules/.bin/jshint
LESSC=node node_modules/.bin/lessc
SOURCE=src/js/**/*.js

.PHONY: build
build:
	@mkdir dist
	@mkdir dist/static
	@cp -r src/server dist/server
	@cp -r src/static/pages dist/static/pages
	@cp -r src/templates dist/templates

	@mkdir dist/static/js

	# name="../b"
	@$(RJS) -o \
		name="app"
		baseUrl="src/static/js" \
		include="app" \
		optimize=none \
		mainConfigFile="./src/static/js/require/config.js" \
		out="" \
		preserveLicenseComments=false

.PHONY: clean
clean:
	@rm -rf dist