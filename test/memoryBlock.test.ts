import { MemoryBlock } from "../"

const exampleString = 
'It is possible to fly without motors, but not without knowledge and skill.'
const exampleStringHex = 
'497420697320706f737369626c6520746f20666c7920776974686f7574206d6f746f72732c20627574206e6f7420776974686f7574206b6e6f776c6564676520616e6420736b696c6c2e'
const exampleStringBase64 = 
'SXQgaXMgcG9zc2libGUgdG8gZmx5IHdpdGhvdXQgbW90b3JzLCBidXQgbm90IHdpdGhvdXQga25vd2xlZGdlIGFuZCBza2lsbC4='


describe('MemoryBlock Constructors', () => {
  it('from string', () => {
    const block = new MemoryBlock(exampleString)
    expect(block.size()).toEqual(exampleString.length)
    expect(block.copyAsString()).toEqual(exampleString)
  })

  it('from hex', () => {
    const block = MemoryBlock.fromHex(exampleStringHex)
    expect(block.size()).toEqual(exampleString.length)
    expect(block.copyAsString()).toEqual(exampleString)
  })

  it('throw wrong sized hex', () => {
    expect(() => MemoryBlock.fromHex('43e')).toThrow(/^invalid hex size Block::fromHex, with: 43e$/)
  })

  it('throw invalid hex', () => {
    expect(() => MemoryBlock.fromHex('43es')).toThrow(/^invalid hex for Block::fromHex, with: 43es$/)
  })

  it('from base64', () => {
    const block = MemoryBlock.fromBase64(exampleStringBase64)
    expect(block.size()).toEqual(exampleString.length)
    expect(block.copyAsString()).toEqual(exampleString)
  })

  it('throw invalid base64', () => {
    expect(() => MemoryBlock.fromBase64('bGUg3zekhaszTT=06za')).toThrow(/^invalid base64, with: bGUg3zekhaszTT=06za, valid part: bGUg3zekhaszTT$/)
  })

  it('from Uint8Array', () => {
    const ar = new Uint8Array(Buffer.from(exampleString))
    const block = new MemoryBlock(ar)
    expect(block.size()).toEqual(exampleString.length)
    expect(block.copyAsString()).toEqual(exampleString)
  })  
})

describe('MemoryBlock transformations', () => {
  it('to hex', () => {
    const block = new MemoryBlock(exampleString)
    expect(block.convertToHex()).toEqual(exampleStringHex)
  })

  it('to base64', () => {
    const block = new MemoryBlock(exampleString)
    expect(block.convertToBase64()).toEqual(exampleStringBase64)
  })

  it('to blake2b hash', () => {
    const block = new MemoryBlock(exampleString)
    const hash = block.calculateHash()
    expect(hash.convertToHex()).toEqual('30169eb8abda20506d4ae35857db1f70f997de056c5f0e53b4a29c1212268ba3')
  })
})

describe('MemoryBlock Operations', () => {
  it('is empty', () => {
    const block = new MemoryBlock('')
    expect(block.isEmpty()).toBeTruthy()

    const block2 = new MemoryBlock('bla')
    expect(block2.isEmpty()).toBeFalsy()
  })
})