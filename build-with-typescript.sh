#!/usr/bin/env bash
rm -rf built
mkdir built

yarn run compile-typescript

cp -r src/blots built/blots
cp -r src/css built/css
cp src/index.html built/index.html

