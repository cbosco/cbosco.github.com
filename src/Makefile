.PHONY: all build

all: build

# generates html from markdown and JSON
build:
	./node_modules/.bin/coffee \
		build.coffee > ./app/assets/work/index.html

# for development on the UI
# runs a simple node server since it needs to be a 
# static site at localhost root
watch: build
	./node_modules/.bin/brunch watch --server
