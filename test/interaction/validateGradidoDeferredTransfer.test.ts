import { crypto_sign_PUBLICKEYBYTES } from 'sodium-native'
import { 
  GradidoTransactionBuilder,
  GradidoTransfer, 
  InteractionValidate, 
  KeyPairEd25519, 
  MemoryBlock, 
  TransferAmount, 
  ValidateType_SINGLE 
} from '../../'
import { createdAt, timeout, versionString } from '../helper/const'
import { generateKeyPairs } from '../helper/keyPairs'

let keyPairs: KeyPairEd25519[]

const builder = new GradidoTransactionBuilder()

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
    const transaction = builder
      .setDeferredTransfer(
        new GradidoTransfer(
          new TransferAmount(keyPairs[4].getPublicKey(), '500.55'),
          keyPairs[5].getPublicKey()
        ), timeout
      )
      .sign(keyPairs[4])
      .build()
    
    const body = transaction.getTransactionBody()
    expect(body).not.toBeNull()
    expect(body?.isDeferredTransfer()).toBeTruthy()
    expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE, '')).not.toThrow()
  })

  describe('invalid memo', () => {
    it('empty memo', () => {
      const transaction = builder
        .setMemo('')
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(keyPairs[4].getPublicKey(), '500.55'),
            keyPairs[5].getPublicKey()
          ), timeout
        )
        .sign(keyPairs[4])
        .build()
  
      const body = transaction.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: not in expected range [5;450] with memo: string')
    })

    it('memo to short', () => {
      const transaction = builder
        .setMemo('hall')
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(keyPairs[4].getPublicKey(), '500.55'),
            keyPairs[5].getPublicKey()
          ), timeout
        )
        .sign(keyPairs[4])
        .build()
  
      const body = transaction.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: not in expected range [5;450] with memo: hall and  with memo: string, expected: >= 5 && <= 450, actual: 4')
    })

    it('memo to big', () => {
      const transaction = builder
        .setMemo('a'.repeat(451))
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(keyPairs[4].getPublicKey(), '500.55'),
            keyPairs[5].getPublicKey()
          ), timeout
        )
        .sign(keyPairs[4])
        .build()
  
      const body = transaction.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: not in expected range [5;450] with memo: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa and  with memo: string, expected: >= 5 && <= 450, actual: 451')
    })
  })

  describe('invalid amount', () => {
    it('zero amount', () => {
      const transaction = builder
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(keyPairs[4].getPublicKey(), '0'),
            keyPairs[5].getPublicKey()
          ), timeout
        )
        .sign(keyPairs[4])
        .build()
  
      const body = transaction.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: zero or negative amount with memo: Link zum einloesen and  with amount: string')
    })

    it('negative amount', () => {
      const transaction = builder
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(keyPairs[4].getPublicKey(), '-100.00'),
            keyPairs[5].getPublicKey()
          ), timeout
        )
        .sign(keyPairs[4])
        .build()
  
      const body = transaction.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: zero or negative amount with memo: Link zum einloesen and  with amount: string')
    })
  }) 

  describe('invalid coin community id', () => {
    it('coin community id identical to blockchain community id', () => {
      const communityId = 'test-group'
      const transaction = builder
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(keyPairs[4].getPublicKey(), '500.55', communityId),
            keyPairs[5].getPublicKey()
          ), timeout
        )
        .sign(keyPairs[4])
        .build()
  
      const body = transaction.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE, communityId))
        .toThrow("TransactionValidationInvalidInputException: coin communityId shouldn't be set if it is the same as blockchain communityId with memo: Link zum einloesen and  with community_id: string, expected: != test-group, actual: test-group")
    })

    it('invalid coin community id', () => {
      const transaction = builder
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(keyPairs[4].getPublicKey(), '500.55', '<script>'),
            keyPairs[5].getPublicKey()
          ), timeout
        )
        .sign(keyPairs[4])
        .build()
  
      const body = transaction.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: invalid character, only lowercase english latin letter, numbers and - with memo: Link zum einloesen and  with community_id: string, expected: ^[a-z0-9-]{3,120}$, actual: <script>')
    })
  })

  it('sender and recipient identical', () => {
    const transaction = builder
      .setDeferredTransfer(
        new GradidoTransfer(
          new TransferAmount(keyPairs[4].getPublicKey(), '500.55'),
          keyPairs[4].getPublicKey()
        ), timeout
      )
      .sign(keyPairs[4])
      .build()

    const body = transaction.getTransactionBody()
    expect(body).not.toBeNull()
    expect(body?.isDeferredTransfer()).toBeTruthy()
    expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE, ''))
      .toThrow('TransactionValidationException: sender and recipient are the same')
  })

  describe('invalid timeout', () => {
    it('timeout above hard limit', () => {
      const transaction = builder
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(keyPairs[4].getPublicKey(), '500.55'),
            keyPairs[5].getPublicKey()
          ), new Date(createdAt.getTime() + 7962400000)
        )
        .sign(keyPairs[4])
        .build()
  
      const body = transaction.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: timeout is to far away from confirmed date with memo: Link zum einloesen and  with timeout: TimestampSeconds, expected: <= 2021-01-01 00:02:00.0000 + 91 days 7 hours 27 minutes 18 seconds , actual: 2021-04-03 03:46:40.0000')
    })

    it('timeout identical to createdAt', () => {
      const transaction = builder
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(keyPairs[4].getPublicKey(), '500.55'),
            keyPairs[5].getPublicKey()
          ), createdAt
        )
        .sign(keyPairs[4])
        .build()
  
      const body = transaction.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: already reached with memo: Link zum einloesen and  with timeout: TimestampSeconds, expected: > 2021-01-01 00:00:00.0000, actual: 2021-01-01 00:00:00.0000')
    })

    it('timeout before createdAt', () => {
      const transaction = builder
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(keyPairs[4].getPublicKey(), '500.55'),
            keyPairs[5].getPublicKey()
          ), new Date(createdAt.getTime() - 10000)
        )
        .sign(keyPairs[4])
        .build()
  
      const body = transaction.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: already reached with memo: Link zum einloesen and  with timeout: TimestampSeconds, expected: > 2021-01-01 00:00:00.0000, actual: 2020-12-31 23:59:50.0000')
    })
  })
})