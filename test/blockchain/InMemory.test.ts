import { randombytes_uniform } from 'sodium-native'
import {
  AddressType_COMMUNITY_HUMAN,
  Filter,
  GradidoTransactionBuilder,
  GradidoTransfer,
  GradidoUnit,
  InMemoryBlockchain,
  InMemoryBlockchainProvider,
  InteractionCalculateAccountBalance,
  InteractionToJson,
  KeyPairEd25519,
  loadCryptoKeys,
  MemoryBlock,
  TransactionBodyBuilder,
  TransactionType_COMMUNITY_ROOT,
  TransferAmount
} from '../../'
import { generateKeyPairs, KeyPair } from '../helper/keyPairs'
import { communityRootTransactionBase64 } from '../helper/serializedTransactions'
import { versionString } from '../helper/const'

function getFirstDayOfPreviousNMonth(startDate: Date, monthsAgo: number): Date {
  const local = new Date(startDate.getFullYear(), startDate.getMonth() - monthsAgo, 1)
  return new Date(local.getTime() - local.getTimezoneOffset() * 60 * 1000)
}


function randomSeconds(): number {
  // 40 minutes
  const min = 2400
  // 2 days
  const max = 2 * 24 * 60 * 60

  return randombytes_uniform(max - min) + min
}


let keyPairs: KeyPair[]
let keyPairCursor: number
const communityId = 'test-community'
let lastCreatedAt: Date
let lastConfirmedAt: Date
let blockchain: InMemoryBlockchain
let transactionBuilder: GradidoTransactionBuilder
let bodyBuilder: TransactionBodyBuilder

function generateNewCreatedAt(): Date {
  lastCreatedAt = new Date(lastCreatedAt.getTime() + randomSeconds() * 1000)
  return lastCreatedAt
}

function generateNewConfirmedAt(createdAt: Date): Date {
  lastConfirmedAt = new Date(createdAt.getTime() + 60 * 1000)
  return lastConfirmedAt
}

function getBalance(keyPairIndex: number, date: Date): GradidoUnit 
{
  if(keyPairIndex <= 0 || keyPairIndex >= keyPairs.length ) {
    throw new Error('keyPairIndex out of bounds')
  }
  const balanceCalculator = new InteractionCalculateAccountBalance(blockchain)
  return balanceCalculator.run(keyPairs[keyPairIndex].publicKey, date)
}

function logBlockchain(): void
{
	const transactions = blockchain.getSortedTransactions()
  console.log('------ log blockchain ---------')
  for(let i = 0; i < transactions.size(); i++) {
    const transactionEntry = transactions.get(i)
    if(!transactionEntry || !transactionEntry.getConfirmedTransaction()) {
      throw new Error('empty transactionEntry')
    }
    const confirmedTransaction = transactionEntry.getConfirmedTransaction()
    if(!confirmedTransaction) {
      throw new Error('missing confirmed transaction')
    }
    const toJson = new InteractionToJson(confirmedTransaction)
    console.log(toJson.run(true))
  }
  console.log('------ log blockchain end ---------')
}

function createRegisterAddress(keyPairIndexStart: number) {
  if (keyPairIndexStart + 1 >= keyPairs.length) {
		throw new Error('not enough key pairs')
	}
  const userPubkeyIndex = keyPairIndexStart
  const accountPubkeyIndex = keyPairIndexStart + 1
  bodyBuilder
    .setCreatedAt(generateNewCreatedAt())
    .setVersionNumber(versionString)
    .setRegisterAddress(
      keyPairs[userPubkeyIndex].publicKey,
      AddressType_COMMUNITY_HUMAN,
      null,
      keyPairs[accountPubkeyIndex].publicKey
    )
  transactionBuilder
    .setTransactionBody(bodyBuilder.build())
    .sign(new KeyPairEd25519(keyPairs[accountPubkeyIndex].publicKey, keyPairs[accountPubkeyIndex].privateKey))
    // sign with community root key
    .sign(new KeyPairEd25519(keyPairs[0].publicKey, keyPairs[0].privateKey))

  expect(blockchain.addGradidoTransaction(transactionBuilder.build(),null, generateNewConfirmedAt(lastCreatedAt))).toBeTruthy()
}

