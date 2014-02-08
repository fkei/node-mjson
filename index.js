#!/usr/bin/env node

/**
 * @fileOverview mjson command-line
 * @name index.js
 * @author Kei Funagayama <kei.topaz@gmail.com>
 */

var fs = require('fs');
var commander = require('commander');
var jsonminify = require('jsonminify');
var colors = require('colors');
var jsonlint = require('jsonlint');
var VERSION = '0.4.2';

//////////

var debug = function () {};

var isFileSync = function (p) {
    if (!fs.existsSync(p)) {
        return false;
    }
    var stats = fs.statSync(p);
    return stats.isFile();
};

var readJsonSync = function (path) {
    var raw = fs.readFileSync(path, commander.encode);
    return raw;
};

var minify = function (raw, color) {
    var output = '';
    raw = jsonminify(raw);

    try {
        output = JSON.stringify(JSON.parse(raw), null, commander.indent);
    } catch (e1) {
        try {
            jsonlint.parse(raw);
        } catch (e2) {
            throw e2;
        }
    }
    if (color && commander.color) {
        debug('color on');
        output = output.replace(/\"(.*?)\"/g, "\"$1\"".green);
        //output = output.replace(/\"(.*?)\"/g, colors['red']("\"$1\""));
    } else {
        debug('color off');
    }
    return output;

};


//////////

/**
 * STDIN -> STDOUT
 */
var stdin2stdout = function () {
    var stdin = '';
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', function (chunk) {
        stdin += chunk;
        debug(chunk);
    });

    process.stdin.on('end', function () {
        var output = minify(stdin, true);
        process.stdout.write(output);
    });
    return 0;
};

/**
 * FILE -> STDOUT
 */
var file2stdout = function (path) {
    if (path) {
        commander.src = path;
    }

    if (!isFileSync(commander.src)) {
        console.error('--src or -s file can not be read. --src:', commander.src);
        return 2;
    }
    var output = readJsonSync(commander.src);
    output = minify(output, true);
    process.stdout.write(output);

    return 0;
};

/**
 * FILE -> FILE
 */
var file2file = function () {
    if (!isFileSync(commander.src)) {
        console.error('--src or -s file can not be read. --src:', commander.src);
        return 2;
    }

    var output = readJsonSync(commander.src);
    output = minify(output, false);

    // write
    debug('-- data start');
    debug(output);
    debug('-- data end');

    if (commander.force) {
        debug('Overwrite remove output file. path:', commander.out);
        fs.unlinkSync(commander.out);
    }

    if (isFileSync(commander.out)) {
        console.error('--out or -o file already exists --out:', commander.out);
        return 2;
    }

    fs.writeFileSync(commander.out, output, commander.encode);
    console.info('output:', commander.out);

    return 0;

};

//////////

var main = exports.main = function main () {
    colors.setTheme({
        silly: 'rainbow',
        input: 'grey',
        verbose: 'cyan',
        prompt: 'grey',
        info: 'green',
        data: 'grey',
        help: 'cyan',
        warn: 'yellow',
        debug: 'blue',
        error: 'red',
        err: 'red',
        title: 'yellow'
    });

    commander
        .version(VERSION)
        .description('Formatted output to the standard output, standard input (string JSON)')
        .option('-d --debug', 'debug mode')
        .option('-C --color', 'color mode')
        .option('-i --indent <indent>', 'indent string (default: space 4)', String, '    ')
        .option('-s --src <src>', 'Read file path', String)
        .option('-o --out <out>', 'Write file path', String)
        .option('-e --encode <encode>', 'Read/Write file encode. default) utf8', String, 'utf8')
        .option('-f --force', 'Overwrite output file')
        .parse(process.argv)
    ;
    if (commander.debug) {
        debug = function() {
            var msg = "";
            var ary = Array.prototype.slice.call(arguments);
            for (var i = 0; i < ary.length; i++) {
                0 < i ? msg += ' '+ary[i]: msg+=ary[i];
            }

            console.error('debug:'.debug, msg);
        };
        //debug = debug;
        console.info("info:".info, "debug mode.");
    }

    var ret = 0;

    //console.log(commander);
    if (0 < commander.args.length) {
        debug('select file2stdout args');
        ret = file2stdout(commander.args[0]);
        process.exit(ret);
    } else if (commander.src && commander.out) {
        debug('select file2file');
        ret = file2file();
        process.exit(ret);
    } else if (commander.src) {
        debug('select file2stdout');
        ret = file2stdout();
        process.exit(ret);
    } else {
        debug('select stdin2stdout');
        ret = stdin2stdout();
        // process.exit(ret); // pipe background
    }
};

main(); // main()
