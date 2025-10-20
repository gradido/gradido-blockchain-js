import { randombytes_uniform } from 'sodium-native'
import {
  AddressType_COMMUNITY_HUMAN,
  DurationSeconds,
  EncryptedMemo,
  Filter,
  GradidoTransactionBuilder,
  GradidoTransfer,
  GradidoUnit,
  InMemoryBlockchain,
  InMemoryBlockchainProvider,
  InteractionCalculateAccountBalance,
  KeyPairEd25519,
  loadCryptoKeys,
  MemoryBlock,
  MnemonicType_BIP0039_SORTED_ORDER,
  Passphrase,
  Timestamp,
  TransactionType_COMMUNITY_ROOT,
  TransferAmount
} from '../../'
import { versionString } from '../helper/const'

const memo = new EncryptedMemo('dummy memo')

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


let keyPairs: KeyPairEd25519[]
let keyPairCursor: number
const communityId = 'test-community'
let lastCreatedAt: Date
let lastConfirmedAt: Date
let blockchain: InMemoryBlockchain
let builder: GradidoTransactionBuilder

function generateNewCreatedAt(): Date {
  lastCreatedAt = new Date(lastCreatedAt.getTime() + randomSeconds() * 1000)
  return lastCreatedAt
}

function generateNewConfirmedAt(createdAt: Date): Date {
  lastConfirmedAt = new Date(createdAt.getTime() + 60 * 1000)
  return lastConfirmedAt
}

function generateKeyPairs() {
  let keyPairs: KeyPairEd25519[] = []
  for(let i = 0; i < 20; i++) {
    const keyPair = KeyPairEd25519.create(Passphrase.generate(MnemonicType_BIP0039_SORTED_ORDER))
    if(!keyPair) {
      throw new Error('error creating random key pair')
    }
    keyPairs[i] = keyPair
  }
  return keyPairs
}

function getBalance(keyPairIndex: number, date: Date): GradidoUnit 
{
  if(keyPairIndex <= 0 || keyPairIndex >= keyPairs.length ) {
    throw new Error('keyPairIndex out of bounds')
  }
  const balanceCalculator = new InteractionCalculateAccountBalance(blockchain)
  return balanceCalculator.fromEnd(keyPairs[keyPairIndex].getPublicKey(), date, '')
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
    console.log(confirmedTransaction.toJson(true))
  }
  console.log('------ log blockchain end ---------')
}

function createRegisterAddress(keyPairIndexStart: number) {
  if (keyPairIndexStart + 1 >= keyPairs.length) {
		throw new Error('not enough key pairs')
	}
  const userPubkeyIndex = keyPairIndexStart
  const accountPubkeyIndex = keyPairIndexStart + 1
  builder
    .setCreatedAt(generateNewCreatedAt())
    .setVersionNumber(versionString)
    .setRegisterAddress(
      keyPairs[userPubkeyIndex].getPublicKey(),
      AddressType_COMMUNITY_HUMAN,
      null,
      keyPairs[accountPubkeyIndex].getPublicKey()
    )
    .sign(keyPairs[accountPubkeyIndex])
    // sign with community root key
    .sign(keyPairs[0])

  expect(blockchain.createAndAddConfirmedTransaction(
    builder.build(),
    null, 
    new Timestamp(generateNewConfirmedAt(lastCreatedAt))
  )).toBeTruthy()
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
  builder
    .addMemo(memo)
    .setCreatedAt(createdAt)
    .setVersionNumber(versionString)
    .setTransactionCreation(
      new TransferAmount(keyPairs[recipientKeyPairIndex].getPublicKey(), new GradidoUnit(amount)),
      targetDate
    )
    .sign(keyPairs[signerKeyPairIndex])
  return blockchain.createAndAddConfirmedTransaction(builder.build(), null, new Timestamp(generateNewConfirmedAt(createdAt)))
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
  builder
    .addMemo(memo)  
    .setCreatedAt(createdAt)
    .setVersionNumber(versionString)
    .setTransactionTransfer(
      new TransferAmount(keyPairs[senderKeyPairIndex].getPublicKey(), new GradidoUnit(amount)),
      keyPairs[recipientKeyPairIndex].getPublicKey()
    )
    .sign(keyPairs[senderKeyPairIndex])

  return blockchain.createAndAddConfirmedTransaction(builder.build(), null, new Timestamp(generateNewConfirmedAt(createdAt)))
}


