import { crypto_sign_PUBLICKEYBYTES } from 'sodium-native'
import { CommunityRoot, GradidoTransactionBuilder, InteractionValidate, KeyPairEd25519, MemoryBlock, ValidateType_SINGLE } from '../../'
import { createdAt, versionString } from '../helper/const'
import { generateKeyPairs } from '../helper/keyPairs'

let keyPairs: KeyPairEd25519[]

const builder = new GradidoTransactionBuilder()

describe('validate Community Root Transactions', () => {
  beforeAll(() => {
    keyPairs = generateKeyPairs()
  })
  beforeEach(() => {
    builder.reset()
    builder
      .setCreatedAt(createdAt)
      .setVersionNumber(versionString)
  })

  it('valid', () => {
    const transaction = builder
      .setCommunityRoot(
        keyPairs[0].getPublicKey(),
        keyPairs[1].getPublicKey(),
        keyPairs[2].getPublicKey()
      )
      .sign(keyPairs[0])
      .build()
    
    const body = transaction.getTransactionBody()
    expect(body).not.toBeNull()
    expect(body?.isCommunityRoot()).toBeTruthy()
    const validator = new InteractionValidate(body!)
    expect(() => validator.run(ValidateType_SINGLE, '')).not.toThrow()
  })

  describe('Invalid', () => {
    it('GMW and AUF are the same', () => {
      expect(() => new CommunityRoot(
        keyPairs[0].getPublicKey(),
        keyPairs[1].getPublicKey(),
        keyPairs[1].getPublicKey()
      )).toThrow('gmw and auf are the same')
    })

    it('public key and AUF are the same', () => {
      expect(() => new CommunityRoot(
        keyPairs[1].getPublicKey(),
        keyPairs[0].getPublicKey(),
        keyPairs[1].getPublicKey()
      )).toThrow('aufPubkey and pubkey are the same')
    })

    it('public key and GMW are the same', () => {
      expect(() => new CommunityRoot(
        keyPairs[0].getPublicKey(),
        keyPairs[0].getPublicKey(),
        keyPairs[1].getPublicKey()
      )).toThrow('gmw and pubkey are the same')
    })

    it('public keys are all the same', () => {
      expect(() => new CommunityRoot(
        keyPairs[0].getPublicKey(),
        keyPairs[0].getPublicKey(),
        keyPairs[0].getPublicKey()
      )).toThrow('gmw and auf are the same')
    })
    describe('empy key', () => {
      it('public key', () => {
        expect(() => new CommunityRoot(
          new MemoryBlock(Buffer.alloc(crypto_sign_PUBLICKEYBYTES)),
          keyPairs[1].getPublicKey(),
          keyPairs[2].getPublicKey()
        )).toThrow('pubkey cannot be empty')
      })

      it('gmw key', () => {
        expect(() => new CommunityRoot(
          keyPairs[0].getPublicKey(),
          new MemoryBlock(Buffer.alloc(crypto_sign_PUBLICKEYBYTES)),
          keyPairs[2].getPublicKey()
        )).toThrow('pubkey cannot be empty')
      })

      it('auf key', () => {
        expect(() => new CommunityRoot(
          keyPairs[0].getPublicKey(),
          keyPairs[1].getPublicKey(),
          new MemoryBlock(Buffer.alloc(crypto_sign_PUBLICKEYBYTES))
        )).toThrow('pubkey cannot be empty')
      })
    })

    describe('invalid key', () => {
      it('public key', () => {
        expect(() => new CommunityRoot(
          MemoryBlock.fromHex('9a3b4c5d6e7f8c9b0a'),
          keyPairs[1].getPublicKey(),
          keyPairs[2].getPublicKey()
        )).toThrow('invalid key size for public key')
      })

      it('gmw key', () => {
        expect(() => new CommunityRoot(
          keyPairs[0].getPublicKey(),
          MemoryBlock.fromHex('9a3b4c5d6e7f8c9b0a'),
          keyPairs[2].getPublicKey()
        )).toThrow('invalid key size for public key')
      })

      it('auf key', () => {
        expect(() => new CommunityRoot(
          keyPairs[0].getPublicKey(),
          keyPairs[1].getPublicKey(),
          MemoryBlock.fromHex('9a3b4c5d6e7f8c9b0a')
        )).toThrow('invalid key size for public key')
      })
    })

    describe('nullptr key', () => {
      it('public key', () => {
        expect(() => new CommunityRoot(
          null,
          keyPairs[1].getPublicKey(),
          keyPairs[2].getPublicKey()
        )).toThrow('pubkey cannot be a nullptr')
      })

      it('gmw key', () => {
        expect(() => new CommunityRoot(
          keyPairs[0].getPublicKey(),
          null,
          keyPairs[2].getPublicKey()
        )).toThrow('pubkey cannot be a nullptr')
      })

      it('auf key', () => {
        expect(() => new CommunityRoot(
          keyPairs[0].getPublicKey(),
          keyPairs[1].getPublicKey(),
          null
        )).toThrow('pubkey cannot be a nullptr')
      })
    })
  })
})