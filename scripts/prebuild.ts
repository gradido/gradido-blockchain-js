import { cpus } from 'node:os'
import { execSync } from 'node:child_process'

const threads = cpus().length
const target = 'gradido-blockchain-js'

let command = `prebuildify --napi --runtime napi --target napi@7 --backend cmake-js --parallel ${threads} --cmake-target ${target}`

try {
  execSync(command, { stdio: "inherit" })
} catch (err) {
  console.error(err)
  process.exit(1)
}
