import { crypto_generichash_BYTES } from 'sodium-native'
import { 
  AddressType_COMMUNITY_HUMAN,
  CrossGroupType_LOCAL,
  DeserializeType_CONFIRMED_TRANSACTION,
  DeserializeType_GRADIDO_TRANSACTION,
  InteractionDeserialize,
  KeyPairEd25519,
  MemoryBlock,
  MemoryBlockPtr,
  HieroTransactionId,
  DeserializeType_HIERO_TRANSACTION_ID,
} from '../../'
import { 
  confirmedAt, 
  createdAt, 
  deferredTransferMemo, 
  targetDate, 
  timeoutDuration, 
  versionString 
} from '../helper/const'
import { generateKeyPairs } from '../helper/keyPairs'
import { 
  communityFriendsUpdateBase64,
  communityRootTransactionBase64,
  completeConfirmedTransaction,
  creationTransactionBase64,
  deferredTransferTransactionBase64,
  gradidoTransactionSignedInvalidBody,
  hieroTransactionIdBase64,
  invalidBodyTestPayload,
  minimalConfirmedTransaction,
  registerAddressTransactionBase64,
  transferTransactionBase64 
} from '../helper/serializedTransactions'

let keyPairs: KeyPairEd25519[]

describe('Deserialize Gradido Transaction Test', () => {
  beforeAll(() => {
    keyPairs = generateKeyPairs()
  })
  
  it('hiero transaction id', () => {
    const rawData = MemoryBlock.createPtr(MemoryBlock.fromBase64(hieroTransactionIdBase64))
    const deserializer = new InteractionDeserialize(rawData, DeserializeType_HIERO_TRANSACTION_ID)
    deserializer.run()  
    expect(deserializer.isHieroTransactionId()).toBeTruthy()
    const hieroTransactionId = deserializer.getHieroTransactionId()
    expect(hieroTransactionId.getAccountId().toString()).toEqual('0.0.256009')
    expect(hieroTransactionId.getAccountId().getAccountNum()).toEqual(256009)
    expect(hieroTransactionId.getTransactionValidStart().getSeconds()).toEqual(1755503343)
    expect(hieroTransactionId.getTransactionValidStart().getNanos()).toEqual(736000193)
  })

  it('community root transaction body', () => {
    const rawData = MemoryBlock.createPtr(MemoryBlock.fromBase64(communityRootTransactionBase64))
    const deserializer = new InteractionDeserialize(rawData, DeserializeType_GRADIDO_TRANSACTION)
    deserializer.run()
    expect(deserializer.isTransactionBody()).toBeFalsy()
    expect(deserializer.isConfirmedTransaction()).toBeFalsy()
    expect(deserializer.isGradidoTransaction()).toBeTruthy()

    const transaction = deserializer.getGradidoTransaction()
    const body = transaction?.getTransactionBody()
    expect(body).not.toBeNull()
    expect(body?.getVersionNumber()).toEqual(versionString)
    expect(body?.getCreatedAt().getDate()).toEqual(createdAt)
    expect(body?.getType()).toEqual(CrossGroupType_LOCAL)

    expect(body?.isCommunityFriendsUpdate()).toBeFalsy()
    expect(body?.isCommunityRoot).toBeTruthy()
    expect(body?.isCreation()).toBeFalsy()
    expect(body?.isDeferredTransfer()).toBeFalsy()
    expect(body?.isRegisterAddress()).toBeFalsy()
    expect(body?.isTransfer()).toBeFalsy()

    const communityRoot = body?.getCommunityRoot()
    expect(communityRoot).not.toBeNull()
    expect(communityRoot?.getPublicKey()?.equal(keyPairs[0].getPublicKey()!)).toBeTruthy()
    expect(communityRoot?.getGmwPubkey()?.equal(keyPairs[1].getPublicKey()!)).toBeTruthy()
    expect(communityRoot?.getAufPubkey()?.equal(keyPairs[2].getPublicKey()!)).toBeTruthy()
  })

  it('register address transaction body', () => {
    const rawData = MemoryBlock.createPtr(MemoryBlock.fromBase64(registerAddressTransactionBase64))
    const deserializer = new InteractionDeserialize(rawData, DeserializeType_GRADIDO_TRANSACTION)
    deserializer.run()
    expect(deserializer.isTransactionBody()).toBeFalsy()
    expect(deserializer.isConfirmedTransaction()).toBeFalsy()
    expect(deserializer.isGradidoTransaction()).toBeTruthy()

    const transaction = deserializer.getGradidoTransaction()
    const body = transaction?.getTransactionBody()
    expect(body).not.toBeNull()
    expect(body?.getVersionNumber()).toEqual(versionString)
    expect(body?.getCreatedAt().getDate()).toEqual(createdAt)
    expect(body?.getType()).toEqual(CrossGroupType_LOCAL)

    expect(body?.isCommunityFriendsUpdate()).toBeFalsy()
    expect(body?.isCommunityRoot()).toBeFalsy()
    expect(body?.isCreation()).toBeFalsy()
    expect(body?.isDeferredTransfer()).toBeFalsy()
    expect(body?.isRegisterAddress()).toBeTruthy()
    expect(body?.isTransfer()).toBeFalsy()

    const registerAddress = body?.getRegisterAddress()
    expect(registerAddress).not.toBeNull()
    expect(registerAddress?.getAddressType()).toEqual(AddressType_COMMUNITY_HUMAN)
    expect(registerAddress?.getDerivationIndex()).toEqual(1)
    expect(registerAddress?.getUserPublicKey()?.equal(keyPairs[3].getPublicKey()!)).toBeTruthy()
    expect(registerAddress?.getNameHash()?.isNull()).toBeTruthy()
    expect(registerAddress?.getAccountPublicKey()?.equal(keyPairs[4].getPublicKey()!)).toBeTruthy()

  })

  it('gradido creation transaction body', () => {
    const rawData = MemoryBlock.createPtr(MemoryBlock.fromBase64(creationTransactionBase64))
    const deserializer = new InteractionDeserialize(rawData, DeserializeType_GRADIDO_TRANSACTION)
    deserializer.run()
    expect(deserializer.isTransactionBody()).toBeFalsy()
    expect(deserializer.isConfirmedTransaction()).toBeFalsy()
    expect(deserializer.isGradidoTransaction()).toBeTruthy()

    const transaction = deserializer.getGradidoTransaction()
    const body = transaction?.getTransactionBody()
    expect(body).not.toBeNull()
    expect(body?.getVersionNumber()).toEqual(versionString)
    expect(body?.getCreatedAt().getDate()).toEqual(createdAt)
    expect(body?.getType()).toEqual(CrossGroupType_LOCAL)

    expect(body?.isCommunityFriendsUpdate()).toBeFalsy()
    expect(body?.isCommunityRoot()).toBeFalsy()
    expect(body?.isCreation()).toBeTruthy()
    expect(body?.isDeferredTransfer()).toBeFalsy()
    expect(body?.isRegisterAddress()).toBeFalsy()
    expect(body?.isTransfer()).toBeFalsy()

    const creation = body?.getCreation()
    expect(creation).not.toBeNull()
    const recipient = creation?.getRecipient()
    expect(recipient).not.toBeNull()
    expect(recipient?.getAmount().toString()).toEqual('1000.0000')
    expect(recipient?.getPublicKey()?.equal(keyPairs[4].getPublicKey()!)).toBeTruthy()
    expect(creation?.getTargetDate().getDate()).toEqual(targetDate)
  })
  
  it('gradido transfer transaction body', () => {
    const rawData = MemoryBlock.createPtr(MemoryBlock.fromBase64(transferTransactionBase64))
    const deserializer = new InteractionDeserialize(rawData, DeserializeType_GRADIDO_TRANSACTION)
    deserializer.run()
    expect(deserializer.isTransactionBody()).toBeFalsy()
    expect(deserializer.isConfirmedTransaction()).toBeFalsy()
    expect(deserializer.isGradidoTransaction()).toBeTruthy()

    const transaction = deserializer.getGradidoTransaction()
    const body = transaction?.getTransactionBody()
    expect(body).not.toBeNull()
    expect(body?.getVersionNumber()).toEqual(versionString)
    expect(body?.getCreatedAt().getDate()).toEqual(createdAt)
    expect(body?.getType()).toEqual(CrossGroupType_LOCAL)

    expect(body?.isCommunityFriendsUpdate()).toBeFalsy()
    expect(body?.isCommunityRoot()).toBeFalsy()
    expect(body?.isCreation()).toBeFalsy()
    expect(body?.isDeferredTransfer()).toBeFalsy()
    expect(body?.isRegisterAddress()).toBeFalsy()
    expect(body?.isTransfer()).toBeTruthy()

    const transfer = body?.getTransfer()
    expect(transfer).not.toBeNull()
    const sender = transfer?.getSender()
    expect(sender).not.toBeNull()
    expect(sender?.getAmount().toString()).toEqual('500.5500')
    expect(sender?.getPublicKey()?.equal(keyPairs[4].getPublicKey()!)).toBeTruthy()
    expect(transfer?.getRecipient()?.equal(keyPairs[5].getPublicKey()!)).toBeTruthy()
  })

  it('gradido deferred transfer transaction body', () => {
    const rawData = MemoryBlock.createPtr(MemoryBlock.fromBase64(deferredTransferTransactionBase64))
    const deserializer = new InteractionDeserialize(rawData, DeserializeType_GRADIDO_TRANSACTION)
    deserializer.run()
    expect(deserializer.isTransactionBody()).toBeFalsy()
    expect(deserializer.isConfirmedTransaction()).toBeFalsy()
    expect(deserializer.isGradidoTransaction()).toBeTruthy()
    expect(deserializer.isTransactionTriggerEvent()).toBeFalsy()

    const transaction = deserializer.getGradidoTransaction()
    expect(transaction).not.toBeNull()
    const body = transaction?.getTransactionBody()
    expect(body).not.toBeNull()
    expect(body?.getVersionNumber()).toEqual(versionString)
    expect(body?.getCreatedAt().getDate()).toEqual(createdAt)
    expect(body?.getType()).toEqual(CrossGroupType_LOCAL)
    const memos = body?.getMemos()
    expect(memos?.size()).toBeGreaterThanOrEqual(1)
    expect(memos?.get(0).getMemo()?.copyAsString()).toEqual(deferredTransferMemo.getMemo().copyAsString())
    expect(body?.isCommunityFriendsUpdate()).toBeFalsy()
    expect(body?.isCommunityRoot()).toBeFalsy()
    expect(body?.isCreation()).toBeFalsy()
    expect(body?.isDeferredTransfer()).toBeTruthy()
    expect(body?.isRegisterAddress()).toBeFalsy()
    expect(body?.isTransfer()).toBeFalsy()

    const deferredTransfer = body?.getDeferredTransfer()
    expect(deferredTransfer).not.toBeNull()
    const transfer = deferredTransfer?.getTransfer()
    expect(transfer).not.toBeNull()
    const sender = transfer?.getSender()
    expect(sender).not.toBeNull()
    expect(sender?.getAmount().toString()).toEqual('555.5500')
    expect(sender?.getPublicKey()?.equal(keyPairs[4].getPublicKey()!)).toBeTruthy()
    expect(transfer?.getRecipient()?.equal(keyPairs[5].getPublicKey()!)).toBeTruthy()
    expect(deferredTransfer?.getTimeoutDuration().getSeconds()).toEqual(timeoutDuration.getSeconds())
  })

  it('community friends update transaction body', () => {
    const rawData = MemoryBlock.createPtr(MemoryBlock.fromBase64(communityFriendsUpdateBase64))
    const deserializer = new InteractionDeserialize(rawData, DeserializeType_GRADIDO_TRANSACTION)
    deserializer.run()
    expect(deserializer.isTransactionBody()).toBeFalsy()
    expect(deserializer.isConfirmedTransaction()).toBeFalsy()
    expect(deserializer.isGradidoTransaction()).toBeTruthy()

    const transaction = deserializer.getGradidoTransaction()
    const body = transaction?.getTransactionBody()
    expect(body).not.toBeNull()
    expect(body?.getVersionNumber()).toEqual(versionString)
    expect(body?.getCreatedAt().getDate()).toEqual(createdAt)
    expect(body?.getType()).toEqual(CrossGroupType_LOCAL)

    expect(body?.isCommunityFriendsUpdate()).toBeTruthy()
    expect(body?.isCommunityRoot()).toBeFalsy()
    expect(body?.isCreation()).toBeFalsy()
    expect(body?.isDeferredTransfer()).toBeFalsy()
    expect(body?.isRegisterAddress()).toBeFalsy()
    expect(body?.isTransfer()).toBeFalsy()

    const communityFriendsUpdate = body?.getCommunityFriendsUpdate()
    expect(communityFriendsUpdate).not.toBeNull()
    expect(communityFriendsUpdate?.getColorFusion()).toBeTruthy()
  })

  it('gradido transaction', () => {
    const rawData = MemoryBlock.createPtr(MemoryBlock.fromBase64(gradidoTransactionSignedInvalidBody))
    const deserializer = new InteractionDeserialize(rawData, DeserializeType_GRADIDO_TRANSACTION)
    deserializer.run()
    expect(deserializer.isTransactionBody()).toBeFalsy()
    expect(deserializer.isConfirmedTransaction()).toBeFalsy()
    expect(deserializer.isGradidoTransaction()).toBeTruthy()

    const gradidoTransaction = deserializer.getGradidoTransaction()
    expect(gradidoTransaction).not.toBeNull()
    const bodyBytes = new MemoryBlock(invalidBodyTestPayload)
    expect(gradidoTransaction?.getBodyBytes()?.equal(bodyBytes)).toBeTruthy()
    const firstSignature = gradidoTransaction?.getSignatureMap().getSignaturePairs().get(0).getSignature()
    expect(firstSignature).not.toBeNull()    
    expect(keyPairs[3].verify(bodyBytes, firstSignature?.get()!)).toBeTruthy()
  })

  it('minimal confirmed transaction', () => {
    const rawData = MemoryBlock.createPtr(MemoryBlock.fromBase64(minimalConfirmedTransaction))
    const deserializer = new InteractionDeserialize(rawData, DeserializeType_CONFIRMED_TRANSACTION)
    deserializer.run()
    expect(deserializer.isTransactionBody()).toBeFalsy()
    expect(deserializer.isConfirmedTransaction()).toBeTruthy()
    expect(deserializer.isGradidoTransaction()).toBeFalsy()

    const confirmedTransaction = deserializer.getConfirmedTransaction()
    expect(confirmedTransaction).not.toBeNull()
    expect(confirmedTransaction?.getId()).toEqual(7)
    expect(confirmedTransaction?.getConfirmedAt().getDate()).toEqual(confirmedAt)
    expect(confirmedTransaction?.getVersionNumber()).toEqual(versionString)
    expect(confirmedTransaction?.getAccountBalances().size()).toEqual(0)
    expect(confirmedTransaction?.getRunningHash()?.size()).toEqual(crypto_generichash_BYTES)

    const gradidoTransaction = confirmedTransaction?.getGradidoTransaction()
    expect(gradidoTransaction).not.toBeNull()
    expect(gradidoTransaction?.getBodyBytes()?.isNull()).toBeTruthy()
    expect(gradidoTransaction?.getSignatureMap().getSignaturePairs().size()).toEqual(0)
  })

  it('complete confirmed transaction', () => {
    const rawData = MemoryBlock.createPtr(MemoryBlock.fromBase64(completeConfirmedTransaction))
    const deserializer = new InteractionDeserialize(rawData, DeserializeType_CONFIRMED_TRANSACTION)
    deserializer.run()
    expect(deserializer.isTransactionBody()).toBeFalsy()
    expect(deserializer.isConfirmedTransaction()).toBeTruthy()
    expect(deserializer.isGradidoTransaction()).toBeFalsy()

    const confirmedTransaction = deserializer.getConfirmedTransaction()
    expect(confirmedTransaction).not.toBeNull()
    expect(confirmedTransaction?.getId()).toEqual(7)
    expect(confirmedTransaction?.getConfirmedAt().getDate()).toEqual(confirmedAt)
    expect(confirmedTransaction?.getVersionNumber()).toEqual(versionString)
    expect(confirmedTransaction?.getAccountBalances().get(0).getBalance().toString()).toEqual('100.0000')
    expect(confirmedTransaction?.getAccountBalances().get(1).getBalance().toString()).toEqual('899.7483')    
    expect(confirmedTransaction?.getRunningHash()?.size()).toEqual(crypto_generichash_BYTES)
    expect(confirmedTransaction?.getRunningHash()?.convertToHex())
      .toEqual('28a58de12318789f59ee15373a1ef8337da0e2cd66f266bf756590ffb5447ecc')

    const gradidoTransaction = confirmedTransaction?.getGradidoTransaction()
    expect(gradidoTransaction).not.toBeNull()
    const firstSignature = gradidoTransaction?.getSignatureMap().getSignaturePairs().get(0).getSignature() as MemoryBlockPtr;
	  const bodyBytes = gradidoTransaction?.getBodyBytes();
    expect(bodyBytes).not.toBeNull()
    expect(keyPairs[0].verify(bodyBytes!.get(), firstSignature!.get())).toBeTruthy()
    expect(keyPairs[2].verify(bodyBytes!.get(), firstSignature!.get())).toBeFalsy()

    const body = gradidoTransaction?.getTransactionBody()
    const memos = body?.getMemos()
    expect(memos?.size()).toBeGreaterThanOrEqual(1)
    expect(memos?.get(0).getMemo()?.copyAsString()).toEqual('Danke fuer dein Sein!')
    expect(body?.getCreatedAt().getDate()).toEqual(createdAt)
    expect(body?.isTransfer()).toBeTruthy()

    const transfer = body?.getTransfer()
    expect(transfer).not.toBeNull()
    const sender = transfer?.getSender()
    expect(sender).not.toBeNull()
    expect(sender?.getAmount().toString()).toEqual('100.2516')
    expect(sender?.getPublicKey()?.equal(keyPairs[4].getPublicKey()!))
    expect(transfer?.getRecipient()?.equal(keyPairs[5].getPublicKey()!))
  })
})