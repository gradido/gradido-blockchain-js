import { 
  InteractionValidate,
  GradidoTransactionBuilder,
  TransferAmount,
  ValidateType_SINGLE,
  KeyPairEd25519
} from '../../'
import { createdAt, versionString } from '../helper/const'
import { generateKeyPairs } from '../helper/keyPairs'

let keyPairs: KeyPairEd25519[]

const builder = new GradidoTransactionBuilder()

describe('validate Gradido Creation Transactions', () => {
  beforeAll(() => {
    keyPairs = generateKeyPairs()
  })
  beforeEach(() => {
    builder.reset()
    builder
      .setCreatedAt(createdAt)
      .setVersionNumber(versionString)
      .setMemo('Deine erste Schoepfung;)')
  })

  it('valid', () => {
    const transaction = builder
      .setTransactionCreation(
        new TransferAmount(keyPairs[4].getPublicKey(), '1000.00'),
        new Date(1609459000000)
      )
      .sign(keyPairs[6])
      .build()
    
    const body = transaction.getTransactionBody()
    expect(body).not.toBeNull()
    expect(body?.isCreation()).toBeTruthy()
    expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE, '')).not.toThrow()
  })

  describe('invalid memo', () => {
    it('memo empty', () => {
      const transaction = builder
        .setMemo('')
        .setTransactionCreation(
          new TransferAmount(keyPairs[4].getPublicKey(), '1000.00'),
          new Date(1609459000000)
        )
        .sign(keyPairs[6])
        .build()
    
      const body = transaction.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isCreation()).toBeTruthy()
      expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: not in expected range [5;450] with memo: string')
    })

    it('memo to short', () => {
      const transaction = builder
        .setMemo('hall')
        .setTransactionCreation(
          new TransferAmount(keyPairs[4].getPublicKey(), '1000.00'),
          new Date(1609459000000)
        )
        .sign(keyPairs[6])
        .build()

      const body = transaction.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isCreation()).toBeTruthy()
      expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: not in expected range [5;450] with memo: hall and  with memo: string, expected: >= 5 && <= 450, actual: 4')
    })

    it('memo to big', () => {
      const transaction = builder
        .setMemo('a'.repeat(451))
        .setTransactionCreation(
          new TransferAmount(keyPairs[4].getPublicKey(), '1000.00'),
          new Date(1609459000000)
        )
        .sign(keyPairs[6])
        .build()

      const body = transaction.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isCreation()).toBeTruthy()
      expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: not in expected range [5;450] with memo: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa and  with memo: string, expected: >= 5 && <= 450, actual: 451')
    })
  })  

  describe('invalid amount', () => {
    it('negative amount', () => {
      const transaction = builder
        .setTransactionCreation(
          new TransferAmount(keyPairs[4].getPublicKey(), '-1000.00'),
          new Date(1609459000000)
        )
        .sign(keyPairs[6])
        .build()
      
      const body = transaction.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isCreation()).toBeTruthy()
      expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: zero or negative amount with memo: Deine erste Schoepfung;) and  with amount: string')
    })

    it('zero amount', () => {
      const transaction = builder
        .setTransactionCreation(
          new TransferAmount(keyPairs[4].getPublicKey(), '0'),
          new Date(1609459000000)
        )
        .sign(keyPairs[6])
        .build()

      const body = transaction.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isCreation()).toBeTruthy()
      expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: zero or negative amount with memo: Deine erste Schoepfung;) and  with amount: string')
    })

    it('amount to big', () => {
      const transaction = builder
        .setTransactionCreation(
          new TransferAmount(keyPairs[4].getPublicKey(), '2000.00'),
          new Date(1609459000000)
        )
        .sign(keyPairs[6])
        .build()

      const body = transaction.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isCreation()).toBeTruthy()
      expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: creation amount to high, max 1000 per month with memo: Deine erste Schoepfung;) and  with amount: string, expected: <= 10000, actual: 2000.0000')
    })
  })

  describe('invalid coin community id', () => {
    it('coin community id identical to blockchain community id', () => {
      const communityId = 'test-group'
      const transaction = builder
        .setTransactionCreation(
          new TransferAmount(keyPairs[4].getPublicKey(), '1000.00', communityId),
          new Date(1609459000000)
        )
        .sign(keyPairs[6])
        .build()
      
      const body = transaction.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isCreation()).toBeTruthy()
      expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE, communityId))
        .toThrow("TransactionValidationInvalidInputException: coin communityId shouldn't be set if it is the same as blockchain communityId with memo: Deine erste Schoepfung;) and  with community_id: string, expected: != test-group, actual: test-group")
    })

    it('invalid coin community id', () => {
      const transaction = builder
        .setTransactionCreation(
          new TransferAmount(keyPairs[4].getPublicKey(), '1000.00', '<script>'),
          new Date(1609459000000)
        )
        .sign(keyPairs[6])
        .build()

      const body = transaction.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isCreation()).toBeTruthy()
      expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: invalid character, only lowercase english latin letter, numbers and - with memo: Deine erste Schoepfung;) and  with community_id: string, expected: ^[a-z0-9-]{3,120}$, actual: <script>')
    })
  })
})