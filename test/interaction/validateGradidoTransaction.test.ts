import {
  GradidoTransactionBuilder,
  InteractionValidate,
  KeyPairEd25519,
  MemoryBlock,
  ValidateType_SINGLE
} from '../../'
import { generateKeyPairs, KeyPair, simpleSign } from '../helper/keyPairs'
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
      const bodyBytes = MemoryBlock.fromBase64(communityRootTransactionBase64)
      const transaction = builder
        .setTransactionBody(bodyBytes)
        .addSignaturePair(keyPairs[0].publicKey, simpleSign(bodyBytes, keyPairs[0]))
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
        const bodyBytes = MemoryBlock.fromBase64(communityRootTransactionBase64)
        const transaction = builder
          .setTransactionBody(bodyBytes)
          .addSignaturePair(keyPairs[1].publicKey, simpleSign(bodyBytes, keyPairs[1]))
          .build()
        expect(() => new InteractionValidate(transaction).run(ValidateType_SINGLE, ''))
          .toThrow('TransactionValidationRequiredSignMissingException: missing required sign')
      })
    })    
  })

  describe('register address transaction', () => {
    it('valid', () => {
      const bodyBytes = MemoryBlock.fromBase64(registeAddressTransactionBase64)
      const transaction = builder
        .setTransactionBody(bodyBytes)
        .addSignaturePair(keyPairs[0].publicKey, simpleSign(bodyBytes, keyPairs[0]))
        .addSignaturePair(keyPairs[4].publicKey, simpleSign(bodyBytes, keyPairs[4]))
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
        const bodyBytes = MemoryBlock.fromBase64(registeAddressTransactionBase64)
        const transaction = builder
          .setTransactionBody(bodyBytes)
          .addSignaturePair(keyPairs[0].publicKey, simpleSign(bodyBytes, keyPairs[0]))
          .build()
        expect(() => new InteractionValidate(transaction).run(ValidateType_SINGLE, ''))
          .toThrow('TransactionValidationMissingSignException: missing sign, signed: 1 from 2')
      })

      it('missing required signature', () => {
        const bodyBytes = MemoryBlock.fromBase64(registeAddressTransactionBase64)
        const transaction = builder
          .setTransactionBody(bodyBytes)
          .addSignaturePair(keyPairs[0].publicKey, simpleSign(bodyBytes, keyPairs[0]))
          .addSignaturePair(keyPairs[3].publicKey, simpleSign(bodyBytes, keyPairs[3]))
          .build()
        expect(() => new InteractionValidate(transaction).run(ValidateType_SINGLE, ''))
          .toThrow('TransactionValidationRequiredSignMissingException: missing required sign')
      })
    })
  })

  describe('Gradido Creation Transaction', () => {
    it('valid', () => {
      const bodyBytes = MemoryBlock.fromBase64(creationTransactionBase64)
      const transaction = builder
        .setTransactionBody(bodyBytes)
        .addSignaturePair(keyPairs[3].publicKey, simpleSign(bodyBytes, keyPairs[3]))
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
        const bodyBytes = MemoryBlock.fromBase64(creationTransactionBase64)
        const transaction = builder
          .setTransactionBody(bodyBytes)
          .addSignaturePair(keyPairs[4].publicKey, simpleSign(bodyBytes, keyPairs[4]))
          .build()
        expect(() => new InteractionValidate(transaction).run(ValidateType_SINGLE, ''))
          .toThrow('TransactionValidationForbiddenSignException: this forbidden pubkey was used for signing: 8a8c93293cb97e8784178da8ae588144f7c982f4658bfd35101a1e2b479c3e57')
      })
    })
  })

  describe('Gradido Transfer Transaction', () => {
    it('valid', () => {
      const bodyBytes = MemoryBlock.fromBase64(transferTransactionBase64)
      const transaction = builder
        .setTransactionBody(bodyBytes)
        .addSignaturePair(keyPairs[4].publicKey, simpleSign(bodyBytes,  keyPairs[4]))
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
        const bodyBytes = MemoryBlock.fromBase64(transferTransactionBase64)
        const transaction = builder
          .setTransactionBody(bodyBytes)
          .addSignaturePair(keyPairs[3].publicKey, simpleSign(bodyBytes, keyPairs[3]))
          .build()
        expect(() => new InteractionValidate(transaction).run(ValidateType_SINGLE, ''))
          .toThrow('TransactionValidationRequiredSignMissingException: missing required sign')
      })
    })
  })

  describe('Gradido Deferred Transfer Transaction', () => {
    it('valid', () => {
      const bodyBytes = MemoryBlock.fromBase64(deferredTransferTransactionBase64)
      const transaction = builder
        .setTransactionBody(bodyBytes)
        .addSignaturePair(keyPairs[4].publicKey, simpleSign(bodyBytes, keyPairs[4]))
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
        const bodyBytes = MemoryBlock.fromBase64(deferredTransferTransactionBase64)
        const transaction = builder
          .setTransactionBody(bodyBytes)
          .addSignaturePair(keyPairs[3].publicKey, simpleSign(bodyBytes, keyPairs[3]))
          .build()
        expect(() => new InteractionValidate(transaction).run(ValidateType_SINGLE, ''))
          .toThrow('TransactionValidationRequiredSignMissingException: missing required sign')
      })
    })
  })
})