function createGradidoDeferredTransfer(
  senderKeyPairIndex: number,
  recipientKeyPairIndex: number,
  amount: GradidoUnit,
  createdAt: Date,
  timeoutDuration: DurationSeconds
) : boolean {
  if(senderKeyPairIndex <= 0  || senderKeyPairIndex >= keyPairs.length) {
    throw new Error('senderKeyPairIndex out of bounds')
  }
  if(recipientKeyPairIndex <= 0  || recipientKeyPairIndex >= keyPairs.length) {
    throw new Error('recipientKeyPairIndex out of bounds')
  }
  
  builder
    .addMemo(memo)  
    .setCreatedAt(createdAt)
    .setVersionNumber(versionString)
    .setDeferredTransfer(
      new GradidoTransfer(
        new TransferAmount(keyPairs[senderKeyPairIndex].getPublicKey(), amount),
        keyPairs[recipientKeyPairIndex].getPublicKey()
      ), timeoutDuration, 
    )
    .sign(keyPairs[senderKeyPairIndex])

  return blockchain.createAndAddConfirmedTransaction(builder.build(), null, new Timestamp(generateNewConfirmedAt(createdAt)))
}

function createGradidoRedeemDeferredTransfer(
  senderKeyPairIndex: number,
  recipientKeyPairIndex: number,
  amount: GradidoUnit,
  createdAt: Date,
  deferredTransferNr: number
) : boolean {
  if(senderKeyPairIndex <= 0  || senderKeyPairIndex >= keyPairs.length) {
    throw new Error('senderKeyPairIndex out of bounds')
  }
  if(recipientKeyPairIndex <= 0  || recipientKeyPairIndex >= keyPairs.length) {
    throw new Error('recipientKeyPairIndex out of bounds')
  }

  builder
    .addMemo(memo)  
    .setCreatedAt(createdAt)
    .setVersionNumber(versionString)
    .setRedeemDeferredTransfer(
      deferredTransferNr,
      new GradidoTransfer(
        new TransferAmount(keyPairs[senderKeyPairIndex].getPublicKey(), amount),
        keyPairs[recipientKeyPairIndex].getPublicKey()
      )
    )
    .sign(keyPairs[senderKeyPairIndex])

  return blockchain.createAndAddConfirmedTransaction(builder.build(), null, new Timestamp(generateNewConfirmedAt(createdAt)))
}

function createRegisterAddressCursor(): void {
  createRegisterAddress(keyPairCursor);
	keyPairCursor += 2;
}

