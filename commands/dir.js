const config = new (require('conf'))()
const {success, error} = require('../utils')

const handleSet = (path) => {
  if (!path) {
    return error('You must specify the path')
  }

  config.set('default-dir', path)

  return success(`Default directory was set to [${path}]`)
}

const handleGet = () => {
  const defaultDir = config.get('default-dir')

  if (!defaultDir) {
    return error('You need to set the default directory first')
  }

  return success(`Default directory: [${defaultDir}]`)
}

const dir = (arg, path) => {
  switch (arg) {
    case 'set':
      return handleSet(path)
    case 'get':
      return handleGet()
  }
}

module.exports = dir
