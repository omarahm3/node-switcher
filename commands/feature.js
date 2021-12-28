const config = new (require('conf'))()
const {join} = require('path')
const {success, error} = require('../utils')
const {loadJsonFileContent, checkoutRepository} = require('./common')

const feature = async (featureFile) => {
  const defaultDir = config.get('default-dir')

  if (!defaultDir) {
    return error('Default Project working directory was not set, please consider setting it')
  }

  const projects = loadJsonFileContent(featureFile)

  if (!Array.isArray(projects)) {
    error('feature file must have a parent array of object, each object must have "repository" and "branch"')
    process.exit()
  }

  for (const project of projects) {
    if (!project.hasOwnProperty('repository') || !project.hasOwnProperty('branch')) {
      error('Invalid project schema, each project must have "repository" and "branch"')
      process.exit()
    }
    const path = join(defaultDir, project.repository)
    await checkoutRepository(path, project.branch)
  }

  success(`\n[${projects.length}] are now changed to feature branches`)
}

module.exports = feature
