import { crypto_sign_PUBLICKEYBYTES } from "sodium-native"
import { GradidoUnit, MemoryBlock, TransferAmount } from "../../"

describe('transfer amount constructor', () => {
  it('public key is a nullptr', () => {
    expect(() => new TransferAmount(null, GradidoUnit.fromGradidoCent(10000000))).toThrow('pubkey cannot be a nullptr')
  })

  it('public key empty', () => {
    expect(() => new TransferAmount(new MemoryBlock(Buffer.alloc(crypto_sign_PUBLICKEYBYTES)), GradidoUnit.fromGradidoCent(10000000)))
      .toThrow('pubkey cannot be empty')
  })

  it('public key invalid', () => {
    expect(() => new TransferAmount(MemoryBlock.fromHex('9a3b4c5d6e7f8c9b0a'), GradidoUnit.fromGradidoCent(10000000)))
      .toThrow('invalid key size for public key')
  })
})