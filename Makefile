.PHONY: all build

all: build

# generates html from markdown and JSON
build:
	./node_modules/.bin/coffee \
		build.coffee > ./app/assets/work/index.html

# for development on the UI
watch:
	./node_modules/.bin/brunch watch
