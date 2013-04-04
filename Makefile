all: jshint test

jshint:
	./node_modules/jshint/bin/jshint --config .jshintrc .

test:
	@echo '{"hoge": /** saaa **/"hoge"}' | node ./test/mjson.bin -d -i '  '

.PHONY: all jshint test
