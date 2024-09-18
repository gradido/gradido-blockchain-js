import { crypto_generichash_BYTES } from 'sodium-native'
import { 
  InteractionValidate,
  MemoryBlock,
  ValidateType_SINGLE,
  ConfirmedTransaction, 
  InteractionDeserialize,  
  GradidoTransaction,
  DeserializeType_GRADIDO_TRANSACTION
} from '../../'
import { confirmedAt, createdAt, versionString } from '../helper/const'
import { communityRootTransactionBase64 } from '../helper/serializedTransactions'

let gradidoTransaction: GradidoTransaction

describe('validate Confirmed Transactions', () => {
  beforeAll(() => {
    const gradidoTransactionRaw = MemoryBlock.fromBase64(communityRootTransactionBase64)
    const deserializer = new InteractionDeserialize(gradidoTransactionRaw, DeserializeType_GRADIDO_TRANSACTION)
    deserializer.run()
    expect(deserializer.isGradidoTransaction()).toBeTruthy()
    gradidoTransaction = deserializer.getGradidoTransaction()!
  })
  beforeEach(() => {
    
  })
  it('valid', () => { 
    const confirmedTransaction = new ConfirmedTransaction(
      7,
      gradidoTransaction,
      confirmedAt,
      versionString,
      new MemoryBlock(Buffer.alloc(crypto_generichash_BYTES)),
      '899.748379'
    )
    expect(() => new InteractionValidate(confirmedTransaction).run(ValidateType_SINGLE, '')).not.toThrow()

  })

  it('invalid, wrong version', () => { 
    const confirmedTransaction = new ConfirmedTransaction(
      7,
      gradidoTransaction,
      confirmedAt,
      "1",
      new MemoryBlock(Buffer.alloc(crypto_generichash_BYTES)),
      '899.748379'
    )
    expect(() => new InteractionValidate(confirmedTransaction).run(ValidateType_SINGLE, ''))
      .toThrow('TransactionValidationInvalidInputException: wrong version with version_number: string, expected: 3.3, actual: 1')

  })

  it('invalid, invalid message id', () => { 
    const confirmedTransaction = new ConfirmedTransaction(
      7,
      gradidoTransaction,
      confirmedAt,
      versionString,
      new MemoryBlock(Buffer.alloc(10)),
      '899.748379'
    )
    expect(() => new InteractionValidate(confirmedTransaction).run(ValidateType_SINGLE, ''))
      .toThrow('TransactionValidationInvalidInputException: wrong size with message_id: bytes, expected: 32, actual: 10')

  })

  it('invalid, confirmed before created', () => { 
    const confirmedTransaction = new ConfirmedTransaction(
      7,
      gradidoTransaction,
      new Date(createdAt.getTime() - 1000),
      versionString,
      new MemoryBlock(Buffer.alloc(crypto_generichash_BYTES)),
      '899.748379'
    )
    expect(() => new InteractionValidate(confirmedTransaction).run(ValidateType_SINGLE, ''))
      .toThrow('TransactionValidationInvalidInputException: timespan between created and received are negative with confirmed_at: TimestampSeconds, expected: >= 2021-01-01 00:00:00.0000, actual: 2020-12-31 23:59:59.0000')
  })
})