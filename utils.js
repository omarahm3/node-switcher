const chalk = require('chalk')
const log = console.log

module.exports = {
  log: (...messages) => log(chalk.dim(...messages)),
  success: (...messages) => log(chalk.green(...messages)),
  error: (...messages) => log(chalk.red(...messages))
}