function createGradidoCreation(
  recipientKeyPairIndex: number,
  signerKeyPairIndex: number,
  amount: string,
  createdAt: Date,
  targetDate: Date
): boolean {
  if(recipientKeyPairIndex <= 0 || recipientKeyPairIndex >= keyPairs.length ) {
    throw new Error('recipientKeyPairIndex out of bounds')
  }
  if(signerKeyPairIndex <= 0  || signerKeyPairIndex >= keyPairs.length) {
    throw new Error('signerKeyPairIndex out of bounds')
  }
  bodyBuilder
    .setMemo('dummy memo')
    .setCreatedAt(createdAt)
    .setVersionNumber(versionString)
    .setTransactionCreation(
      new TransferAmount(keyPairs[recipientKeyPairIndex].publicKey, amount),
      targetDate
    )
  transactionBuilder
    .setTransactionBody(bodyBuilder.build())
    .sign(new KeyPairEd25519(keyPairs[signerKeyPairIndex].publicKey, keyPairs[signerKeyPairIndex].privateKey))
  return blockchain.addGradidoTransaction(transactionBuilder.build(), null, generateNewConfirmedAt(createdAt))
}

function createGradidoTransfer(
  senderKeyPairIndex: number,
  recipientKeyPairIndex: number,
  amount: string,
  createdAt: Date
) : boolean {
  if(senderKeyPairIndex <= 0  || senderKeyPairIndex >= keyPairs.length) {
    throw new Error('senderKeyPairIndex out of bounds')
  }
  if(recipientKeyPairIndex <= 0 || recipientKeyPairIndex >= keyPairs.length ) {
    throw new Error('recipientKeyPairIndex out of bounds')
  }
  bodyBuilder
    .setMemo('dummy memo')  
    .setCreatedAt(createdAt)
    .setVersionNumber(versionString)
    .setTransactionTransfer(
      new TransferAmount(keyPairs[senderKeyPairIndex].publicKey, amount),
      keyPairs[recipientKeyPairIndex].publicKey
    )
  transactionBuilder
    .setTransactionBody(bodyBuilder.build())
    .sign(new KeyPairEd25519(keyPairs[senderKeyPairIndex].publicKey, keyPairs[senderKeyPairIndex].privateKey))

  return blockchain.addGradidoTransaction(transactionBuilder.build(), null, generateNewConfirmedAt(createdAt))
}


function createGradidoDeferredTransfer(
  senderKeyPairIndex: number,
  recipientKeyPairIndex: number,
  amount: string,
  createdAt: Date,
  timeout: Date
) : boolean {
  if(senderKeyPairIndex <= 0  || senderKeyPairIndex >= keyPairs.length) {
    throw new Error('senderKeyPairIndex out of bounds')
  }
  if(recipientKeyPairIndex <= 0  || recipientKeyPairIndex >= keyPairs.length) {
    throw new Error('recipientKeyPairIndex out of bounds')
  }
  
  bodyBuilder
    .setMemo('dummy memo')  
    .setCreatedAt(createdAt)
    .setVersionNumber(versionString)
    .setDeferredTransfer(
      new GradidoTransfer(
        new TransferAmount(keyPairs[senderKeyPairIndex].publicKey, amount),
        keyPairs[recipientKeyPairIndex].publicKey
      ), timeout
    )
  transactionBuilder
    .setTransactionBody(bodyBuilder.build())
    .sign(new KeyPairEd25519(keyPairs[senderKeyPairIndex].publicKey, keyPairs[senderKeyPairIndex].privateKey))

  return blockchain.addGradidoTransaction(transactionBuilder.build(), null, generateNewConfirmedAt(createdAt))
}

function createRegisterAddressCursor(): void {
  createRegisterAddress(keyPairCursor);
	keyPairCursor += 2;
}

