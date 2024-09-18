import { crypto_sign_PUBLICKEYBYTES } from "sodium-native"
import { MemoryBlock, TransferAmount } from "../../"

describe('transfer amount constructor', () => {
  it('public key is a nullptr', () => {
    expect(() => new TransferAmount(null, '1000.00')).toThrow('pubkey cannot be a nullptr')
  })

  it('public key empty', () => {
    expect(() => new TransferAmount(new MemoryBlock(Buffer.alloc(crypto_sign_PUBLICKEYBYTES)), '1000.00'))
      .toThrow('pubkey cannot be empty')
  })

  it('public key invalid', () => {
    expect(() => new TransferAmount(MemoryBlock.fromHex('9a3b4c5d6e7f8c9b0a'), '1000.00'))
      .toThrow('invalid key size for public key')
  })
})