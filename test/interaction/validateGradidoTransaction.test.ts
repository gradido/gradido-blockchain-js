import {
  GradidoTransactionBuilder,
  InteractionValidate,
  KeyPairEd25519,
  MemoryBlock,
  ValidateType_SINGLE
} from '../../'
import { generateKeyPairs, KeyPair } from '../helper/keyPairs'
import {
  communityRootTransactionBase64,
  creationTransactionBase64,
  deferredTransferTransactionBase64,
  invalidBodyTestPayload,
  registeAddressTransactionBase64,
  transferTransactionBase64
} from '../helper/serializedTransactions'

let keyPairs: KeyPair[]

const builder = new GradidoTransactionBuilder()

describe('validate Gradido Transaction', () => {
  beforeAll(() => {
    keyPairs = generateKeyPairs()
  })

  it('invalid body', () => {
    const transaction = builder
      .setTransactionBody(new MemoryBlock(invalidBodyTestPayload))
      .build()
    expect(() => new InteractionValidate(transaction).run(ValidateType_SINGLE, ''))
      .toThrow('')
  })  

  describe('community root transaction', () => {
    it('valid', () => {
      const transaction = builder
        .setTransactionBody(MemoryBlock.fromBase64(communityRootTransactionBase64))
        .sign(new KeyPairEd25519(keyPairs[0].publicKey, keyPairs[0].privateKey))
        .build()
      expect(() => new InteractionValidate(transaction).run(ValidateType_SINGLE, '')).not.toThrow()
    })
    describe('invalid', () => {
      it('not signed', () => {
        const transaction = builder
          .setTransactionBody(MemoryBlock.fromBase64(communityRootTransactionBase64))
          .build()
        expect(() => new InteractionValidate(transaction).run(ValidateType_SINGLE, ''))
          .toThrow('TransactionValidationMissingSignException: missing sign, signed: 0 from 1')
      })

      it('wrong signer', () => {
        const transaction = builder
          .setTransactionBody(MemoryBlock.fromBase64(communityRootTransactionBase64))
          .sign(new KeyPairEd25519(keyPairs[1].publicKey, keyPairs[1].privateKey))
          .build()
        expect(() => new InteractionValidate(transaction).run(ValidateType_SINGLE, ''))
          .toThrow('TransactionValidationRequiredSignMissingException: missing required sign')
      })
    })    
  })

  describe('register address transaction', () => {
    it('valid', () => {
      const transaction = builder
        .setTransactionBody(MemoryBlock.fromBase64(registeAddressTransactionBase64))
        .sign(new KeyPairEd25519(keyPairs[0].publicKey, keyPairs[0].privateKey))
        .sign(new KeyPairEd25519(keyPairs[4].publicKey, keyPairs[4].privateKey))
        .build()
      expect(() => new InteractionValidate(transaction).run(ValidateType_SINGLE, '')).not.toThrow()
    })

    describe('invalid', () => {
      it('without signature', () => {
        const transaction = builder
          .setTransactionBody(MemoryBlock.fromBase64(registeAddressTransactionBase64))
          .build()
        expect(() => new InteractionValidate(transaction).run(ValidateType_SINGLE, ''))
          .toThrow('TransactionValidationMissingSignException: missing sign, signed: 0 from 2')
      })

      it('missing signature', () => {
        const transaction = builder
          .setTransactionBody(MemoryBlock.fromBase64(registeAddressTransactionBase64))
          .sign(new KeyPairEd25519(keyPairs[0].publicKey, keyPairs[0].privateKey))
          .build()
        expect(() => new InteractionValidate(transaction).run(ValidateType_SINGLE, ''))
          .toThrow('TransactionValidationMissingSignException: missing sign, signed: 1 from 2')
      })

      it('missing required signature', () => {
        const transaction = builder
          .setTransactionBody(MemoryBlock.fromBase64(registeAddressTransactionBase64))
          .sign(new KeyPairEd25519(keyPairs[0].publicKey, keyPairs[0].privateKey))
          .sign(new KeyPairEd25519(keyPairs[3].publicKey, keyPairs[3].privateKey))
          .build()
        expect(() => new InteractionValidate(transaction).run(ValidateType_SINGLE, ''))
          .toThrow('TransactionValidationRequiredSignMissingException: missing required sign')
      })
    })
  })

  describe('Gradido Creation Transaction', () => {
    it('valid', () => {
      const transaction = builder
        .setTransactionBody(MemoryBlock.fromBase64(creationTransactionBase64))
        .sign(new KeyPairEd25519(keyPairs[3].publicKey, keyPairs[3].privateKey))
        .build()
      expect(() => new InteractionValidate(transaction).run(ValidateType_SINGLE, '')).not.toThrow()
    })

    describe('invalid', () => {
      it('missing signature', () => {
        const transaction = builder
          .setTransactionBody(MemoryBlock.fromBase64(creationTransactionBase64))
          .build()
        expect(() => new InteractionValidate(transaction).run(ValidateType_SINGLE, ''))
          .toThrow('TransactionValidationMissingSignException: missing sign, signed: 0 from 1')
      })

      it('wrong signature', () => {
        const transaction = builder
          .setTransactionBody(MemoryBlock.fromBase64(creationTransactionBase64))
          .sign(new KeyPairEd25519(keyPairs[4].publicKey, keyPairs[4].privateKey))
          .build()
        expect(() => new InteractionValidate(transaction).run(ValidateType_SINGLE, ''))
          .toThrow('TransactionValidationForbiddenSignException: this forbidden pubkey was used for signing: 8a8c93293cb97e8784178da8ae588144f7c982f4658bfd35101a1e2b479c3e57')
      })
    })
  })

  describe('Gradido Transfer Transaction', () => {
    it('valid', () => {
      const transaction = builder
        .setTransactionBody(MemoryBlock.fromBase64(transferTransactionBase64))
        .sign(new KeyPairEd25519(keyPairs[4].publicKey, keyPairs[4].privateKey))
        .build()
      expect(() => new InteractionValidate(transaction).run(ValidateType_SINGLE, '')).not.toThrow()
    })

    describe('invalid', () => {
      it('missing signature', () => {
        const transaction = builder
          .setTransactionBody(MemoryBlock.fromBase64(transferTransactionBase64))
          .build()
        expect(() => new InteractionValidate(transaction).run(ValidateType_SINGLE, ''))
          .toThrow('TransactionValidationMissingSignException: missing sign, signed: 0 from 1')
      })

      it('wrong signature', () => {
        const transaction = builder
          .setTransactionBody(MemoryBlock.fromBase64(transferTransactionBase64))
          .sign(new KeyPairEd25519(keyPairs[3].publicKey, keyPairs[3].privateKey))
          .build()
        expect(() => new InteractionValidate(transaction).run(ValidateType_SINGLE, ''))
          .toThrow('TransactionValidationRequiredSignMissingException: missing required sign')
      })
    })
  })

  describe('Gradido Deferred Transfer Transaction', () => {
    it('valid', () => {
      const transaction = builder
        .setTransactionBody(MemoryBlock.fromBase64(deferredTransferTransactionBase64))
        .sign(new KeyPairEd25519(keyPairs[4].publicKey, keyPairs[4].privateKey))
        .build()
      expect(() => new InteractionValidate(transaction).run(ValidateType_SINGLE, '')).not.toThrow()
    })

    describe('invalid', () => {
      it('missing signature', () => {
        const transaction = builder
          .setTransactionBody(MemoryBlock.fromBase64(deferredTransferTransactionBase64))
          .build()
        expect(() => new InteractionValidate(transaction).run(ValidateType_SINGLE, ''))
          .toThrow('TransactionValidationMissingSignException: missing sign, signed: 0 from 1')
      })

      it('wrong signature', () => {
        const transaction = builder
          .setTransactionBody(MemoryBlock.fromBase64(deferredTransferTransactionBase64))
          .sign(new KeyPairEd25519(keyPairs[3].publicKey, keyPairs[3].privateKey))
          .build()
        expect(() => new InteractionValidate(transaction).run(ValidateType_SINGLE, ''))
          .toThrow('TransactionValidationRequiredSignMissingException: missing required sign')
      })
    })
  })
})