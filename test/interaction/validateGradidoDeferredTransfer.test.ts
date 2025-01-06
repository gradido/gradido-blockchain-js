import { 
  GradidoTransactionBuilder,
  GradidoTransfer, 
  GradidoUnit, 
  InMemoryBlockchain, 
  InMemoryBlockchainProvider, 
  InteractionValidate, 
  KeyPairEd25519, 
  TransferAmount, 
  ValidateType_SINGLE 
} from '../../'
import { aFilledMemo, createdAt, deferredTransferMemo, hallMemo, timeoutDuration, versionString } from '../helper/const'
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
      .addMemo(deferredTransferMemo)
      .setCreatedAt(createdAt)
      .setVersionNumber(versionString)
  })
  it('valid', () => {
    const transaction = builder
      .setDeferredTransfer(
        new GradidoTransfer(
          new TransferAmount(keyPairs[4].getPublicKey(), GradidoUnit.fromGradidoCent(5005500)),
          keyPairs[5].getPublicKey()
        ), timeoutDuration
      )
      .sign(keyPairs[4])
      .build()
    
    const body = transaction.getTransactionBody()
    expect(body).not.toBeNull()
    expect(body?.isDeferredTransfer()).toBeTruthy()
    expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE)).not.toThrow()
  })

  describe('invalid memo', () => {
    it('empty memo', () => {
      builder.reset()
      const transaction = builder
        .setCreatedAt(createdAt)
        .setVersionNumber(versionString)
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(keyPairs[4].getPublicKey(), GradidoUnit.fromGradidoCent(5005500)),
            keyPairs[5].getPublicKey()
          ), timeoutDuration
        )
        .sign(keyPairs[4])
        .build()
  
      const body = transaction.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE))
        .toThrow('TransactionValidationInvalidInputException: no memo with memo: EncryptedMemo, expected: >= 1')
    })

    it('memo to short', () => {
      builder.reset()
      const transaction = builder
        .addMemo(hallMemo)
        .setCreatedAt(createdAt)
        .setVersionNumber(versionString)
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(keyPairs[4].getPublicKey(), GradidoUnit.fromGradidoCent(5005500)),
            keyPairs[5].getPublicKey()
          ), timeoutDuration
        )
        .sign(keyPairs[4])
        .build()
  
      const body = transaction.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE))
        .toThrow('TransactionValidationInvalidInputException: not in expected range [5;450] with memo: hall and  with memo: string, expected: >= 5 && <= 450, actual: 4')
    })

    it('memo to big', () => {
      builder.reset()
      const transaction = builder
        .addMemo(aFilledMemo) 
        .setCreatedAt(createdAt)
        .setVersionNumber(versionString)
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(keyPairs[4].getPublicKey(), GradidoUnit.fromGradidoCent(5005500)),
            keyPairs[5].getPublicKey()
          ), timeoutDuration
        )
        .sign(keyPairs[4])
        .build()
  
      const body = transaction.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE))
        .toThrow('TransactionValidationInvalidInputException: not in expected range [5;450] with memo: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa and  with memo: string, expected: >= 5 && <= 450, actual: 451')
    })
  })

  describe('invalid amount', () => {
    it('zero amount', () => {
      const transaction = builder
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(keyPairs[4].getPublicKey(), GradidoUnit.zero()),
            keyPairs[5].getPublicKey()
          ), timeoutDuration
        )
        .sign(keyPairs[4])
        .build()
  
      const body = transaction.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE))
        .toThrow('TransactionValidationInvalidInputException: zero or negative amount with memo: Link zum einloesen and  with amount: string')
    })

    it('negative amount', () => {
      const transaction = builder
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(keyPairs[4].getPublicKey(), GradidoUnit.fromGradidoCent(1000000).negate()),
            keyPairs[5].getPublicKey()
          ), timeoutDuration
        )
        .sign(keyPairs[4])
        .build()
  
      const body = transaction.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE))
        .toThrow('TransactionValidationInvalidInputException: zero or negative amount with memo: Link zum einloesen and  with amount: string')
    })
  }) 

  describe('invalid coin community id', () => {
    it('coin community id identical to blockchain community id', () => {
      const communityId = 'test-group'
      const transaction = builder
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(keyPairs[4].getPublicKey(), GradidoUnit.fromGradidoCent(5005500), communityId),
            keyPairs[5].getPublicKey()
          ), timeoutDuration
        )
        .sign(keyPairs[4])
        .build()
  
      const body = transaction.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isDeferredTransfer()).toBeTruthy()
      const blockchain = InMemoryBlockchainProvider.getInstance().findBlockchain(communityId)      
      expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE, blockchain))
        .toThrow("TransactionValidationInvalidInputException: coin communityId shouldn't be set if it is the same as blockchain communityId with memo: Link zum einloesen and  with community_id: string, expected: != test-group, actual: test-group")
    })

    it('invalid coin community id', () => {
      const transaction = builder
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(keyPairs[4].getPublicKey(), GradidoUnit.fromGradidoCent(5005500), '<script>'),
            keyPairs[5].getPublicKey()
          ), timeoutDuration
        )
        .sign(keyPairs[4])
        .build()
  
      const body = transaction.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE))
        .toThrow('TransactionValidationInvalidInputException: invalid character, only lowercase english latin letter, numbers and - with memo: Link zum einloesen and  with community_id: string, expected: ^[a-z0-9-]{3,120}$, actual: <script>')
    })
  })

  it('sender and recipient identical', () => {
    const transaction = builder
      .setDeferredTransfer(
        new GradidoTransfer(
          new TransferAmount(keyPairs[4].getPublicKey(), GradidoUnit.fromGradidoCent(5005500)),
          keyPairs[4].getPublicKey()
        ), timeoutDuration
      )
      .sign(keyPairs[4])
      .build()

    const body = transaction.getTransactionBody()
    expect(body).not.toBeNull()
    expect(body?.isDeferredTransfer()).toBeTruthy()
    expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE))
      .toThrow('TransactionValidationException: sender and recipient are the same')
  })

  describe('invalid timeout', () => {
    it('timeout above hard limit', () => {
      const transaction = builder
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(keyPairs[4].getPublicKey(), GradidoUnit.fromGradidoCent(5005500)),
            keyPairs[5].getPublicKey()
          ), 7962400
        )
        .sign(keyPairs[4])
        .build()
  
      const body = transaction.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE))
        .toThrow('TransactionValidationInvalidInputException: timeoutDuration is to long with memo: Link zum einloesen and  with timeout_duration: uint32, expected: 92 days 3 hours 46 minutes 40 seconds  <= 91 days 7 hours 27 minutes 18 seconds , actual: 92 days 3 hours 46 minutes 40 seconds ')
    })

    it('timeout identical to createdAt', () => {
      const transaction = builder
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(keyPairs[4].getPublicKey(), GradidoUnit.fromGradidoCent(5005500)),
            keyPairs[5].getPublicKey()
          ), 0
        )
        .sign(keyPairs[4])
        .build()
  
      const body = transaction.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE))
        .toThrow('TransactionValidationInvalidInputException: timeoutDuration is to short with memo: Link zum einloesen and  with timeout_duration: uint32, expected:  >= 1 hours ')
    })

    it('timeout before createdAt', () => {
      const transaction = builder
        .setDeferredTransfer(
          new GradidoTransfer(
            new TransferAmount(keyPairs[4].getPublicKey(), GradidoUnit.fromGradidoCent(5005500)),
            keyPairs[5].getPublicKey()
          ), -1
        )
        .sign(keyPairs[4])
        .build()
  
      const body = transaction.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isDeferredTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE))
        .toThrow('TransactionValidationInvalidInputException: timeoutDuration is to long with memo: Link zum einloesen and  with timeout_duration: uint32, expected: 49710 days 6 hours 28 minutes 15 seconds  <= 91 days 7 hours 27 minutes 18 seconds , actual: 49710 days 6 hours 28 minutes 15 seconds ')
    })
  })
})