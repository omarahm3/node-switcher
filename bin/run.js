#!/usr/bin/env node

const { program } = require('commander')
const branch = require('../commands/branch')
const dir = require('../commands/dir')
const feature = require('../commands/feature')

program
  .command('dir <set/get> [path]')
  .description('Set or get default Project directory, you must specify option "path" in case of set')
  .action(dir)

program
  .command('branch <branch>')
  .description('Sync projects to a certain branch')
  .action(branch)

program
  .command('feature <featureFile>')
  .description('Sync projects according to a feature file')
  .addHelpText('after', `
    Feature file must be in this specific format:
    [
      {
        "repository": "<REPOSITORY_NAME>",
        "branch": "<BRANCH_NAME>"
      },
      .....
    ]
    `)
  .action(feature)

program.parse()