describe('InMemoryBlockchain', () => {
  beforeAll(() => {
    keyPairs = generateKeyPairs()
    builder = new GradidoTransactionBuilder
    loadCryptoKeys(new MemoryBlock('salt'), MemoryBlock.fromHex('87da546fe765feadf541654ea654ef21'))
  })
  beforeEach(() => {
    keyPairCursor = 3
    lastCreatedAt = new Date(1641681324000)
    const tempBlockchain = InMemoryBlockchainProvider.getInstance().findBlockchain(communityId)
    expect(tempBlockchain).not.toBeNull()
    blockchain = tempBlockchain!

    // first transaction, community root to "register" community and make first public keys known
    builder
      .setCommunityRoot(
        keyPairs[0].getPublicKey(),
        keyPairs[1].getPublicKey(),
        keyPairs[2].getPublicKey()
      )
     .setCreatedAt(lastCreatedAt)
     .sign(keyPairs[0])
    blockchain.createAndAddConfirmedTransaction(builder.build(), null, new Timestamp(generateNewConfirmedAt(lastCreatedAt)))
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
      f.involvedPublicKey = keyPairs[0].getPublicKey()
      expect(f.involvedPublicKey?.isNull()).toBeFalsy()
      let transaction = blockchain.findOne(f)
      expect(transaction).not.toBeNull()
      let body = transaction?.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isCommunityRoot()).toBeTruthy()

      // after adding two create addresses transactions
      createRegisterAddressCursor()
      createRegisterAddressCursor()
      f.transactionType = TransactionType_COMMUNITY_ROOT
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
	    f.involvedPublicKey = keyPairs[8].getPublicKey()
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
        .toThrow('creation more than 1000.0000 not allowed, target date: 12 2021, try to create: 1000.0000 GDD, for this target already created: 1000.0000 GDD')
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
        .toThrow('not enough Gradido Balance for send coins, needed: 500.1000, exist: 0.0000')

      expect(getBalance(4, lastConfirmedAt).toString()).toEqual(new GradidoUnit(0).toString())
      expect(getBalance(6, lastConfirmedAt).toString()).toEqual(new GradidoUnit(0).toString())
    })
  })

  describe('gradido deferred transfer', () => {
    it('valid', () => {
      // register creation account and second account for sending gdd around
      expect(() => createRegisterAddress(3)).not.toThrow()
      expect(() => createRegisterAddress(5)).not.toThrow()
      expect(() => createRegisterAddress(7)).not.toThrow()

      // first creation
      let createdAt = generateNewCreatedAt()
      let targetDate = getFirstDayOfPreviousNMonth(createdAt, 1)
      expect(createGradidoCreation(6, 4, '1000.0', createdAt, targetDate)).toBeTruthy()

      // deferred transfer
      // + 10 hours
      createdAt = new Date(lastCreatedAt.getTime() + 10 * 60 * 60 * 1000)
      const firstDeferredTransferCreatedAt = new Date(createdAt)
      // 60 days
      const timeoutDuration = new DurationSeconds(60 * 24 * 60* 60)
      const recipientKeyPairIndex = 9
      const deferredTransferAmount = new GradidoUnit(500.1).calculateCompoundInterest(timeoutDuration.getSeconds())
      expect(() => createGradidoDeferredTransfer(6, recipientKeyPairIndex, deferredTransferAmount, createdAt, timeoutDuration)).not.toThrow()

      // check account  
      let blockedDeferredTransferBalance = new GradidoUnit(500.1)
        .calculateCompoundInterest(createdAt, new Date(createdAt.getTime() + timeoutDuration.getSeconds() * 1000))

      let deferredTransferBalance = getBalance(recipientKeyPairIndex, lastConfirmedAt)
      const userBalanceAtDeferredTransferTime = getBalance(6, createdAt).calculateDecay(createdAt, lastConfirmedAt)
      const userBalance = getBalance(6, lastConfirmedAt)
      const lastUserBalanceDate = lastConfirmedAt
      expect(userBalance.equal(new GradidoUnit(438.7963))).toBeTruthy()      

      const diff = userBalance.minus(userBalanceAtDeferredTransferTime.minus(blockedDeferredTransferBalance))
      expect(Math.abs(diff.getGradidoCent())).toBeLessThanOrEqual(1)
      expect(userBalance.plus(deferredTransferBalance).getGradidoCent()).toBeLessThan(new GradidoUnit(1000.0).getGradidoCent())

      // deferred transfer from deferred transfer account recipientKeyPairIndex to a new account
      // +36 hours
      createdAt = new Date(lastConfirmedAt.getTime() + 36 * 60 * 60 * 1000)
      lastCreatedAt = createdAt
      // 30 days
      const secondTimeoutDuration = new DurationSeconds(24 * 30 * 60 * 60)
      const secondRecipientKeyPairIndex = 6
      const balanceWhenSecondsDeferredTransferStart = getBalance(recipientKeyPairIndex, new Date(firstDeferredTransferCreatedAt.getTime() + 60 * 1000))
      expect(balanceWhenSecondsDeferredTransferStart.getGradidoCent()).toEqual(new GradidoUnit(560.4132).getGradidoCent())
      const recipientPublicKeyHex = keyPairs[recipientKeyPairIndex].getPublicKey()?.convertToHex()
      expect(() => createGradidoDeferredTransfer(recipientKeyPairIndex, secondRecipientKeyPairIndex, new GradidoUnit(483.0), createdAt, secondTimeoutDuration))
        .toThrow(`sender address is deferred transfer, please use redeemDeferredTransferTransaction for that, address type: DEFERRED_TRANSFER, pubkey: ${recipientPublicKeyHex}`)
      expect(createGradidoRedeemDeferredTransfer(recipientKeyPairIndex, secondRecipientKeyPairIndex, new GradidoUnit(483.0), createdAt, 6))
        .toBeTruthy()
      
      let lastTransactionEntry = blockchain.findOne(Filter.LAST_TRANSACTION)
      let confirmedTransaction = lastTransactionEntry?.getConfirmedTransaction()
      expect(confirmedTransaction).not.toBeNull()
      expect(confirmedTransaction?.getAccountBalances().size()).toEqual(2)
      expect(confirmedTransaction?.getAccountBalance(keyPairs[secondRecipientKeyPairIndex].getPublicKey(), '').getBalance()).toEqual(new GradidoUnit(996.3677))
      expect(confirmedTransaction?.getAccountBalance(keyPairs[recipientKeyPairIndex].getPublicKey(), '').getBalance()).toEqual(GradidoUnit.zero())
      
      // check accounts
      blockedDeferredTransferBalance = new GradidoUnit(483.0).calculateCompoundInterest(createdAt, new Date(createdAt.getTime() + secondTimeoutDuration.getSeconds() * 1000))
      const timeoutPlusOneHour = new Date(firstDeferredTransferCreatedAt.getTime() + 60 * 60 * 1000)
      deferredTransferBalance = getBalance(recipientKeyPairIndex, timeoutPlusOneHour)
      const newDeferredTransferBalance = getBalance(secondRecipientKeyPairIndex, lastConfirmedAt)
	    const userBalanceWithChange = getBalance(6, timeoutPlusOneHour)
	    const decayedUserBalance = userBalance.calculateDecay(lastUserBalanceDate, timeoutPlusOneHour)
      const timeBetween = GradidoUnit.calculateDecayDurationSeconds(lastUserBalanceDate, timeoutPlusOneHour)
      expect(userBalanceWithChange.getGradidoCent()).toEqual(decayedUserBalance.getGradidoCent())
      expect(newDeferredTransferBalance.getGradidoCent()).toEqual(new GradidoUnit(996.3677).getGradidoCent())
      expect(timeBetween).toEqual(60 * 60 - 60)

      createdAt = generateNewCreatedAt();
      // 30 days
      const thirdTimeoutDuration = new DurationSeconds(30 * 24 * 60 * 60)
      const thirdRecipientKeyPairIndex = 10
      let originalSenderBalance = getBalance(6, new Date(createdAt.getTime() + 60 * 60 * 1000))
      let deferredFullBalance = new GradidoUnit(400.0).calculateCompoundInterest(thirdTimeoutDuration.getSeconds())
      expect(() => createGradidoDeferredTransfer(6, thirdRecipientKeyPairIndex, deferredFullBalance, createdAt, thirdTimeoutDuration)).not.toThrow()
      originalSenderBalance = originalSenderBalance.minus(deferredFullBalance)
      lastTransactionEntry = blockchain.findOne(Filter.LAST_TRANSACTION)
      confirmedTransaction = lastTransactionEntry?.getConfirmedTransaction()
      expect(confirmedTransaction).not.toBeNull()
      expect(confirmedTransaction?.getAccountBalances().size()).toEqual(2)
      expect(confirmedTransaction?.getAccountBalance(keyPairs[6].getPublicKey(), '').getBalance()).toEqual(originalSenderBalance)
      expect(confirmedTransaction?.getAccountBalance(keyPairs[thirdRecipientKeyPairIndex].getPublicKey(), '').getBalance()).toEqual(deferredFullBalance)      

      // redeem second deferred transfer
      const previousCreatedAt = createdAt;
      createdAt = generateNewCreatedAt();
      originalSenderBalance = originalSenderBalance.calculateDecay(previousCreatedAt, createdAt);
      deferredFullBalance = deferredFullBalance.calculateDecay(previousCreatedAt, createdAt);
      expect(() => createGradidoRedeemDeferredTransfer(thirdRecipientKeyPairIndex, 8, new GradidoUnit(400.0), createdAt, 8)).not.toThrow()
      lastTransactionEntry = blockchain.findOne(Filter.LAST_TRANSACTION)
      confirmedTransaction = lastTransactionEntry?.getConfirmedTransaction()
      expect(confirmedTransaction?.getAccountBalances().size()).toEqual(3)
      expect(confirmedTransaction?.getAccountBalance(keyPairs[secondRecipientKeyPairIndex].getPublicKey(), '').getBalance()).toEqual(originalSenderBalance.plus(deferredFullBalance).minus(new GradidoUnit(400.0)))
      expect(confirmedTransaction?.getAccountBalance(keyPairs[thirdRecipientKeyPairIndex].getPublicKey(), '').getBalance()).toEqual(GradidoUnit.zero())
      expect(confirmedTransaction?.getAccountBalance(keyPairs[8].getPublicKey(), '').getBalance()).toEqual(new GradidoUnit(400.0))	
    })
  })
})