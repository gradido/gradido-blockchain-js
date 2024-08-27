import { crypto_sign_PUBLICKEYBYTES } from 'sodium-native'
import { InteractionValidate, MemoryBlock, TransactionBodyBuilder, TransferAmount, ValidateType_SINGLE } from '../../'
import { createdAt, versionString } from '../helper/const'
import { generateKeyPairs, KeyPair } from '../helper/keyPairs'

let keyPairs: KeyPair[]

const builder = new TransactionBodyBuilder()

describe('validate Gradido Transfer Transactions', () => {
  beforeAll(() => {
    keyPairs = generateKeyPairs()
  })
  beforeEach(() => {
    builder.reset()
    builder
      .setMemo('Ich teile mit dir')
      .setCreatedAt(createdAt)
      .setVersionNumber(versionString)
  })
  it('valid', () => {
    const body = builder
      .setTransactionTransfer(
        new TransferAmount(keyPairs[4].publicKey, '500.55'),
        keyPairs[5].publicKey
      )
      .build()

    expect(body.isTransfer()).toBeTruthy()
    expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, '')).not.toThrow()
  })

  describe('invalid memo', () => {
    it('empty memo', () => {
      const body = builder
        .setMemo('')
        .setTransactionTransfer(
          new TransferAmount(keyPairs[4].publicKey, '500.55'),
          keyPairs[5].publicKey
        )
        .build()
  
      expect(body.isTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: not in expected range [5;450] with memo: string')
    })

    it('memo to short', () => {
      const body = builder
        .setMemo('hall')
        .setTransactionTransfer(
          new TransferAmount(keyPairs[4].publicKey, '500.55'),
          keyPairs[5].publicKey
        )
        .build()
  
      expect(body.isTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: not in expected range [5;450] with memo: hall and  with memo: string, expected: >= 5 && <= 450, actual: 4')
    })

    it('memo to big', () => {
      const body = builder
        .setMemo('a'.repeat(451))
        .setTransactionTransfer(
          new TransferAmount(keyPairs[4].publicKey, '500.55'),
          keyPairs[5].publicKey
        )
        .build()
  
      expect(body.isTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: not in expected range [5;450] with memo: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa and  with memo: string, expected: >= 5 && <= 450, actual: 451')
    })
  })

  describe('invalid amount', () => {
    it('zero amount', () => {
      const body = builder
        .setTransactionTransfer(
          new TransferAmount(keyPairs[4].publicKey, '0'),
          keyPairs[5].publicKey
        )
        .build()
  
      expect(body.isTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: zero or negative amount with memo: Ich teile mit dir and  with amount: string')
    })

    it('negative amount', () => {
      const body = builder
        .setTransactionTransfer(
          new TransferAmount(keyPairs[4].publicKey, '-100.00'),
          keyPairs[5].publicKey
        )
        .build()
  
      expect(body.isTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: zero or negative amount with memo: Ich teile mit dir and  with amount: string')
    })
  }) 

  describe('invalid coin community id', () => {
    it('coin community id identical to blockchain community id', () => {
      const communityId = 'test-group'
      const body = builder
        .setTransactionTransfer(
          new TransferAmount(keyPairs[4].publicKey, '500.55', communityId),
          keyPairs[5].publicKey
        )
        .build()
  
      expect(body.isTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, communityId))
        .toThrow("TransactionValidationInvalidInputException: coin communityId shouldn't be set if it is the same as blockchain communityId with memo: Ich teile mit dir and  with community_id: string, expected: != test-group, actual: test-group")
    })

    it('invalid coin community id', () => {
      const body = builder
        .setTransactionTransfer(
          new TransferAmount(keyPairs[4].publicKey, '500.55', '<script>'),
          keyPairs[5].publicKey
        )
        .build()
  
      expect(body.isTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: invalid character, only lowercase english latin letter, numbers and - with memo: Ich teile mit dir and  with community_id: string, expected: ^[a-z0-9-]{3,120}$, actual: <script>')
    })
  })

  it('sender and recipient identical', () => {
    const body = builder
      .setTransactionTransfer(
        new TransferAmount(keyPairs[4].publicKey, '500.55'),
        keyPairs[4].publicKey
      )
      .build()

    expect(body.isTransfer()).toBeTruthy()
    expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, ''))
      .toThrow('TransactionValidationException: sender and recipient are the same')
  })

  describe('invalid public key', () => {
    it('sender public key: null', () => {
      const body = builder
        .setTransactionTransfer(
          new TransferAmount(null, '500.55'),
          keyPairs[5].publicKey
        )
        .build()

      expect(body.isTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: missing with memo: Ich teile mit dir and  with sender: public key')
    })

    it('recipient public key: null', () => {
      const body = builder
        .setTransactionTransfer(
          new TransferAmount(keyPairs[4].publicKey, '500.55'),
          null
        )
        .build()

      expect(body.isTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: missing with memo: Ich teile mit dir and  with recipient: public key')
    })

    it('sender public key: empty', () => {
      const body = builder
        .setTransactionTransfer(
          new TransferAmount(new MemoryBlock(Buffer.alloc(crypto_sign_PUBLICKEYBYTES)), '500.55'),
          keyPairs[5].publicKey
        )
        .build()

      expect(body.isTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: empty with memo: Ich teile mit dir and  with sender: public key')
    })

    it('recipient public key: empty', () => {
      const body = builder
        .setTransactionTransfer(
          new TransferAmount(keyPairs[4].publicKey, '500.55'),
          new MemoryBlock(Buffer.alloc(crypto_sign_PUBLICKEYBYTES))
        )
        .build()

      expect(body.isTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: empty with memo: Ich teile mit dir and  with recipient: public key')
    })

    it('sender public key: invalid', () => {
      const body = builder
        .setTransactionTransfer(
          new TransferAmount(new MemoryBlock(Buffer.alloc(10)), '500.55'),
          keyPairs[5].publicKey
        )
        .build()

      expect(body.isTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: invalid size with memo: Ich teile mit dir and  with sender: public key')
    })

    it('recipient public key: invalid', () => {
      const body = builder
        .setTransactionTransfer(
          new TransferAmount(keyPairs[4].publicKey, '500.55'),
          new MemoryBlock(Buffer.alloc(10))
        )
        .build()

      expect(body.isTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, ''))
        .toThrow('TransactionValidationInvalidInputException: invalid size with memo: Ich teile mit dir and  with recipient: public key')
    })
  })
})