import { crypto_sign_PUBLICKEYBYTES } from 'sodium-native'
import { GradidoTransfer, InteractionValidate, MemoryBlock, TransactionBodyBuilder, TransferAmount, ValidateType_SINGLE } from '../../'
import { createdAt, timeout, versionString } from '../helper/const'
import { generateKeyPairs, KeyPair } from '../helper/keyPairs'

let keyPairs: KeyPair[]

const builder = new TransactionBodyBuilder()

describe('validate Gradido Deferred Transfer Transactions', () => {
  beforeAll(() => {
    keyPairs = generateKeyPairs()
  })
  beforeEach(() => {
    builder.reset()
    builder
      .setMemo('Link zum einloesen')
      .setCreatedAt(createdAt)
      .setVersionNumber(versionString)
  })
  it('valid', () => {
    const body = builder
      .setDeferredTransfer(
        new GradidoTransfer(
          new TransferAmount(keyPairs[4].publicKey, '500.55'),
          keyPairs[5].publicKey
        ), timeout
      )
      .build()

    expect(body.isDeferredTransfer()).toBeTruthy()
    expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, '')).not.toThrow()
  })

  describe('invalid memo', () => {
    it('empty memo', () => {
      const body = builder
        .setMemo('')
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(keyPairs[4].publicKey, '500.55'),
            keyPairs[5].publicKey
          ), timeout
        )
        .build()
  
      expect(body.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: not in expected range [5;450] with memo: string')
    })

    it('memo to short', () => {
      const body = builder
        .setMemo('hall')
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(keyPairs[4].publicKey, '500.55'),
            keyPairs[5].publicKey
          ), timeout
        )
        .build()
  
      expect(body.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: not in expected range [5;450] with memo: string')
    })

    it('memo to big', () => {
      const body = builder
        .setMemo('a'.repeat(451))
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(keyPairs[4].publicKey, '500.55'),
            keyPairs[5].publicKey
          ), timeout
        )
        .build()
  
      expect(body.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: not in expected range [5;450] with memo: string')
    })
  })

  describe('invalid amount', () => {
    it('zero amount', () => {
      const body = builder
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(keyPairs[4].publicKey, '0'),
            keyPairs[5].publicKey
          ), timeout
        )
        .build()
  
      expect(body.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: zero or negative amount with amount: GradidoUnit')
    })

    it('negative amount', () => {
      const body = builder
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(keyPairs[4].publicKey, '-100.00'),
            keyPairs[5].publicKey
          ), timeout
        )
        .build()
  
      expect(body.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: zero or negative amount with amount: GradidoUnit')
    })
  }) 

  describe('invalid coin community id', () => {
    it('coin community id identical to blockchain community id', () => {
      const communityId = 'test-group'
      const body = builder
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(keyPairs[4].publicKey, '500.55', communityId),
            keyPairs[5].publicKey
          ), timeout
        )
        .build()
  
      expect(body.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, communityId))
        .toThrow("TransactionValidationInvalidInputException: coin communityId shouldn't be set if it is the same as blockchain communityId with communityId: hex")
    })

    it('invalid coin community id', () => {
      const body = builder
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(keyPairs[4].publicKey, '500.55', '<script>'),
            keyPairs[5].publicKey
          ), timeout
        )
        .build()
  
      expect(body.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: invalid character, only ascii with coinCommunityId: string')
    })
  })

  it('sender and recipient identical', () => {
    const body = builder
      .setDeferredTransfer(
        new GradidoTransfer(
          new TransferAmount(keyPairs[4].publicKey, '500.55'),
          keyPairs[4].publicKey
        ), timeout
      )
      .build()

    expect(body.isDeferredTransfer()).toBeTruthy()
    expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, ''))
      .toThrow('TransactionValidationException: sender and recipient are the same')
  })

  describe('invalid public key', () => {
    it('sender public key: null', () => {
      const body = builder
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(null, '500.55'),
            keyPairs[5].publicKey
          ), timeout
        )
        .build()

      expect(body.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: missing with sender: public key')
    })

    it('recipient public key: null', () => {
      const body = builder
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(keyPairs[4].publicKey, '500.55'),
            null
          ), timeout
        )
        .build()

      expect(body.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: missing with recipient: public key')
    })

    it('sender public key: empty', () => {
      const body = builder
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(new MemoryBlock(Buffer.alloc(crypto_sign_PUBLICKEYBYTES)), '500.55'),
            keyPairs[5].publicKey
          ), timeout
        )
        .build()

      expect(body.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: empty with sender: public key')
    })

    it('recipient public key: empty', () => {
      const body = builder
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(keyPairs[4].publicKey, '500.55'),
            new MemoryBlock(Buffer.alloc(crypto_sign_PUBLICKEYBYTES))
          ), timeout
        )
        .build()

      expect(body.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: empty with recipient: public key')
    })

    it('sender public key: invalid', () => {
      const body = builder
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(new MemoryBlock(Buffer.alloc(10)), '500.55'),
            keyPairs[5].publicKey
          ), timeout
        )
        .build()

      expect(body.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: invalid size with sender: public key')
    })

    it('recipient public key: invalid', () => {
      const body = builder
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(keyPairs[4].publicKey, '500.55'),
            new MemoryBlock(Buffer.alloc(10))
          ), timeout
        )
        .build()

      expect(body.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: invalid size with recipient: public key')
    })
  })

  describe('invalid timeout', () => {
    it('timeout above hard limit', () => {
      const body = builder
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(keyPairs[4].publicKey, '500.55'),
            keyPairs[5].publicKey
          ), new Date(createdAt.getTime() + 7962400000)
        )
        .build()
  
      expect(body.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: timeout is to far away from confirmed date with timeout: timestamp')
    })

    it('timeout identical to createdAt', () => {
      const body = builder
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(keyPairs[4].publicKey, '500.55'),
            keyPairs[5].publicKey
          ), createdAt
        )
        .build()
  
      expect(body.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: already reached with timeout: Timestamp')
    })

    it('timeout before createdAt', () => {
      const body = builder
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(keyPairs[4].publicKey, '500.55'),
            keyPairs[5].publicKey
          ), new Date(createdAt.getTime() - 10000)
        )
        .build()
  
      expect(body.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: already reached with timeout: Timestamp')
    })
  })
})