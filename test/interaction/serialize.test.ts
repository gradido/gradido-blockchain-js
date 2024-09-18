import { 
  TransactionBody,
  InteractionSerialize,
  MemoryBlock,
  AddressType_COMMUNITY_HUMAN,
  TransferAmount,
  GradidoTransfer,
  SignatureMap,
  SignaturePair,
  GradidoTransaction,
  ConfirmedTransaction,
  GradidoTransactionBuilder,
  KeyPairEd25519,
  CrossGroupType_LOCAL
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
  registerAddressTransactionBase64,
  transferTransactionBase64
} from '../helper/serializedTransactions'
import { generateKeyPairs } from '../helper/keyPairs'
import { crypto_generichash_BYTES, crypto_sign_BYTES, crypto_sign_detached } from 'sodium-native'

let keyPairs: KeyPairEd25519[]

const builder = new GradidoTransactionBuilder()

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
    const transaction = builder
      .setCreatedAt(createdAt)
		  .setVersionNumber(versionString)
      .setCommunityRoot(
        keyPairs[0].getPublicKey(),
        keyPairs[1].getPublicKey(),
        keyPairs[2].getPublicKey()
      )
      .sign(keyPairs[0])
      .build()

    const body = transaction.getTransactionBody()
    expect(body).not.toBeNull()
    expect(body?.isCommunityRoot()).toBeTruthy()
    expect(body?.getType()).toEqual(CrossGroupType_LOCAL)

    const serialized = new InteractionSerialize(transaction).run()
    expect(serialized?.convertToBase64()).toEqual(communityRootTransactionBase64)
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
    expect(body?.isRegisterAddress()).toBeTruthy()
    const serialized = new InteractionSerialize(transaction).run()
    expect(serialized?.convertToBase64()).toEqual(registerAddressTransactionBase64)
  })

  it('gradido creation transaction body', () => {
    const transaction = builder
      .setMemo('Deine erste Schoepfung ;)')
      .setTransactionCreation(
        new TransferAmount(keyPairs[4].getPublicKey(), "1000.00"),
        new Date(1609459000000)
      )
      .sign(keyPairs[6])
      .build()

    const body = transaction.getTransactionBody()
    expect(body).not.toBeNull()
    expect(body?.isCreation()).toBeTruthy()
    const serialized = new InteractionSerialize(transaction).run()
    expect(serialized?.convertToBase64()).toEqual(creationTransactionBase64)
  })

  it('gradido transfer transaction body', () => {
    const transaction = builder
      .setMemo('Ich teile mit dir')
      .setTransactionTransfer(
        new TransferAmount(keyPairs[4].getPublicKey(), "500.55"),
        keyPairs[5].getPublicKey()
      )
      .sign(keyPairs[4])
      .build()

    const body = transaction.getTransactionBody()
    expect(body).not.toBeNull()
    expect(body?.isTransfer()).toBeTruthy()
    const serialized = new InteractionSerialize(transaction).run()
    expect(serialized?.convertToBase64()).toEqual(transferTransactionBase64)
  })

  it('gradido deferred transfer transaction body', () => {
    const transaction = builder
      .setMemo('Link zum einloesen')
      .setDeferredTransfer(
        new GradidoTransfer(
          new TransferAmount(keyPairs[4].getPublicKey(), "555.55"),
          keyPairs[5].getPublicKey()
        ), timeout
      )
      .sign(keyPairs[4])
      .build()
    
    const body = transaction.getTransactionBody()
    expect(body).not.toBeNull()
    expect(body?.isDeferredTransfer()).toBeTruthy()
    const serialized = new InteractionSerialize(transaction).run()
    expect(serialized?.convertToBase64()).toEqual(deferredTransferTransactionBase64)
  })

  it('gradido community friends update transaction body', () => {
    const transaction = builder
      .setCommunityFriendsUpdate(true)
      .sign(keyPairs[0])
      .build()
    
    const body = transaction.getTransactionBody()
    expect(body).not.toBeNull()
    expect(body?.isCommunityFriendsUpdate()).toBeTruthy()
    const serialized = new InteractionSerialize(transaction).run()
    expect(serialized?.convertToBase64()).toEqual(communityFriendsUpdateBase64)
  })

  it('gradido transaction with signature', () => {
    const bodyBytes = new MemoryBlock(invalidBodyTestPayload)
    const signatureMap = new SignatureMap
    signatureMap.push(new SignaturePair(keyPairs[3].getPublicKey(), keyPairs[3].sign(bodyBytes)))

    const transaction = new GradidoTransaction(signatureMap, bodyBytes)

    const serialized = new InteractionSerialize(transaction).run()
    expect(serialized?.convertToBase64()).toEqual(gradidoTransactionSignedInvalidBody)
  })

  it('signature map', () => {
    const message = new MemoryBlock(
      'Human nature is a complex interplay of light and shadow, where our greatest strengths often emerge from our deepest vulnerabilities. To be human is to strive for connection, seek meaning, and continuously evolve through both triumphs and trials.'
    )
    const signatureMap = new SignatureMap
    for(let i = 0; i < 2; i++) {      
      signatureMap.push(new SignaturePair(keyPairs[i].getPublicKey(), keyPairs[i].sign(message)))
    }
    const serialized = new InteractionSerialize(signatureMap).run()
    expect(serialized?.convertToBase64()).toEqual(
      'CmQKIIFnAymUaYjt9FH0xCRpHYPPWpBDkEKILVu3IkPvVR70EkAE4ND2xLvS2H3Iefxfcr5I2/aCyIh1f9XT1toK9AJv7Mfu5U7ftL87CuOGbn+VfdemtvbIBr9amXNo4HI+BIYICmQKINfjqKCQqkSHMkb1xqz8F/907hdPVue9KlX/uBBB9tsdEkD82U+ofaXHmbiWJUf/cYiyb7xKW9MrNAjPlelL7a5+2WjM4mBPneSPn7iCK3ewWQXbN/OF6As/gWqQI7Mq7RAF'
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
    const builder = new GradidoTransactionBuilder
    const gradidoTransaction = builder
      .setTransactionTransfer(
        new TransferAmount(
          keyPairs[4].getPublicKey(),
          '100.251621'
        ),  keyPairs[5].getPublicKey()
      )
      .setCreatedAt(createdAt)
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

    const serialized = new InteractionSerialize(confirmedTransaction).run()
    expect(serialized?.convertToBase64()).toEqual(completeConfirmedTransaction)
  })
})