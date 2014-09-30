#!/bin/bash

#shell script to help run LocalHelper

osascript -e 'tell application "Terminal" to do script "mongod"'
npm install
nmpath='./node_modules/nodemon/'
nmjspath='./nodemon.js'

if [ -d "$nmpath" -a -f "$nmjspath" ]
then node nodemon.js
else node app.js
fi
