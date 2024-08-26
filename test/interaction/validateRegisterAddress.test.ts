import { crypto_sign_PUBLICKEYBYTES } from 'sodium-native'
import {
  AddressType_COMMUNITY_AUF,
  AddressType_COMMUNITY_GMW,
  AddressType_COMMUNITY_HUMAN,
  AddressType_NONE,
  InteractionValidate,
  MemoryBlock,
  TransactionBodyBuilder,
  ValidateType_SINGLE
} from '../../'
import { createdAt, versionString } from '../helper/const'
import { generateKeyPairs, KeyPair } from '../helper/keyPairs'

let keyPairs: KeyPair[]

const builder = new TransactionBodyBuilder()

describe('validate Register Address Transactions', () => {
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
      .setRegisterAddress(
        keyPairs[3].publicKey,
        AddressType_COMMUNITY_HUMAN,
        null,
        keyPairs[4].publicKey
      )
      .build()
    expect(body.isRegisterAddress()).toBeTruthy()
    const validator = new InteractionValidate(body)
    expect(() => validator.run(ValidateType_SINGLE, '')).not.toThrow()
  })

  describe('invalid', () => {
    describe('invalid address type', () => {
      it('GMW', () => {
        const body = builder
          .setRegisterAddress(
            keyPairs[3].publicKey,
            AddressType_COMMUNITY_GMW,
            null,
            keyPairs[4].publicKey
          )
          .build()
        expect(body.isRegisterAddress()).toBeTruthy()
        const validator = new InteractionValidate(body)
        expect(() => validator.run(ValidateType_SINGLE, ''))
          .toThrow('WrongAddressTypeException: register address transaction not allowed with community auf or gmw account or None, address type: COMMUNITY_GMW, pubkey: 25971aa0e7422144dcc244887e29ef160d5479b1219e9817ca6ece38b09f37c0')
      })

      it('AUF', () => {
        const body = builder
          .setRegisterAddress(
            keyPairs[3].publicKey,
            AddressType_COMMUNITY_AUF,
            null,
            keyPairs[4].publicKey
          )
          .build()
        expect(body.isRegisterAddress()).toBeTruthy()
        const validator = new InteractionValidate(body)
        expect(() => validator.run(ValidateType_SINGLE, ''))
          .toThrow('WrongAddressTypeException: register address transaction not allowed with community auf or gmw account or None, address type: COMMUNITY_AUF, pubkey: 25971aa0e7422144dcc244887e29ef160d5479b1219e9817ca6ece38b09f37c0')
      })

      it('None', () => {
        const body = builder
          .setRegisterAddress(
            keyPairs[3].publicKey,
            AddressType_NONE,
            null,
            keyPairs[4].publicKey
          )
          .build()
        expect(body.isRegisterAddress()).toBeTruthy()
        const validator = new InteractionValidate(body)
        expect(() => validator.run(ValidateType_SINGLE, ''))
          .toThrow('WrongAddressTypeException: register address transaction not allowed with community auf or gmw account or None, address type: NONE, pubkey: 25971aa0e7422144dcc244887e29ef160d5479b1219e9817ca6ece38b09f37c0')
      })
    })
    it('user and account public key are the same', () => {
      const body = builder
        .setRegisterAddress(
          keyPairs[3].publicKey,
          AddressType_COMMUNITY_HUMAN,
          null,
          keyPairs[3].publicKey
        )
        .build()
      expect(body.isRegisterAddress()).toBeTruthy()
      const validator = new InteractionValidate(body)
      expect(() => validator.run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationException: accountPubkey and userPubkey are the same')
    })
    describe('user or account public key', () => {
      it('both public key null', () => {
        const body = builder
          .setRegisterAddress(
            null,
            AddressType_COMMUNITY_HUMAN,
            null,
            null
          )
          .build()
        expect(body.isRegisterAddress()).toBeTruthy()
        const validator = new InteractionValidate(body)
        expect(() => validator.run(ValidateType_SINGLE, ''))
          .toThrow('TransactionValidationException: accountPubkey and userPubkey are both empty, at least one is needed')
      })

      it('user public key: empty', () => {
        const body = builder
          .setRegisterAddress(
            new MemoryBlock(Buffer.alloc(crypto_sign_PUBLICKEYBYTES)),
            AddressType_COMMUNITY_HUMAN,
            null,
            keyPairs[4].publicKey
          )
          .build()
        expect(body.isRegisterAddress()).toBeTruthy()
        const validator = new InteractionValidate(body)
        expect(() => validator.run(ValidateType_SINGLE, ''))
          .toThrow('TransactionValidationInvalidInputException: empty with userPubkey: public key')
      }) 

      it('account public key: empty', () => {
        const body = builder
          .setRegisterAddress(
            keyPairs[3].publicKey,
            AddressType_COMMUNITY_HUMAN,
            null,
            new MemoryBlock(Buffer.alloc(crypto_sign_PUBLICKEYBYTES))
          )
          .build()
        expect(body.isRegisterAddress()).toBeTruthy()
        const validator = new InteractionValidate(body)
        expect(() => validator.run(ValidateType_SINGLE, ''))
          .toThrow('TransactionValidationInvalidInputException: empty with accountPubkey: public key')
      })  

      it('user public key: invalid', () => {
        const body = builder
          .setRegisterAddress(
            new MemoryBlock(Buffer.alloc(10)),
            AddressType_COMMUNITY_HUMAN,
            null,
            keyPairs[4].publicKey
          )
          .build()
        expect(body.isRegisterAddress()).toBeTruthy()
        const validator = new InteractionValidate(body)
        expect(() => validator.run(ValidateType_SINGLE, ''))
          .toThrow('TransactionValidationInvalidInputException: invalid size with userPubkey: public key')
      }) 

      it('account public key: invalid', () => {
        const body = builder
          .setRegisterAddress(
            keyPairs[3].publicKey,
            AddressType_COMMUNITY_HUMAN,
            null,
            new MemoryBlock(Buffer.alloc(10))
          )
          .build()
        expect(body.isRegisterAddress()).toBeTruthy()
        const validator = new InteractionValidate(body)
        expect(() => validator.run(ValidateType_SINGLE, ''))
          .toThrow('TransactionValidationInvalidInputException: invalid size with accountPubkey: public key')
      })  
    })
  })
})