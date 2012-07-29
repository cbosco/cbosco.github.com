.PHONY: all build

all: build

build:
	./node_modules/.bin/coffee \
		build.coffee > ./assets/work/index.html
