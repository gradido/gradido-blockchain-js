import { crypto_sign_PUBLICKEYBYTES } from 'sodium-native'
import { InteractionValidate, MemoryBlock, TransactionBodyBuilder, ValidateType_SINGLE } from '../../'
import { createdAt, versionString } from '../helper/const'
import { generateKeyPairs, KeyPair } from '../helper/keyPairs'

let keyPairs: KeyPair[]

const builder = new TransactionBodyBuilder()

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
    const body = builder
      .setCommunityRoot(
        keyPairs[0].publicKey,
        keyPairs[1].publicKey,
        keyPairs[2].publicKey
      )
      .build()
    expect(body.isCommunityRoot()).toBeTruthy()
    const validator = new InteractionValidate(body)
    expect(() => validator.run(ValidateType_SINGLE, '')).not.toThrow()
  })

  describe('Invalid', () => {
    it('GMW and AUF are the same', () => {
      const body = builder
        .setCommunityRoot(
          keyPairs[0].publicKey,
          keyPairs[1].publicKey,
          keyPairs[1].publicKey
        )
        .build()
      expect(body.isCommunityRoot()).toBeTruthy()
      const validator = new InteractionValidate(body)
      expect(() => validator.run(ValidateType_SINGLE, '')).toThrow('TransactionValidationException: gmw and auf are the same')
    })

    it('public key and AUF are the same', () => {
      const body = builder
        .setCommunityRoot(
          keyPairs[1].publicKey,
          keyPairs[0].publicKey,
          keyPairs[1].publicKey
        )
        .build()
      expect(body.isCommunityRoot()).toBeTruthy()
      const validator = new InteractionValidate(body)
      expect(() => validator.run(ValidateType_SINGLE, '')).toThrow('TransactionValidationException: aufPubkey and pubkey are the same')
    })

    it('public key and GMW are the same', () => {
      const body = builder
        .setCommunityRoot(
          keyPairs[0].publicKey,
          keyPairs[0].publicKey,
          keyPairs[1].publicKey
        )
        .build()
      expect(body.isCommunityRoot()).toBeTruthy()
      const validator = new InteractionValidate(body)
      expect(() => validator.run(ValidateType_SINGLE, '')).toThrow('TransactionValidationException: gmw and pubkey are the same')
    })

    it('public keys are all the same', () => {
      const body = builder
        .setCommunityRoot(
          keyPairs[0].publicKey,
          keyPairs[0].publicKey,
          keyPairs[0].publicKey
        )
        .build()
      expect(body.isCommunityRoot()).toBeTruthy()
      const validator = new InteractionValidate(body)
      expect(() => validator.run(ValidateType_SINGLE, '')).toThrow('TransactionValidationException: gmw and auf are the same')
    })
    describe('empy key', () => {
      it('public key', () => {
        const body = builder
          .setCommunityRoot(
            new MemoryBlock(Buffer.alloc(crypto_sign_PUBLICKEYBYTES)),
            keyPairs[1].publicKey,
            keyPairs[2].publicKey
          )
          .build()
        expect(body.isCommunityRoot()).toBeTruthy()
        const validator = new InteractionValidate(body)
        expect(() => validator.run(ValidateType_SINGLE, '')).toThrow('TransactionValidationInvalidInputException: empty with pubkey: public key')
      })

      it('gmw key', () => {
        const body = builder
          .setCommunityRoot(
            keyPairs[0].publicKey,
            new MemoryBlock(Buffer.alloc(crypto_sign_PUBLICKEYBYTES)),
            keyPairs[2].publicKey
          )
          .build()
        expect(body.isCommunityRoot()).toBeTruthy()
        const validator = new InteractionValidate(body)
        expect(() => validator.run(ValidateType_SINGLE, '')).toThrow('TransactionValidationInvalidInputException: empty with gmwPubkey: public key')
      })

      it('auf key', () => {
        const body = builder
          .setCommunityRoot(
            keyPairs[0].publicKey,
            keyPairs[1].publicKey,
            new MemoryBlock(Buffer.alloc(crypto_sign_PUBLICKEYBYTES))
          )
          .build()
        expect(body.isCommunityRoot()).toBeTruthy()
        const validator = new InteractionValidate(body)
        expect(() => validator.run(ValidateType_SINGLE, '')).toThrow('TransactionValidationInvalidInputException: empty with aufPubkey: public key')
      })
    })

    describe('invalid key', () => {
      it('public key', () => {
        const body = builder
          .setCommunityRoot(
            MemoryBlock.fromHex('9a3b4c5d6e7f8c9b0a'),
            keyPairs[1].publicKey,
            keyPairs[2].publicKey
          )
          .build()
        expect(body.isCommunityRoot()).toBeTruthy()
        const validator = new InteractionValidate(body)
        expect(() => validator.run(ValidateType_SINGLE, '')).toThrow('TransactionValidationInvalidInputException: invalid size with pubkey: public key')
      })

      it('gmw key', () => {
        const body = builder
          .setCommunityRoot(
            keyPairs[0].publicKey,
            MemoryBlock.fromHex('9a3b4c5d6e7f8c9b0a'),
            keyPairs[2].publicKey
          )
          .build()
        expect(body.isCommunityRoot()).toBeTruthy()
        const validator = new InteractionValidate(body)
        expect(() => validator.run(ValidateType_SINGLE, '')).toThrow('TransactionValidationInvalidInputException: invalid size with gmwPubkey: public key')
      })

      it('auf key', () => {
        const body = builder
          .setCommunityRoot(
            keyPairs[0].publicKey,
            keyPairs[1].publicKey,
            MemoryBlock.fromHex('9a3b4c5d6e7f8c9b0a'),
          )
          .build()
        expect(body.isCommunityRoot()).toBeTruthy()
        const validator = new InteractionValidate(body)
        expect(() => validator.run(ValidateType_SINGLE, '')).toThrow('TransactionValidationInvalidInputException: invalid size with aufPubkey: public key')
      })
    })

    describe('nullptr key', () => {
      it('public key', () => {
        const body = builder
          .setCommunityRoot(
            null,
            keyPairs[1].publicKey,
            keyPairs[2].publicKey
          )
          .build()
        expect(body.isCommunityRoot()).toBeTruthy()
        const validator = new InteractionValidate(body)
        expect(() => validator.run(ValidateType_SINGLE, '')).toThrow('TransactionValidationInvalidInputException: missing with pubkey: public key')
      })

      it('gmw key', () => {
        const body = builder
          .setCommunityRoot(
            keyPairs[0].publicKey,
            null,
            keyPairs[2].publicKey
          )
          .build()
        expect(body.isCommunityRoot()).toBeTruthy()
        const validator = new InteractionValidate(body)
        expect(() => validator.run(ValidateType_SINGLE, '')).toThrow('TransactionValidationInvalidInputException: missing with gmwPubkey: public key')
      })

      it('auf key', () => {
        const body = builder
          .setCommunityRoot(
            keyPairs[0].publicKey,
            keyPairs[1].publicKey,
            null,
          )
          .build()
        expect(body.isCommunityRoot()).toBeTruthy()
        const validator = new InteractionValidate(body)
        expect(() => validator.run(ValidateType_SINGLE, '')).toThrow('TransactionValidationInvalidInputException: missing with aufPubkey: public key')
      })
    })
  })
})