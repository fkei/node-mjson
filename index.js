/**
 * @fileOverview mjson main
 * @name index.js
 * @author Kei Funagayama <kei.topaz@gmail.com>
 */

var commander = require('commander');
var jsonminify = require('jsonminify');
var colors = require('colors');
var VERSION = '0.2.0';

exports.main = function main () {
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
        .option('-d --debug', 'debug mode.')
        .option('-i --indent <indent>', 'indent string (default: space 4)', String, '    ')
        .parse(process.argv)
    ;

    var debug = function () {};
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

    var stdin = '';
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', function (chunk) {
        stdin += chunk;
        debug(chunk);
    });
    process.stdin.on('end', function () {
        var output = JSON.stringify(JSON.parse(JSON.minify(stdin)), null, commander.indent);
        console.log(output);
    });
};
