node-mjson
==========

![Travis CI](https://travis-ci.org/fkei/node-mjson.png?branch=master)

Command : \[JSON format string\]\(stdin\) -> mjson -> \[JSON shaping string\]\(stdout\)

### TIPS

```
Simple minifier for JSON to remove comments and whitespace.

Color mode support. (cmd-option: -C)
```

# ScreenShots

**Success**

![success](https://raw.github.com/fkei/node-mjson/master/screenshots/success.png)

**Error**

![error](https://raw.github.com/fkei/node-mjson/master/screenshots/error.png)


# install

## npm repo

```
$ npm install mjson
```

##  npm source

```
$ npm install https://github.com/fkei/node-mjson.git
```

# example

## Case 1

```
$ cat ./test/comment.json | mjson.js
--
{
    "foo": "bar",
    "bar": [
        "baz",
        "bum",
        "zam"
    ],
    "something": 10,
    "else": 20
}
```

## Case 2

```
$ echo '{"hoge": 1}' |  mjson.js
--
{
    "hoge": 1
}
```

## Case 3

```
$ echo '{"hoge": /** comment **/1}' |  mjson.js
--
{
    "hoge": 1
}
```

## Case 4 (indent 1)

```
$ echo '{"hoge": /** comment **/1}' |  mjson.js -i ' '
--
{
 "hoge": 1
}
```

## Case 5 (color mode)

```
$ echo '{"hoge": /** comment **/1}' |  mjson.js -i ' ' -C
--
{
 "hoge": 1
}
```


# command-line options

## Case 1: read file -> stdout

```
$ mjson.js -s ./comment.json
```

## Case 2 read file -> write file


```
$ mjson.js -s ./comment.json -o /tmp/test-mjson.json
```

## Case 3 read file (args) -> stdout

```
$ mjson.js ./comment.json
```

> Detailed usage, `test/test.sh`

## help
```
$ mjson.js --help

  Usage: mjson.js [options]

  Options:

    -h, --help            output usage information
    -V, --version         output the version number
    -d --debug            debug mode
    -C --color            color mode
    -i --indent <indent>  indent string (default: space 4)
    -s --src <src>        Read file path
    -o --out <out>        Write file path
    -e --encode <encode>  Read/Write file encode. default) utf8
    -f --force            Overwrite output file

```

# test

```
$ make test
```

# jshint

```
$ make jshint
```

# Changelog

@see: [Changelog](https://github.com/fkei/node-mjson/blob/master/Changelog)

# LICENSE

```
The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
