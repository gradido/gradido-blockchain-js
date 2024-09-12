import { crypto_generichash_BYTES, crypto_sign_BYTES, crypto_sign_detached } from 'sodium-native'
import { AddressType_COMMUNITY_HUMAN, ConfirmedTransaction, GradidoTransaction, GradidoTransactionBuilder, GradidoTransfer, InteractionToJson, KeyPairEd25519, MemoryBlock, SignatureMap, SignaturePair, TransactionBody, TransactionBodyBuilder, TransferAmount } from '../..'
import { confirmedAt, createdAt, versionString } from '../helper/const'
import { generateKeyPairs, KeyPair } from '../helper/keyPairs'
import { invalidBodyTestPayload } from '../helper/serializedTransactions'

function toJson(body: TransactionBody) {
  return JSON.parse(new InteractionToJson(body).run())
}

let keyPairs: KeyPair[]
const builder = new TransactionBodyBuilder()

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
    const body = builder
      .setCommunityRoot(
        keyPairs[0].publicKey,
        keyPairs[1].publicKey,
        keyPairs[2].publicKey
      )
      .build()
    expect(body.isCommunityRoot())
    expect(toJson(body)).toMatchObject({
      memo: '',
      createdAt: '2021-01-01 00:00:00.0000',
      versionNumber: '3.3',
      type: 'LOCAL',
      communityRoot: {
        pubkey: '643c438776fc2634faf887df8485b9ed580729c2099e00e4d4d53cd74626a0d6',
        gmwPubkey: '51f9b1e8d984763add4d90cc6422f1fd4a09c677b98e4b198c055bc29420f58e',
        aufPubkey: 'bb994a1d62e7b3ca7b9f3a7e92a8ed6112a53f76c49595b517cc7450a50b7a5a'
      }
    })
  })

  it('register address transaction body', () => {
    const body = builder
      .setRegisterAddress(
        keyPairs[3].publicKey,
        AddressType_COMMUNITY_HUMAN,
        null,
        keyPairs[4].publicKey	
      )
      .build()
    expect(body.isRegisterAddress())
    expect(toJson(body)).toMatchObject({
      memo: '',
      createdAt: '2021-01-01 00:00:00.0000',
      versionNumber: '3.3',
      type: 'LOCAL',
      registerAddress: {
        userPubkey: '25971aa0e7422144dcc244887e29ef160d5479b1219e9817ca6ece38b09f37c0',
        addressType: 'COMMUNITY_HUMAN',
        accountPubkey: '8a8c93293cb97e8784178da8ae588144f7c982f4658bfd35101a1e2b479c3e57',
        derivationIndex: 1
      }
    })
  })

  it('gradido creation transaction body', () => {
    const body = builder
      .setTransactionCreation(
        new TransferAmount(keyPairs[4].publicKey, '1000.00'),
        new Date(1609459000000)
      )
      .setMemo('Deine erste Schoepfung ;)')
      .build()
    
    expect(body.isCreation()).toBeTruthy()
    expect(toJson(body)).toMatchObject(
      {
        memo: 'Deine erste Schoepfung ;)',
        createdAt: '2021-01-01 00:00:00.0000',
        versionNumber: '3.3',
        type: 'LOCAL',
        creation: {
          recipient: {
            pubkey: '8a8c93293cb97e8784178da8ae588144f7c982f4658bfd35101a1e2b479c3e57',
            amount: '1000.0000'
          },
          targetDate: '2020-12-31 23:56:40.0000'
        }
      }
    )
  })

  it('gradido transfer transaction body', () => {
    const body = builder
      .setTransactionTransfer(
        new TransferAmount(keyPairs[4].publicKey, '500.55'),
        keyPairs[5].publicKey
      )
      .setMemo('Ich teile mit dir')
      .build()
    expect(body.isTransfer()).toBeTruthy()
    expect(toJson(body)).toMatchObject(
      {
        memo: 'Ich teile mit dir',
        createdAt: '2021-01-01 00:00:00.0000',
        versionNumber: '3.3',
        type: 'LOCAL',
        transfer: {
          sender: {
            pubkey: '8a8c93293cb97e8784178da8ae588144f7c982f4658bfd35101a1e2b479c3e57',
            amount: '500.5500'
          },
          recipient: 'd1a95824c8485900279b92a60175fc676f8914c61d7399c66c2d0cb6fa9ec576'
        }
      }
    )
  })

  it('gradido deferred transfer transaction body', () => {
    const body = builder
      .setDeferredTransfer(
        new GradidoTransfer(
          new TransferAmount(keyPairs[4].publicKey, '555.55'),
          keyPairs[5].publicKey
        ), new Date(1609465000000)
      )
      .setMemo('Link zum einloesen')
      .build()

    expect(body.isDeferredTransfer()).toBeTruthy()
    expect(toJson(body)).toMatchObject(
      {
        memo: 'Link zum einloesen',
        createdAt: '2021-01-01 00:00:00.0000',
        versionNumber: '3.3',
        type: 'LOCAL',
        deferredTransfer: {
          transfer: {
            sender: {
              amount: '555.5500',
              pubkey: '8a8c93293cb97e8784178da8ae588144f7c982f4658bfd35101a1e2b479c3e57',
            },
            recipient: 'd1a95824c8485900279b92a60175fc676f8914c61d7399c66c2d0cb6fa9ec576'
          },
          timeout: '2021-01-01 01:36:40.0000'
        }
      }
    )
  })

  it('community friends update transaction body', () => {
    const body = builder
      .setCommunityFriendsUpdate(true)
      .build()
    
    expect(body.isCommunityFriendsUpdate()).toBeTruthy()
    expect(toJson(body)).toMatchObject(
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
    const sign = Buffer.alloc(crypto_sign_BYTES)
    crypto_sign_detached(sign, bodyBytes.data(), keyPairs[3].privateKey.data())

    const gradidoTransaction = new GradidoTransaction(
      new SignatureMap(
        new SignaturePair(keyPairs[3].publicKey, new MemoryBlock(sign))
      ), bodyBytes
    )
    expect(JSON.parse(new InteractionToJson(gradidoTransaction).run())).toMatchObject(
      {
        signatureMap: [
          {
            pubkey: '25971aa0e7422144dcc244887e29ef160d5479b1219e9817ca6ece38b09f37c0',
            signature: 'd9d80d166694a921bc489e6bf7118aac2bd9b1312e5910c5c6f08c3617cb79c2dc68229fb268bacf258bd80b7d0a67517f45ce1adba8e88c12f42a562b0d1d05'
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
        gradidoTransaction: { signatureMap: [], bodyBytes: { json: 'mData is empty' } },
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
    const transactionBody = builder
      .setTransactionTransfer(
        new TransferAmount(
          keyPairs[4].publicKey,
          '100.251621'
        ), keyPairs[5].publicKey
      )
      .setMemo(memo)
      .build()
    const builder2 = new GradidoTransactionBuilder
    const gradidoTransaction = builder2
     .setTransactionBody(transactionBody)
     .sign(new KeyPairEd25519(keyPairs[0].publicKey, keyPairs[0].privateKey))
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
            pubkey: '643c438776fc2634faf887df8485b9ed580729c2099e00e4d4d53cd74626a0d6',
            signature: '2d9ab75e055a4853ce3cf69b8a121b052b32a50332b87ee540c6e1cfd5914ef914dca858eab8ed7c212dde5a69ee0087208ac4cbd7a884f95bb320a4d43e6002'
          }], 
          bodyBytes: { 
            json: {
              createdAt: '2021-01-01 00:00:00.0000',
              memo: 'Danke fuer dein Sein!',
              transfer: {
                recipient: 'd1a95824c8485900279b92a60175fc676f8914c61d7399c66c2d0cb6fa9ec576',
                sender: {
                  amount: '100.2516',
                  pubkey: '8a8c93293cb97e8784178da8ae588144f7c982f4658bfd35101a1e2b479c3e57',
               },
             },
             type: 'LOCAL',
             versionNumber: '3.3',
            }
          }
        },
        confirmedAt: '2021-01-01 01:22:10.0000',
        versionNumber: '3.3',
        runningHash: '7c8173198853521bf017bc47e8925d999b594b85a3c9635f4e2e46063ee7f8d1',
        messageId: '0000000000000000000000000000000000000000000000000000000000000000',
        accountBalance: '899.7484'
      }
    )
  })
})