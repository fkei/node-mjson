all: jshint test

jshint:
	./node_modules/jshint/bin/jshint --config .jshintrc .

test:
	cd test; ./test.sh
	@echo

.PHONY: all jshint test
