import { 
  TransactionBody,
  InteractionSerialize,
  TransactionBodyBuilder,
  MemoryBlock,
  AddressType_COMMUNITY_HUMAN,
  TransferAmount,
  GradidoTransfer,
  SignatureMap,
  SignaturePair,
  GradidoTransaction,
  ConfirmedTransaction,
  GradidoTransactionBuilder,
  KeyPairEd25519
} from '../../'
import { confirmedAt, createdAt, timeout, versionString } from '../helper/const'
import { 
  communityFriendsUpdateBase64,
  communityRootTransactionBase64,
  completeConfirmedTransaction,
  creationTransactionBase64,
  deferredTransferTransactionBase64,
  emptyTransactionBodyBase64,
  emptyTransactionBodyMemoBase64,
  gradidoTransactionSignedInvalidBody,
  invalidBodyTestPayload,
  minimalConfirmedTransaction,
  registeAddressTransactionBase64,
  transferTransactionBase64
} from '../helper/serializedTransactions'
import { generateKeyPairs, KeyPair, simpleSign } from '../helper/keyPairs'
import { crypto_generichash_BYTES, crypto_sign_BYTES, crypto_sign_detached } from 'sodium-native'

let keyPairs: KeyPair[]

const builder = new TransactionBodyBuilder()

describe('Serialize Gradido Transactions Tests', () => {
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
    const serialized = new InteractionSerialize(body).run()
    expect(serialized).not.toBeNull()
    expect(serialized?.convertToBase64()).toEqual(emptyTransactionBodyBase64)
  })

  it('transaction body with memo', () => {
    const body = new TransactionBody('memo', createdAt, versionString)
    const serialized = new InteractionSerialize(body).run()
    expect(serialized?.convertToBase64()).toEqual(emptyTransactionBodyMemoBase64)
  })

  it('community root transaction body', () => {
    const body = builder
     .setCommunityRoot(
      keyPairs[0].publicKey,
      keyPairs[1].publicKey,
      keyPairs[2].publicKey
     )
     .build()

    expect(body.isCommunityRoot()).toBeTruthy()
    const serialized = new InteractionSerialize(body).run()
    expect(serialized?.convertToBase64()).toEqual(communityRootTransactionBase64)
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
    
    expect(body.isRegisterAddress()).toBeTruthy()
    const serialized = new InteractionSerialize(body).run()
    expect(serialized?.convertToBase64()).toEqual(registeAddressTransactionBase64)
  })

  it('gradido creation transaction body', () => {
    const body = builder
      .setMemo('Deine erste Schoepfung ;)')
      .setTransactionCreation(
        new TransferAmount(keyPairs[4].publicKey, "1000.00"),
        new Date(1609459000000)
      )
      .build()
    
    expect(body.isCreation()).toBeTruthy()
    const serialized = new InteractionSerialize(body).run()
    expect(serialized?.convertToBase64()).toEqual(creationTransactionBase64)
  })

  it('gradido transfer transaction body', () => {
    const body = builder
      .setMemo('Ich teile mit dir')
      .setTransactionTransfer(
        new TransferAmount(keyPairs[4].publicKey, "500.55"),
        keyPairs[5].publicKey
      )
      .build()
    
    expect(body.isTransfer()).toBeTruthy()
    const serialized = new InteractionSerialize(body).run()
    expect(serialized?.convertToBase64()).toEqual(transferTransactionBase64)
  })

  it('gradido deferred transfer transaction body', () => {
    const body = builder
      .setMemo('Link zum einloesen')
      .setDeferredTransfer(
        new GradidoTransfer(
          new TransferAmount(keyPairs[4].publicKey, "555.55"),
          keyPairs[5].publicKey
        ), timeout
      )
      .build()
    
    expect(body.isDeferredTransfer()).toBeTruthy()
    const serialized = new InteractionSerialize(body).run()
    expect(serialized?.convertToBase64()).toEqual(deferredTransferTransactionBase64)
  })

  it('gradido community friends update transaction body', () => {
    const body = builder
      .setCommunityFriendsUpdate(true)
      .build()
    
    expect(body.isCommunityFriendsUpdate()).toBeTruthy()
    const serialized = new InteractionSerialize(body).run()
    expect(serialized?.convertToBase64()).toEqual(communityFriendsUpdateBase64)
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

    const serialized = new InteractionSerialize(gradidoTransaction).run()
    expect(serialized?.convertToBase64()).toEqual(gradidoTransactionSignedInvalidBody)
  })

  it('signature map', () => {
    const message = new MemoryBlock(
      'Human nature is a complex interplay of light and shadow, where our greatest strengths often emerge from our deepest vulnerabilities. To be human is to strive for connection, seek meaning, and continuously evolve through both triumphs and trials.'
    )
    const sign = Buffer.alloc(crypto_sign_BYTES)
    const signatureMap = new SignatureMap
    for(let i = 0; i < 2; i++) {      
      crypto_sign_detached(sign, message.data(), keyPairs[i].privateKey.data())
      signatureMap.push(new SignaturePair(keyPairs[i].publicKey, new MemoryBlock(sign)))
    }
    const serialized = new InteractionSerialize(signatureMap).run()
    expect(serialized?.convertToBase64()).toEqual(
      'CmQKIGQ8Q4d2/CY0+viH34SFue1YBynCCZ4A5NTVPNdGJqDWEkD2NqoGVja1mXQoKEneXryWf7flL8JpiBMwRN3sbSTcncJXQqrZ8/5yb83u8EPPJRL7zXj660DD1z6RQDw3ekIJCmQKIFH5sejZhHY63U2QzGQi8f1KCcZ3uY5LGYwFW8KUIPWOEkDkQn2qJW38uEFO8YnX8U/1/OSrI/DYSeTqTaecDDe4SyM/yKsPqcLZ54Lzv1Nba/ckiImrDBseH8d/EJTi57IH'
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
    const serialized = new InteractionSerialize(confirmedTransaction).run()
    expect(serialized?.convertToBase64()).toEqual(minimalConfirmedTransaction)
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
    const bodyBytes = new InteractionSerialize(transactionBody).run()
    expect(bodyBytes).not.toBeNull()
    const gradidoTransaction = builder2
     .setTransactionBody(bodyBytes)
     .addSignaturePair(keyPairs[0].publicKey, simpleSign(bodyBytes!, keyPairs[0]))
     .build()

     const confirmedTransaction = new ConfirmedTransaction(
      7,
      gradidoTransaction,
      confirmedAt,
      versionString,
      new MemoryBlock(Buffer.alloc(32)),
      "899.748379"
    )

    const serialized = new InteractionSerialize(confirmedTransaction).run()
    expect(serialized?.convertToBase64()).toEqual(completeConfirmedTransaction)
  })
})