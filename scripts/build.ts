import { cpus } from 'node:os'
import { execSync } from 'node:child_process'

const threads = cpus().length
const target = 'gradido-blockchain-js'

const command = `cmake-js compile -p ${threads} --target ${target}`

try {
  execSync(command, { stdio: "inherit" })
} catch (err) {
  console.error(err)
  process.exit(1)
}
