const config = new (require('conf'))()
const {success, error} = require('../utils')
const {getRepositories, checkoutRepositories} = require('./common')

const branch = async (branch) => {
  const defaultDir = config.get('default-dir')

  if (!defaultDir) {
    return error('Default Project working directory was not set, please consider setting it')
  }

  const repositories = getRepositories(defaultDir)

  await checkoutRepositories(repositories, branch)

  success(`All [${repositories.length}] projects now are changed to branch [${branch}]`)

}

module.exports = branch
