import { crypto_generichash_BYTES } from 'sodium-native'
import { 
  AccountBalance,
  AccountBalances,
  AddressType_COMMUNITY_HUMAN, 
  ConfirmedTransaction,   
  EncryptedMemo, 
  GradidoTransaction, 
  GradidoTransactionBuilder, 
  GradidoTransfer, 
  GradidoUnit,
  KeyPairEd25519, 
  MemoryBlock, 
  MemoryBlockPtr,
  SignatureMap, 
  SignaturePair, 
  Timestamp, 
  TransactionBody,
  TransferAmount 
} from '../..'
import { 
  autoCompleteTransactionMemoString, 
  confirmedAt, 
  confirmedTransactionVersionString, 
  createdAt, 
  creationMemo, 
  deferredTransferMemo, 
  timeoutDuration, 
  transferMemo, 
  versionString 
} from '../helper/const'
import { generateKeyPairs } from '../helper/keyPairs'
import { invalidBodyTestPayload } from '../helper/serializedTransactions'

function toJson(body: TransactionBody) {
  return JSON.parse(body.toJson())
}

let keyPairs: KeyPairEd25519[]
const builder = new GradidoTransactionBuilder()

describe('test interaction to Json', () => {
  beforeAll(() => {
    keyPairs = generateKeyPairs()
  })
  beforeEach(() => {
    builder.reset()
    builder
      .setCreatedAt(createdAt)
      .setVersionNumber(versionString)
  })
  it('transaction body without memo', () => {
    const body = new TransactionBody(createdAt, versionString)

    expect(toJson(body)).toMatchObject({
      memos: [],
      createdAt: '2021-01-01 00:00:00.0000',
      versionNumber: versionString,
      type: 'LOCAL'
    })
  })

  it('community root body', () => {
    const transaction = builder
      .setCommunityRoot(
        keyPairs[0].getPublicKey(),
        keyPairs[1].getPublicKey(),
        keyPairs[2].getPublicKey()
      )
      .sign(keyPairs[0])
      .build()

    const body = transaction.getTransactionBody()
    expect(body).not.toBeNull()
    expect(body?.isCommunityRoot())
    expect(toJson(body!)).toMatchObject({
      memos: [],
      createdAt: '2021-01-01 00:00:00.0000',
      versionNumber: versionString,
      type: 'LOCAL',
      communityRoot: {
        pubkey: '81670329946988edf451f4c424691d83cf5a90439042882d5bb72243ef551ef4',
        gmwPubkey: 'd7e3a8a090aa44873246f5c6acfc17ff74ee174f56e7bd2a55ffb81041f6db1d',
        aufPubkey: '946f583630d89c77cc1fc61d46726a3adeacb91ccab166c08a44ca0a0a0255c4'
      }
    })
  })

  it('register address transaction body', () => {
    const transaction = builder
      .setRegisterAddress(
        keyPairs[3].getPublicKey(),
        AddressType_COMMUNITY_HUMAN,
        null,
        keyPairs[4].getPublicKey()	
      )
      .sign(keyPairs[0])
      .sign(keyPairs[4])
      .build()

    const body = transaction.getTransactionBody()
    expect(body).not.toBeNull()
    expect(body?.isRegisterAddress())
    expect(toJson(body!)).toMatchObject({
      memos: [],
      createdAt: '2021-01-01 00:00:00.0000',
      versionNumber: versionString,
      type: 'LOCAL',
      registerAddress: {
        userPubkey: 'f4dd3989f7554b7ab32e3dd0b7f9e11afce90a1811e9d1f677169eb44bf44272',
        addressType: 'COMMUNITY_HUMAN',
        accountPubkey: 'db0ed6125a14f030abed1bfc831e0a218cf9fabfcee7ecd581c0c0e788f017c7',
        derivationIndex: 1
      }
    })
  })

  it('gradido creation transaction body', () => {
    const transaction = builder
      .setTransactionCreation(
        new TransferAmount(keyPairs[4].getPublicKey(), GradidoUnit.fromGradidoCent(10000000)),
        new Date(1609459000000)
      )
      .addMemo(creationMemo)
      .sign(keyPairs[6])
      .build()

    const body = transaction.getTransactionBody()
    expect(body).not.toBeNull()
    expect(body?.isCreation()).toBeTruthy()
    expect(toJson(body!)).toMatchObject(
      {
        memos: [{
          memo: creationMemo.getMemo().copyAsString(),
          type: 'PLAIN'
        }],
        createdAt: '2021-01-01 00:00:00.0000',
        versionNumber: versionString,
        type: 'LOCAL',
        creation: {
          recipient: {
            pubkey: 'db0ed6125a14f030abed1bfc831e0a218cf9fabfcee7ecd581c0c0e788f017c7',
            amount: '1000.0000'
          },
          targetDate: '2020-12-31 23:56:40.0000'
        }
      }
    )
  })

  it('gradido transfer transaction body', () => {
    const transaction = builder
      .setTransactionTransfer(
        new TransferAmount(keyPairs[4].getPublicKey(), new GradidoUnit('500.55')),
        keyPairs[5].getPublicKey()
      )
      .addMemo(transferMemo)
      .sign(keyPairs[4])
      .build()

    const body = transaction.getTransactionBody()
    expect(body).not.toBeNull()
    expect(body?.isTransfer()).toBeTruthy()
    expect(toJson(body!)).toMatchObject(
      {
        memos: [{
          memo: transferMemo.getMemo().copyAsString(),
          type: 'PLAIN'
        }],
        createdAt: '2021-01-01 00:00:00.0000',
        versionNumber: versionString,
        type: 'LOCAL',
        transfer: {
          sender: {
            pubkey: 'db0ed6125a14f030abed1bfc831e0a218cf9fabfcee7ecd581c0c0e788f017c7',
            amount: '500.5500'
          },
          recipient: '244d28d7cc5be8fe8fb0d8e1d1b90de7603386082d793ce8874f6357e6e532ad'
        }
      }
    )
  })

  it('gradido deferred transfer transaction body', () => {
    const transaction = builder
      .setDeferredTransfer(
        new GradidoTransfer(
          new TransferAmount(keyPairs[4].getPublicKey(), GradidoUnit.fromGradidoCent(5555500)),
          keyPairs[5].getPublicKey()
        ), timeoutDuration
      )
      .addMemo(deferredTransferMemo)
      .sign(keyPairs[4])
      .build()

    const body = transaction.getTransactionBody()
    expect(body).not.toBeNull()
    expect(body?.isDeferredTransfer()).toBeTruthy()
    expect(toJson(body!)).toMatchObject(
      {
        memos: [{
          memo: deferredTransferMemo.getMemo().copyAsString(),
          type: 'PLAIN'
        }],
        createdAt: '2021-01-01 00:00:00.0000',
        versionNumber: versionString,
        type: 'LOCAL',
        deferredTransfer: {
          transfer: {
            sender: {
              amount: '555.5500',
              pubkey: 'db0ed6125a14f030abed1bfc831e0a218cf9fabfcee7ecd581c0c0e788f017c7',
            },
            recipient: '244d28d7cc5be8fe8fb0d8e1d1b90de7603386082d793ce8874f6357e6e532ad'
          },
          timeout: '91 days 7 hours 27 minutes 18 seconds'
        }
      }
    )
  })

  it('community friends update transaction body', () => {
    const transaction = builder
      .setCommunityFriendsUpdate(true)
      .sign(keyPairs[0])
      .build()
    
    const body = transaction.getTransactionBody()
    expect(body).not.toBeNull()
    expect(body?.isCommunityFriendsUpdate()).toBeTruthy()
    expect(toJson(body!)).toMatchObject(
      {
        memos: [],
        createdAt: '2021-01-01 00:00:00.0000',
        versionNumber: versionString,
        type: 'LOCAL',
        communityFriendsUpdate: { colorFusion: true }
      }
    )
  })

  it('gradido transaction with signature', () => {
    const bodyBytes = new MemoryBlock(invalidBodyTestPayload)
    const signatures = new SignatureMap
    signatures.push(new SignaturePair(keyPairs[3].getPublicKey(), new MemoryBlockPtr(keyPairs[3].sign(bodyBytes))))

    const gradidoTransaction = new GradidoTransaction(signatures, new MemoryBlockPtr(bodyBytes))
    expect(JSON.parse(gradidoTransaction.toJson())).toMatchObject(
      {
        signatureMap: [
          {
            pubkey: 'f4dd3989f7554b7ab32e3dd0b7f9e11afce90a1811e9d1f677169eb44bf44272',
            signature: 'b4c8d994c7c08a6b13685d33767fc843061a6bcfa0d3c415335567610c0deeaa45efce6e038ca7c1d21bcfba98b0f6fa9ed6c75f9cda6ce186db400120c09a02'
          }
        ],
      }
    )    
  })

  it('minimal confirmed transaction', () => {
    const confirmedTransaction = new ConfirmedTransaction(
      7,
      new GradidoTransaction,
      new Timestamp(confirmedAt),
      confirmedTransactionVersionString,
      new MemoryBlockPtr(new MemoryBlock(Buffer.alloc(crypto_generichash_BYTES))),
      new MemoryBlockPtr(new MemoryBlock(Buffer.alloc(32))),
      new AccountBalances(),
    )
    expect(JSON.parse(confirmedTransaction.toJson())).toMatchObject(
      {
        id: 7,
        gradidoTransaction: { signatureMap: [] },
        confirmedAt: '2021-01-01 01:22:10.0000',
        versionNumber: confirmedTransactionVersionString,
        runningHash: '0000000000000000000000000000000000000000000000000000000000000000',
        messageId: '0000000000000000000000000000000000000000000000000000000000000000',
      }
    )
  })

  it('complete confirmed transaction', () => {
    const builder = new GradidoTransactionBuilder
    const gradidoTransaction = builder
      .setCreatedAt(createdAt)
      .setTransactionTransfer(
        new TransferAmount(
          keyPairs[4].getPublicKey(),
          GradidoUnit.fromGradidoCent(1002516)
        ), keyPairs[5].getPublicKey()
      )
      .addMemo(new EncryptedMemo(autoCompleteTransactionMemoString))
      .sign(keyPairs[0])
      .build()

    const accountBalances = new AccountBalances()
    accountBalances.add(new AccountBalance(keyPairs[4].getPublicKey(), GradidoUnit.fromGradidoCent(1000000), ''))
    accountBalances.add(new AccountBalance(keyPairs[5].getPublicKey(), GradidoUnit.fromGradidoCent(8997483), ''))
     const confirmedTransaction = new ConfirmedTransaction(
      7,
      gradidoTransaction,
      new Timestamp(confirmedAt),
      confirmedTransactionVersionString,
      new MemoryBlockPtr(new MemoryBlock(Buffer.alloc(32))),
      accountBalances,
    )

    expect(JSON.parse(confirmedTransaction.toJson())).toMatchObject(
      {
        id: 7,
        gradidoTransaction: { 
          signatureMap: [{
            pubkey: '81670329946988edf451f4c424691d83cf5a90439042882d5bb72243ef551ef4',
            signature: '04e0d0f6c4bbd2d87dc879fc5f72be48dbf682c888757fd5d3d6da0af4026fec848f60ddfdfcd284862a7f7a68a08330274d4190325d346059b39303cc40240a'
          }], 
          bodyBytes: { 
            createdAt: '2021-01-01 00:00:00.0000',
            memos: [{
              memo: autoCompleteTransactionMemoString,
              type: 'PLAIN'
            }],
            transfer: {
              recipient: '244d28d7cc5be8fe8fb0d8e1d1b90de7603386082d793ce8874f6357e6e532ad',
              sender: {
                amount: '100.2516',
                pubkey: 'db0ed6125a14f030abed1bfc831e0a218cf9fabfcee7ecd581c0c0e788f017c7',
              },
            },
            type: 'LOCAL',
            versionNumber: versionString,
          }
        },
        confirmedAt: '2021-01-01 01:22:10.0000',
        versionNumber: confirmedTransactionVersionString,
        runningHash: '28a58de12318789f59ee15373a1ef8337da0e2cd66f266bf756590ffb5447ecc',
        messageId: '0000000000000000000000000000000000000000000000000000000000000000',
        accountBalances: [
          {
            pubkey: 'db0ed6125a14f030abed1bfc831e0a218cf9fabfcee7ecd581c0c0e788f017c7',
            balance: '100.0000'
          },
          {
            pubkey: '244d28d7cc5be8fe8fb0d8e1d1b90de7603386082d793ce8874f6357e6e532ad',
            balance: '899.7483'
          }
        ]
      }
    )
  })
})