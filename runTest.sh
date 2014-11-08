mochapath='./node_modules/mocha/bin/mocha'

if [ -f "$mochapath" ]
then $mochapath ./tests/
else echo 'mocha is not a command'
fi