describe('InMemoryBlockchain', () => {
  beforeAll(() => {
    keyPairs = generateKeyPairs()
    transactionBuilder = new GradidoTransactionBuilder
    bodyBuilder = new TransactionBodyBuilder
    loadCryptoKeys(new MemoryBlock('salt'), MemoryBlock.fromHex('87da546fe765feadf541654ea654ef21'))
  })
  beforeEach(() => {
    keyPairCursor = 3
    lastCreatedAt = new Date(1641681324000)
    const tempBlockchain = InMemoryBlockchainProvider.getInstance().findBlockchain(communityId)
    expect(tempBlockchain).not.toBeNull()
    blockchain = tempBlockchain!

    // first transaction, community root to "register" community and make first public keys known
    const bodyBytes = MemoryBlock.fromBase64(communityRootTransactionBase64)
    transactionBuilder
      .setTransactionBody(bodyBytes)
      .sign(new KeyPairEd25519(keyPairs[0].publicKey, keyPairs[0].privateKey))

    blockchain.addGradidoTransaction(transactionBuilder.build(), null, generateNewConfirmedAt(lastCreatedAt))
  })
  afterEach(() => {
    InMemoryBlockchainProvider.getInstance().clear()
  })

  describe('find community root transaction', () => {
    it('by type', () => {
      const f = new Filter()
      f.transactionType = TransactionType_COMMUNITY_ROOT
      let transaction = blockchain.findOne(f)
      expect(transaction).not.toBeNull()
      let body = transaction?.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isCommunityRoot()).toBeTruthy()

      // after adding two create addresses transactions
      createRegisterAddressCursor()
      createRegisterAddressCursor()
      transaction = blockchain.findOne(f)      
      expect(transaction).not.toBeNull()
      body = transaction?.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isCommunityRoot()).toBeTruthy()
    })

    it('by public key', () => {
      const f = new Filter()
      f.involvedPublicKey = keyPairs[0].publicKey
      let transaction = blockchain.findOne(f)
      expect(transaction).not.toBeNull()
      let body = transaction?.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isCommunityRoot()).toBeTruthy()

      // after adding two create addresses transactions
      createRegisterAddressCursor()
      createRegisterAddressCursor()
      transaction = blockchain.findOne(f)      
      expect(transaction).not.toBeNull()
      body = transaction?.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isCommunityRoot()).toBeTruthy()
    })

    it('by transaction nr', () => {
      const f = new Filter()
      f.minTransactionNr = 1
      f.maxTransactionNr = 1
      let transaction = blockchain.findOne(f)
      expect(transaction).not.toBeNull()
      let body = transaction?.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isCommunityRoot()).toBeTruthy()

      // after adding two create addresses transactions
      createRegisterAddressCursor()
      createRegisterAddressCursor()
      transaction = blockchain.findOne(f)      
      expect(transaction).not.toBeNull()
      body = transaction?.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isCommunityRoot()).toBeTruthy()
    })
  })

  describe('register address', () => {
    it('register some addresses', () => {
      expect(() => createRegisterAddressCursor()).not.toThrow()
      expect(() => createRegisterAddressCursor()).not.toThrow()
      expect(() => createRegisterAddressCursor()).not.toThrow()
	    const f = new Filter
	    f.involvedPublicKey = keyPairs[8].publicKey
	    let transaction = blockchain.findOne(f)
      expect(transaction).not.toBeNull()
      let body = transaction?.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isRegisterAddress()).toBeTruthy()
    })

    it('invalid register address again', () => {
      expect(() => createRegisterAddress(3)).not.toThrow()
      expect(() => createRegisterAddress(3))
        .toThrow('cannot register address because it already exist')
    })
  })

  describe('creation transactions', () => {
    it('valid', () => {
      // register account and additional dummy account
      expect(() => createRegisterAddress(3)).not.toThrow()
      expect(() => createRegisterAddress(5)).not.toThrow()

      // first creation
      let createdAt = generateNewCreatedAt()
      let targetDate = getFirstDayOfPreviousNMonth(createdAt, 1)
      expect(createGradidoCreation(6, 4, '1000.0', createdAt, targetDate)).toBeTruthy()

      // check account balance
      expect(getBalance(6, lastConfirmedAt).toString()).toEqual(new GradidoUnit(1000).toString())

      // second creation
      createdAt = new Date(createdAt.getTime() + 23 * 60 * 60 * 1000)
      lastCreatedAt = createdAt
      let newTargetDate = getFirstDayOfPreviousNMonth(createdAt, 2)
      if(targetDate.getMonth() === newTargetDate.getMonth()) {
        newTargetDate = getFirstDayOfPreviousNMonth(createdAt, 1)
      }
      expect(createGradidoCreation(6, 4, '1000.0', createdAt, newTargetDate)).toBeTruthy()

      // check account balance
      // 1000.0000 decayed for 23 hours => 998.1829
      expect(getBalance(6, lastConfirmedAt).toString()).toEqual(new GradidoUnit(1998.1829).toString())

      expect(() => createRegisterAddress(7)).not.toThrow()
      createdAt = generateNewCreatedAt()
      targetDate = getFirstDayOfPreviousNMonth(createdAt, 2)
      expect(createGradidoCreation(8, 4, '1000.0', createdAt, targetDate)).toBeTruthy()

      expect(getBalance(8, lastConfirmedAt).toString()).toEqual(new GradidoUnit(1000).toString())
    })

    it('invalid', () => {
      // register account and additional dummy account
      expect(() => createRegisterAddress(3)).not.toThrow()
      expect(() => createRegisterAddress(5)).not.toThrow()
      let createdAt = generateNewCreatedAt()
      let targetDate = getFirstDayOfPreviousNMonth(createdAt, 1)

      // valid creation
      expect(createGradidoCreation(6, 4, '1000.0', createdAt, targetDate)).toBeTruthy()
      const confirmedAtValidCreation = lastConfirmedAt
      createdAt = new Date(createdAt.getTime() + 120 * 1000)
      // invalid creation
      expect(() => createGradidoCreation(6, 4, '1000.0', createdAt, targetDate))
        .toThrow('creation more than 1.000 GDD per month not allowed, target date: 12 2021, try to create: 1000.0000 GDD, for this target already created: 1000.0000 GDD')
      createdAt = new Date(createdAt.getTime() + 10 * 60 * 60 * 1000)
      targetDate = getFirstDayOfPreviousNMonth(createdAt, 3)
      // invalid creation
      expect(() => createGradidoCreation(6, 4, '1000.0', createdAt, targetDate))
        .toThrow('target date month is invalid with memo: dummy memo and  with target_date: TimestampSeconds, expected: >= ' + createdAt.toISOString().replace('T', ' ').replace('Z', '0') + ' - 2 months, actual: 2021-10-01 00:00:00.0000')
      // balance from first creation, but 10 hours and 3 minutes later
      const decayed = new GradidoUnit(1000).calculateDecay(confirmedAtValidCreation, lastConfirmedAt)
      expect(decayed.toString()).toEqual('999.2069')
      expect(getBalance(6, lastConfirmedAt).toString()).toEqual(decayed.toString())
      
      expect(() => createRegisterAddress(7)).not.toThrow()
      createdAt = generateNewCreatedAt()
      targetDate = getFirstDayOfPreviousNMonth(createdAt, 3)
      expect(() => createGradidoCreation(8, 4, '1000.0', createdAt, targetDate))
        .toThrow('target date month is invalid with memo: dummy memo and  with target_date: TimestampSeconds, expected: >= ' + createdAt.toISOString().replace('T', ' ').replace('Z', '0') + ' - 2 months, actual: 2021-10-01 00:00:00.0000')
      expect(getBalance(8, lastConfirmedAt).toString()).toEqual(new GradidoUnit(0).toString())
    })
  })

  describe('gradido transfer', () => {
    it('valid', () => {
      // register creation account and second account for sending gdd around
      expect(() => createRegisterAddress(3)).not.toThrow()
      expect(() => createRegisterAddress(5)).not.toThrow()

      // first creation
      let createdAt = generateNewCreatedAt()
      let targetDate = getFirstDayOfPreviousNMonth(createdAt, 1)
      expect(createGradidoCreation(6, 4, '1000.0', createdAt, targetDate)).toBeTruthy()

      // check account
      expect(getBalance(6, lastConfirmedAt).toString()).toEqual(new GradidoUnit(1000).toString())

      // transfer
      createdAt = new Date(lastCreatedAt.getTime() + 2* 24 * 60 * 60 * 1000)
      expect(() => createGradidoTransfer(6, 4, '500.10', createdAt)).not.toThrow()

      // check accounts
      expect(getBalance(4, lastConfirmedAt).toString()).toEqual(new GradidoUnit(500.1).toString())
      expect(getBalance(6, lastConfirmedAt).toString()).toEqual(new GradidoUnit(496.1116).toString())
    })

    it('invalid', () => {
      // register creation account and second account for sending gdd around
      expect(() => createRegisterAddress(3)).not.toThrow()
      expect(() => createRegisterAddress(5)).not.toThrow()

      // transfer
      expect(() => createGradidoTransfer(6, 4, '500.10', generateNewCreatedAt()))
        .toThrow('not enough gdd for transfer or deferred transfer, needed: 500.1000, exist: 0.0000')

      expect(getBalance(4, lastConfirmedAt).toString()).toEqual(new GradidoUnit(0).toString())
      expect(getBalance(6, lastConfirmedAt).toString()).toEqual(new GradidoUnit(0).toString())
    })
  })

  describe('gradido deferred transfer', () => {
    it('valid', () => {
      // register creation account and second account for sending gdd around
      expect(() => createRegisterAddress(3)).not.toThrow()
      expect(() => createRegisterAddress(5)).not.toThrow()

      // first creation
      let createdAt = generateNewCreatedAt()
      let targetDate = getFirstDayOfPreviousNMonth(createdAt, 1)
      expect(createGradidoCreation(6, 4, '1000.0', createdAt, targetDate)).toBeTruthy()

      // deferred transfer
      createdAt = new Date(lastCreatedAt.getTime() + 10 * 60 * 60 * 1000)
      const timeout = new Date(createdAt.getTime() + 60 * 24 * 60* 60 * 1000)
      const recipientKeyPairIndex = keyPairCursor
      keyPairCursor++
      expect(() => createGradidoDeferredTransfer(6, recipientKeyPairIndex, '500.10', createdAt, timeout)).not.toThrow()

      // check account
      const deferredTransferBalance = getBalance(recipientKeyPairIndex, lastConfirmedAt)
      expect(getBalance(6, lastConfirmedAt).equal(new GradidoUnit(499.1095))).toBeTruthy()

      expect(() => createGradidoTransfer(recipientKeyPairIndex, 4, '500', generateNewCreatedAt())).not.toThrow()
    })
  })
})