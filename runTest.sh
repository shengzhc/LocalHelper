mochapath='./node_modules/mocha/bin/mocha'

if [ -f "$mochapath" ]
then $mochapath ./tests/ --recursive --require should --ui bdd --report Spec
else echo 'mocha is not a command'
fi
