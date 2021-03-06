#!/usr/bin/env node

var program = require('commander');
var path = require('path');
var checkEnv = require('check-env');
var helpers = require('./helpers');

function run() {
  program
    .version(require('../package.json').version)
    .option('-t, --test <command>', "Run a command locally.")
    .option('-c, --config <path>',
      'Sets the path to the config file, otherwise read from the env variable CONFIG_FILE.'
    )
    .parse(process.argv);

  // If no config option is given, try to use the env variable:
  
  if (!program.test)
  {
    if (!program.config) checkEnv(['CONFIG_FILE']);
    else process.env.CONFIG_FILE = program.config;

    var configFile = require(path.resolve(process.cwd(), process.env.CONFIG_FILE));

    helpers.createBots(configFile);
  }
  else
  {
    helpers.runCommandCLI(program.test);
  }
}

module.exports = run;
