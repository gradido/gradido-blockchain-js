const { cpus } = require('node:os')
const prebuildify = require('prebuildify')

prebuildify({
  napi: true,
  runtime: 'napi',
  backend: 'cmake-js',
  parallel: cpus().length,
  cmakeTarget: 'gradido-blockchain-js',
  targets: ['napi@7'],
  cwd: process.cwd(),
  _: []
}, function (err) {
  if (err) {
    console.error(err.message || err)
    process.exit(1)
  }
})

