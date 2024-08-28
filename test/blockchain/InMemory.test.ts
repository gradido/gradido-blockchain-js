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
  TransactionType_COMMUNITY_ROOT
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
      const transaction = blockchain.findOne(f)
    })
  })
})