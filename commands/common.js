const fs = require('fs')
const {join} = require('path')
const SimpleGit = require('simple-git').default
const {success, error, log} = require('../utils')
const {STASH_TRIGGER_MESSAGE} = require('../constants')

const isGitRepository = (dir) => {
  return fs.existsSync(join(dir, '.git'))
}

const getRepositories = (dir) => {
  const files = fs.readdirSync(dir)
  const repositories = [];

  for (const file of files) {
    const potentialRepository = join(dir, file)
    const stat = fs.statSync(potentialRepository)

    if (!stat.isDirectory() || !isGitRepository(potentialRepository)) {
      continue
    }

    repositories.push(potentialRepository)
  }

  return repositories
}

const stashChanges = async (git, repoName) => {
  try {
    return await git.stash()
  } catch(err) {
    error(`[${repoName}]:: ${err.message}`)
  }
}

const pullChanges = async (git, repoName) => {
  try {
    return await git.pull()
  } catch(err) {
    error(`[${repoName}]:: ${err.message}`)
  }
}

const fetchChanges = async (git, repoName) => {
  try {
    return await git.fetch()
  } catch(err) {
    error(`[${repoName}]:: ${err.message}`)
  }
}

const checkoutRepository = async (repository, branch, pull = false) => {
  const repoName = repository.split('/').pop()
  const git = SimpleGit(repository)

  log(`[${repoName}]:: Changing branch to [${branch}]`)

  try {
    await git.checkout(branch)
    await fetchChanges(git, repoName)

    if (pull) {
      await pullChanges(git, repoName)
    }

    success(`[${repoName}]:: Repository was changed and synced to latest [${branch}]`)
  } catch(err) {
    if (err.message.includes(STASH_TRIGGER_MESSAGE)) {
      return await stashChanges(git, repoName)
    }
    error(`[${repoName}]:: ${err.message.trim()}`)
  }
}

const checkoutRepositories = async (repositories, branch) => {
  for(const repo of repositories) {
    await checkoutRepository(repo, branch, true)
    log('-------')
  }
}

const loadJsonFileContent = (filePath) => {
  try {
    const file = fs.readFileSync(filePath)
    return JSON.parse(file)
  } catch (err) {
    error(err.message)
    process.exit()
  }
}

module.exports = {
  getRepositories,
  checkoutRepositories,
  checkoutRepository,
  loadJsonFileContent,
}
