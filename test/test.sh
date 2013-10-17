#!/bin/bash

echo "--"
echo "options -V"
../index.js -V
[ $? -ne 0 ] && echo "[ERROR]" && exit 1
echo ""
echo ""


echo "--"
echo "stdin -> stdout normal"
cat ./comment.json | ../index.js
[ $? -ne 0 ] && echo "[ERROR]" && exit 1
echo ""
echo ""


echo "--"
echo "stdin -> stdout -d"
cat ./comment.json | ../index.js -d
[ $? -ne 0 ] && echo "[ERROR]" && exit 1
echo ""
echo ""



echo "--"
echo "stdin -> stdout -C"
cat ./comment.json | ../index.js -C
[ $? -ne 0 ] && echo "[ERROR]" && exit 1
echo ""
echo ""


echo "--"
echo "stdin -> stdout -i"
cat ./comment.json | ../index.js -i "        "
[ $? -ne 0 ] && echo "[ERROR]" && exit 1
echo ""
echo ""


echo "--"
echo "file -> stdout"
../index.js -s ./comment.json
[ $? -ne 0 ] && echo "[ERROR]" && exit 1
echo ""
echo ""

echo "--"
echo "file -> stdout -d "
../index.js -s ./comment.json -d
[ $? -ne 0 ] && echo "[ERROR]" && exit 1
echo ""
echo ""

echo "--"
echo "file -> stdout -C"
../index.js -s ./comment.json -C
[ $? -ne 0 ] && echo "[ERROR]" && exit 1
echo ""
echo ""

echo "--"
echo "file -> stdout -i"
../index.js -s ./comment.json -i '        '
[ $? -ne 0 ] && echo "[ERROR]" && exit 1
echo ""
echo ""


echo "-- clean"
rm -f /tmp/test-mjson.json


echo "--"
echo "file -> file"
../index.js -s ./comment.json -o /tmp/test-mjson.json
[ $? -ne 0 ] && echo "[ERROR]" && exit 1
echo "-- data start"
cat /tmp/test-mjson.json
rm -f /tmp/test-mjson.json
echo "-- data end"
echo ""
echo ""

echo "--"
echo "file -> file -d "
../index.js -s ./comment.json -o /tmp/test-mjson.json -d
[ $? -ne 0 ] && echo "[ERROR]" && exit 1
echo "-- data start"
cat /tmp/test-mjson.json
rm -f /tmp/test-mjson.json
echo "-- data end"
echo ""
echo ""

echo "--"
echo "file -> file -C"
../index.js -s ./comment.json -o /tmp/test-mjson.json -C
[ $? -ne 0 ] && echo "[ERROR]" && exit 1
echo "-- data start"
cat /tmp/test-mjson.json
rm -f /tmp/test-mjson.json
echo "-- data end"
echo ""
echo ""

echo "--"
echo "file -> file -i"
../index.js -s ./comment.json -o /tmp/test-mjson.json -i '        '
[ $? -ne 0 ] && echo "[ERROR]" && exit 1
echo "-- data start"
cat /tmp/test-mjson.json
rm -f /tmp/test-mjson.json
echo "-- data end"
echo ""
echo ""

echo "--"
echo "file -> file -f"
../index.js -s ./comment.json -o /tmp/test-mjson.json
../index.js -s ./comment.json -o /tmp/test-mjson.json -f
[ $? -ne 0 ] && echo "[ERROR]" && exit 1
echo "-- data start"
cat /tmp/test-mjson.json
echo "-- data end"
rm -f /tmp/test-mjson.json
echo ""
echo ""

echo "--"
echo "file args -> stdout"
../index.js ./comment.json
[ $? -ne 0 ] && echo "[ERROR]" && exit 1
echo ""
echo ""



echo "[SUCCESS] finish!!!!!!!!!!!!!!!"
