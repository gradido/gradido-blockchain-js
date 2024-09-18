import { crypto_sign_PUBLICKEYBYTES } from 'sodium-native'
import {
  AddressType_COMMUNITY_AUF,
  AddressType_COMMUNITY_GMW,
  AddressType_COMMUNITY_HUMAN,
  AddressType_NONE,
  InteractionValidate,
  MemoryBlock,
  GradidoTransactionBuilder,
  ValidateType_SINGLE,
  KeyPairEd25519
} from '../../'
import { createdAt, versionString } from '../helper/const'
import { generateKeyPairs } from '../helper/keyPairs'

let keyPairs: KeyPairEd25519[]

const builder = new GradidoTransactionBuilder()

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
    const transaction = builder
      .setRegisterAddress(
        keyPairs[3].getPublicKey(),
        AddressType_COMMUNITY_HUMAN,
        null,
        keyPairs[4].getPublicKey()
      )
      .sign(keyPairs[0])
      .sign(keyPairs[4])
      .build()

    const body = transaction.getTransactionBody()
    expect(body).not.toBeNull()
    expect(body?.isRegisterAddress()).toBeTruthy()
    const validator = new InteractionValidate(body!)
    expect(() => validator.run(ValidateType_SINGLE, '')).not.toThrow()
  })

  describe('invalid', () => {
    describe('invalid address type', () => {
      it('GMW', () => {
        const transaction = builder
          .setRegisterAddress(
            keyPairs[3].getPublicKey(),
            AddressType_COMMUNITY_GMW,
            null,
            keyPairs[4].getPublicKey()
          )
          .sign(keyPairs[0])
          .sign(keyPairs[4])
          .build()

        const body = transaction.getTransactionBody()
        expect(body).not.toBeNull()
        expect(body?.isRegisterAddress()).toBeTruthy()
        const validator = new InteractionValidate(body!)
        expect(() => validator.run(ValidateType_SINGLE, ''))
          .toThrow('WrongAddressTypeException: register address transaction not allowed with community auf or gmw account or None, address type: COMMUNITY_GMW, pubkey: f4dd3989f7554b7ab32e3dd0b7f9e11afce90a1811e9d1f677169eb44bf44272')
      })

      it('AUF', () => {
        const transaction = builder
          .setRegisterAddress(
            keyPairs[3].getPublicKey(),
            AddressType_COMMUNITY_AUF,
            null,
            keyPairs[4].getPublicKey()
          )
          .sign(keyPairs[0])
          .sign(keyPairs[4])
          .build()

        const body = transaction.getTransactionBody()
        expect(body).not.toBeNull()
        expect(body?.isRegisterAddress()).toBeTruthy()
        const validator = new InteractionValidate(body!)
        expect(() => validator.run(ValidateType_SINGLE, ''))
          .toThrow('WrongAddressTypeException: register address transaction not allowed with community auf or gmw account or None, address type: COMMUNITY_AUF, pubkey: f4dd3989f7554b7ab32e3dd0b7f9e11afce90a1811e9d1f677169eb44bf44272')
      })

      it('None', () => {
        const transaction = builder
          .setRegisterAddress(
            keyPairs[3].getPublicKey(),
            AddressType_NONE,
            null,
            keyPairs[4].getPublicKey()
          )
          .sign(keyPairs[0])
          .sign(keyPairs[4])
          .build()

        const body = transaction.getTransactionBody()
        expect(body).not.toBeNull()
        expect(body?.isRegisterAddress()).toBeTruthy()
        const validator = new InteractionValidate(body!)
        expect(() => validator.run(ValidateType_SINGLE, ''))
          .toThrow('WrongAddressTypeException: register address transaction not allowed with community auf or gmw account or None, address type: NONE, pubkey: f4dd3989f7554b7ab32e3dd0b7f9e11afce90a1811e9d1f677169eb44bf44272')
      })
    })
    it('user and account public key are the same', () => {
      expect(() => builder.setRegisterAddress(
        keyPairs[3].getPublicKey(),
        AddressType_COMMUNITY_HUMAN,
        null,
        keyPairs[3].getPublicKey()
      )).toThrow('accountPubkey and userPubkey are the same')
    })
    describe('user or account public key', () => {
      it('both public key null', () => {
        expect(() => builder.setRegisterAddress(
          null,
          AddressType_COMMUNITY_HUMAN,
          null,
          null
        )).toThrow('accountPubkey and userPubkey are both nullptr, at least one is needed')
      })

      it('user public key: empty', () => {
        expect(() => builder.setRegisterAddress(
          new MemoryBlock(Buffer.alloc(crypto_sign_PUBLICKEYBYTES)),
          AddressType_COMMUNITY_HUMAN,
          null,
          keyPairs[4].getPublicKey()
        )).toThrow('pubkey cannot be empty')
      }) 

      it('account public key: empty', () => {
        expect(() => builder.setRegisterAddress(
          keyPairs[3].getPublicKey(),
          AddressType_COMMUNITY_HUMAN,
          null,
          new MemoryBlock(Buffer.alloc(crypto_sign_PUBLICKEYBYTES))
        )).toThrow('pubkey cannot be empty')
      })  

      it('user public key: invalid', () => {
        expect(() => builder.setRegisterAddress(
          MemoryBlock.fromHex('9a3b4c5d6e7f8c9b0a'),
          AddressType_COMMUNITY_HUMAN,
          null,
          keyPairs[4].getPublicKey()
        )).toThrow('invalid key size for public key')
      }) 

      it('account public key: invalid', () => {
        expect(() => builder.setRegisterAddress(
          keyPairs[3].getPublicKey(),
          AddressType_COMMUNITY_HUMAN,
          null,
          MemoryBlock.fromHex('9a3b4c5d6e7f8c9b0a')
        )).toThrow('invalid key size for public key')
      })  
    })
  })
})