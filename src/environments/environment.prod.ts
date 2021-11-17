const packagejson = require('../../package.json')

export const environment = {
  production: true,

  // Fill in your own online server API url here
  apiUrl: 'https://jouw-eigen-server.herokuapp.com/api',

  version: packagejson.version
}
