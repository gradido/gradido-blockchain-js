import { randombytes_uniform } from 'sodium-native'
import {
  AddressType_COMMUNITY_HUMAN,
  Filter,
  GradidoTransactionBuilder,
  GradidoUnit,
  InMemoryBlockchain,
  InMemoryBlockchainProvider,
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
  return new Date(startDate.getFullYear(), startDate.getMonth() - monthsAgo, 1)
}

function randomSeconds(): number {
  // 40 minutes
  const min = 2400
  // 2 days
  const max = 2 * 24 * 60 * 60

  return randombytes_uniform(max - min) + min
}

class Account {
  constructor(pubkeyIndex: number) {
    this.pubkeyIndex = pubkeyIndex
  }
  pubkeyIndex: number
  balance: GradidoUnit
  balanceDate: Date
}

let keyPairs: KeyPair[]
let keyPairCursor: number
const communityId = 'test-community'
let lastCreatedAt: Date
let blockchain: InMemoryBlockchain
let transactionBuilder: GradidoTransactionBuilder
let bodyBuilder: TransactionBodyBuilder
let keyPairIndexAccountMap: Map<number, Account>

function generateNewCreatedAt(): Date {
  lastCreatedAt = new Date(lastCreatedAt.getTime() + randomSeconds() * 1000)
  return lastCreatedAt
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

  keyPairIndexAccountMap.set(accountPubkeyIndex, new Account(accountPubkeyIndex))
  expect(blockchain.addGradidoTransaction(transactionBuilder.build(),null, lastCreatedAt)).toBeTruthy()
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
  if(blockchain.addGradidoTransaction(transactionBuilder.build(), null, new Date(createdAt.getTime() + 45000 ))) {
    const lastTransaction = blockchain.findOne(Filter.LAST_TRANSACTION)?.getConfirmedTransaction()
    expect(lastTransaction).not.toBeNull()
    const account = keyPairIndexAccountMap.get(recipientKeyPairIndex)
    expect(account).not.toBeUndefined()
    account!.balance = lastTransaction!.getAccountBalance()
    account!.balanceDate = lastTransaction!.getConfirmedAt().getDate()
    return true
  }
  return false
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
    keyPairIndexAccountMap = new Map<number, Account>()

    // first transaction, community root to "register" community and make first public keys known
    const bodyBytes = MemoryBlock.fromBase64(communityRootTransactionBase64)
    transactionBuilder
      .setTransactionBody(bodyBytes)
      .sign(new KeyPairEd25519(keyPairs[0].publicKey, keyPairs[0].privateKey))

    blockchain.addGradidoTransaction(transactionBuilder.build(), null, lastCreatedAt)
  })
  afterEach(() => {
    InMemoryBlockchainProvider.getInstance().clear()
    keyPairIndexAccountMap.clear()
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
      const targetDate = getFirstDayOfPreviousNMonth(createdAt, 1)
      expect(createGradidoCreation(6, 4, '1000.0', createdAt, targetDate)).toBeTruthy()

      // check account map
      const account = keyPairIndexAccountMap.get(6)
      expect(account?.balance.equal(new GradidoUnit(1000.0))).toBeTruthy()
      expect(account?.balanceDate.getTime()).toBeGreaterThan(createdAt.getTime())

      // second creation
      createdAt = new Date(createdAt.getTime() + 23 * 60 * 60 * 1000)
      lastCreatedAt = createdAt
      let newTargetDate = getFirstDayOfPreviousNMonth(createdAt, 2)
      if(targetDate.getMonth() === newTargetDate.getMonth()) {
        newTargetDate = getFirstDayOfPreviousNMonth(createdAt, 1)
      }
      console.log(newTargetDate.toISOString())
      expect(createGradidoCreation(6, 4, '1000.0', createdAt, newTargetDate)).toBeTruthy()

      // check account map
      // 1000.0000 decayed for 23 hours => 998.1829
      expect(account?.balance.equal(new GradidoUnit(1998.1829))).toBeTruthy()
      expect(account?.balanceDate.getTime()).toBeGreaterThan(createdAt.getTime())
    })
  })
})