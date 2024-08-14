// const { GradidoUnit } = require('../swig/gradido-blockchain-js')

var a = require('../index.cjs')

const x = new Uint8Array([21, 31]);
//const b = a.MemoryBlock.fromHex('65ed43')
const b = new a.MemoryBlock.fromHex('65ed43')
//const b = new a.MemoryBlock(71)
console.log("is empty: " , b.isEmpty())
console.log(b.convertToHex())
console.log('Hello World from javascript', b)

const g = new a.GradidoUnit(100.1010)
g.add(new a.GradidoUnit(17))
console.log(g.toString())