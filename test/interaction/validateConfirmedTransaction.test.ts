import { crypto_generichash_BYTES } from 'sodium-native'
import { 
  InteractionValidate,
  MemoryBlock,
  ValidateType_SINGLE,
  ConfirmedTransaction, 
  InteractionDeserialize,  
  GradidoTransaction,
  DeserializeType_GRADIDO_TRANSACTION,
  Timestamp,
  AccountBalances
} from '../../'
import { confirmedAt, createdAt, confirmedTransactionVersionString } from '../helper/const'
import { communityRootTransactionBase64, hieroTransactionIdBase64 } from '../helper/serializedTransactions'

let gradidoTransaction: GradidoTransaction

describe('validate Confirmed Transactions', () => {
  beforeAll(() => {
    const gradidoTransactionRaw = MemoryBlock.createPtr(MemoryBlock.fromBase64(communityRootTransactionBase64))
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
      new Timestamp(confirmedAt),
      confirmedTransactionVersionString,
      MemoryBlock.createPtr(MemoryBlock.fromBase64(hieroTransactionIdBase64)),
      new AccountBalances()
    )
    expect(() => new InteractionValidate(confirmedTransaction).run(ValidateType_SINGLE)).not.toThrow()

  })

  it('invalid, wrong version', () => { 
    const confirmedTransaction = new ConfirmedTransaction(
      7,
      gradidoTransaction,
      new Timestamp(confirmedAt),
      "1",
      MemoryBlock.createPtr(MemoryBlock.fromBase64(hieroTransactionIdBase64)),
      new AccountBalances()
    )
    expect(() => new InteractionValidate(confirmedTransaction).run(ValidateType_SINGLE))
      .toThrow('TransactionValidationInvalidInputException: wrong version with version_number: string, expected: 3.6, actual: 1')

  })

  it('invalid, invalid message id', () => { 
    const confirmedTransaction = new ConfirmedTransaction(
      7,
      gradidoTransaction,
      new Timestamp(confirmedAt),
      confirmedTransactionVersionString,
      MemoryBlock.createPtr(new MemoryBlock(Buffer.alloc(10))),
      new AccountBalances()
    )
    expect(() => new InteractionValidate(confirmedTransaction).run(ValidateType_SINGLE))
      .toThrow('TransactionValidationInvalidInputException: invalid with message_id: bytes, expected: hiero transaction id, actual: 00000000000000000000')

  })

  // validation rules changed, hiero/hedera tends to create confirmation dates before created dates
  it.skip('invalid, confirmed before created', () => { 
    const confirmedTransaction = new ConfirmedTransaction(
      7,
      gradidoTransaction,
      new Timestamp(new Date(createdAt.getTime() - 1000)),
      confirmedTransactionVersionString,
      MemoryBlock.createPtr(MemoryBlock.fromBase64(hieroTransactionIdBase64)),
      new AccountBalances()
    )
    expect(() => new InteractionValidate(confirmedTransaction).run(ValidateType_SINGLE))
      .toThrow('TransactionValidationInvalidInputException: timespan between created and received are negative with confirmed_at: TimestampSeconds, expected: >= 2021-01-01 00:00:00.0000, actual: 2020-12-31 23:59:59.0000')
  })
})