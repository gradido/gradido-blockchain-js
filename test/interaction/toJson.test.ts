import { crypto_generichash_BYTES } from 'sodium-native'
import { 
  AddressType_COMMUNITY_HUMAN, 
  ConfirmedTransaction, 
  GradidoTransaction, 
  GradidoTransactionBuilder, 
  GradidoTransfer, 
  InteractionToJson, 
  KeyPairEd25519, 
  MemoryBlock, 
  SignatureMap, 
  SignaturePair, 
  TransactionBody,
  TransferAmount 
} from '../..'
import { confirmedAt, createdAt, versionString } from '../helper/const'
import { generateKeyPairs } from '../helper/keyPairs'
import { invalidBodyTestPayload } from '../helper/serializedTransactions'

function toJson(body: TransactionBody) {
  return JSON.parse(new InteractionToJson(body).run())
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
    const body = new TransactionBody('', createdAt, versionString)

    expect(toJson(body)).toMatchObject({
      memo: '',
      createdAt: '2021-01-01 00:00:00.0000',
      versionNumber: '3.3',
      type: 'LOCAL'
    })
  })

  it('transaction body with memo', () => {
    const body = new TransactionBody('memo', createdAt, versionString)

    expect(toJson(body)).toMatchObject({
      memo: 'memo',
      createdAt: '2021-01-01 00:00:00.0000',
      versionNumber: '3.3',
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
      memo: '',
      createdAt: '2021-01-01 00:00:00.0000',
      versionNumber: '3.3',
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
      memo: '',
      createdAt: '2021-01-01 00:00:00.0000',
      versionNumber: '3.3',
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
        new TransferAmount(keyPairs[4].getPublicKey(), '1000.00'),
        new Date(1609459000000)
      )
      .setMemo('Deine erste Schoepfung ;)')
      .sign(keyPairs[6])
      .build()

    const body = transaction.getTransactionBody()
    expect(body).not.toBeNull()
    expect(body?.isCreation()).toBeTruthy()
    expect(toJson(body!)).toMatchObject(
      {
        memo: 'Deine erste Schoepfung ;)',
        createdAt: '2021-01-01 00:00:00.0000',
        versionNumber: '3.3',
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
        new TransferAmount(keyPairs[4].getPublicKey(), '500.55'),
        keyPairs[5].getPublicKey()
      )
      .setMemo('Ich teile mit dir')
      .sign(keyPairs[4])
      .build()

    const body = transaction.getTransactionBody()
    expect(body).not.toBeNull()
    expect(body?.isTransfer()).toBeTruthy()
    expect(toJson(body!)).toMatchObject(
      {
        memo: 'Ich teile mit dir',
        createdAt: '2021-01-01 00:00:00.0000',
        versionNumber: '3.3',
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
          new TransferAmount(keyPairs[4].getPublicKey(), '555.55'),
          keyPairs[5].getPublicKey()
        ), new Date(1609465000000)
      )
      .setMemo('Link zum einloesen')
      .sign(keyPairs[4])
      .build()

    const body = transaction.getTransactionBody()
    expect(body).not.toBeNull()
    expect(body?.isDeferredTransfer()).toBeTruthy()
    expect(toJson(body!)).toMatchObject(
      {
        memo: 'Link zum einloesen',
        createdAt: '2021-01-01 00:00:00.0000',
        versionNumber: '3.3',
        type: 'LOCAL',
        deferredTransfer: {
          transfer: {
            sender: {
              amount: '555.5500',
              pubkey: 'db0ed6125a14f030abed1bfc831e0a218cf9fabfcee7ecd581c0c0e788f017c7',
            },
            recipient: '244d28d7cc5be8fe8fb0d8e1d1b90de7603386082d793ce8874f6357e6e532ad'
          },
          timeout: '2021-01-01 01:36:40.0000'
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
        memo: '',
        createdAt: '2021-01-01 00:00:00.0000',
        versionNumber: '3.3',
        type: 'LOCAL',
        communityFriendsUpdate: { colorFusion: true }
      }
    )
  })

  it('gradido transaction with signature', () => {
    const bodyBytes = new MemoryBlock(invalidBodyTestPayload)
    const signatures = new SignatureMap
    signatures.push(new SignaturePair(keyPairs[3].getPublicKey(), keyPairs[3].sign(bodyBytes)))

    const gradidoTransaction = new GradidoTransaction(signatures, bodyBytes)
    expect(JSON.parse(new InteractionToJson(gradidoTransaction).run())).toMatchObject(
      {
        signatureMap: [
          {
            pubkey: 'f4dd3989f7554b7ab32e3dd0b7f9e11afce90a1811e9d1f677169eb44bf44272',
            signature: 'b4c8d994c7c08a6b13685d33767fc843061a6bcfa0d3c415335567610c0deeaa45efce6e038ca7c1d21bcfba98b0f6fa9ed6c75f9cda6ce186db400120c09a02'
          }
        ],
        bodyBytes: { json: 'cannot deserialize from body bytes' }
      }
    )    
  })

  it('minimal confirmed transaction', () => {
    const confirmedTransaction = new ConfirmedTransaction(
      7,
      new GradidoTransaction,
      confirmedAt,
      versionString,
      new MemoryBlock(Buffer.alloc(crypto_generichash_BYTES)),
      new MemoryBlock(Buffer.alloc(32)),
      "179.00"
    )
    expect(JSON.parse(new InteractionToJson(confirmedTransaction).run())).toMatchObject(
      {
        id: 7,
        gradidoTransaction: { signatureMap: [], bodyBytes: { json: 'body bytes missing' } },
        confirmedAt: '2021-01-01 01:22:10.0000',
        versionNumber: '3.3',
        runningHash: '0000000000000000000000000000000000000000000000000000000000000000',
        messageId: '0000000000000000000000000000000000000000000000000000000000000000',
        accountBalance: '179.0000'
      }
    )
  })

  it('complete confirmed transaction', () => {
    const memo = 'Danke fuer dein Sein!'
    const builder = new GradidoTransactionBuilder
    const gradidoTransaction = builder
      .setCreatedAt(createdAt)
      .setTransactionTransfer(
        new TransferAmount(
          keyPairs[4].getPublicKey(),
          '100.251621'
        ), keyPairs[5].getPublicKey()
      )
      .setMemo(memo)
      .sign(keyPairs[0])
      .build()

     const confirmedTransaction = new ConfirmedTransaction(
      7,
      gradidoTransaction,
      confirmedAt,
      versionString,
      new MemoryBlock(Buffer.alloc(32)),
      "899.748379"
    )

    expect(JSON.parse(new InteractionToJson(confirmedTransaction).run())).toMatchObject(
      {
        id: 7,
        gradidoTransaction: { 
          signatureMap: [{
            pubkey: '81670329946988edf451f4c424691d83cf5a90439042882d5bb72243ef551ef4',
            signature: '04e0d0f6c4bbd2d87dc879fc5f72be48dbf682c888757fd5d3d6da0af4026fec35e9221fbf52f66769e086e3b665fead1cf73da934748c88dec4f14304521b09'
          }], 
          bodyBytes: { 
            json: {
              createdAt: '2021-01-01 00:00:00.0000',
              memo: 'Danke fuer dein Sein!',
              transfer: {
                recipient: '244d28d7cc5be8fe8fb0d8e1d1b90de7603386082d793ce8874f6357e6e532ad',
                sender: {
                  amount: '100.2516',
                  pubkey: 'db0ed6125a14f030abed1bfc831e0a218cf9fabfcee7ecd581c0c0e788f017c7',
               },
             },
             type: 'LOCAL',
             versionNumber: '3.3',
            }
          }
        },
        confirmedAt: '2021-01-01 01:22:10.0000',
        versionNumber: '3.3',
        runningHash: '02c718c2d4154829e6e64ed4cb0aeebb5df4cb4f285f49cc299cb286da242afd',
        messageId: '0000000000000000000000000000000000000000000000000000000000000000',
        accountBalance: '899.7484'
      }
    )
  })
})