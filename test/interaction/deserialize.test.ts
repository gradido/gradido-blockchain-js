import { crypto_generichash_BYTES, crypto_sign_verify_detached } from 'sodium-native'
import { 
  AddressType_COMMUNITY_HUMAN,
  CrossGroupType_LOCAL,
  DeserializeType_CONFIRMED_TRANSACTION,
  DeserializeType_GRADIDO_TRANSACTION,
  DeserializeType_TRANSACTION_BODY,
  InteractionDeserialize,
  KeyPairEd25519,
  MemoryBlock,
  Timestamp,
  TimestampSeconds
} from '../../'
import { confirmedAt, createdAt, targetDate, timeout, versionString } from '../helper/const'
import { generateKeyPairs, KeyPair, verify } from '../helper/keyPairs'
import { 
  communityFriendsUpdateBase64,
  communityRootTransactionBase64,
  completeConfirmedTransaction,
  creationTransactionBase64,
  deferredTransferTransactionBase64,
  gradidoTransactionSignedInvalidBody,
  invalidBodyTestPayload,
  minimalConfirmedTransaction,
  registeAddressTransactionBase64,
  transferTransactionBase64 
} from '../helper/serializedTransactions'

let keyPairs: KeyPair[]

describe('Deserialize Gradido Transaction Test', () => {
  beforeAll(() => {
    keyPairs = generateKeyPairs()
  })
  
  it('community root transaction body', () => {
    const rawData = MemoryBlock.fromBase64(communityRootTransactionBase64)
    const deserializer = new InteractionDeserialize(rawData, DeserializeType_TRANSACTION_BODY)
    deserializer.run()
    expect(deserializer.isTransactionBody()).toBeTruthy()
    expect(deserializer.isConfirmedTransaction()).toBeFalsy()
    expect(deserializer.isGradidoTransaction()).toBeFalsy()

    const body = deserializer.getTransactionBody()
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
    expect(communityRoot?.getPubkey()?.equal(keyPairs[0].publicKey)).toBeTruthy()
    expect(communityRoot?.getGmwPubkey()?.equal(keyPairs[1].publicKey)).toBeTruthy()
    expect(communityRoot?.getAufPubkey()?.equal(keyPairs[2].publicKey)).toBeTruthy()
  })

  it('register address transaction body', () => {
    const rawData = MemoryBlock.fromBase64(registeAddressTransactionBase64)
    const deserializer = new InteractionDeserialize(rawData, DeserializeType_TRANSACTION_BODY)
    deserializer.run()
    expect(deserializer.isTransactionBody()).toBeTruthy()
    expect(deserializer.isConfirmedTransaction()).toBeFalsy()
    expect(deserializer.isGradidoTransaction()).toBeFalsy()

    const body = deserializer.getTransactionBody()
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
    expect(registerAddress?.getUserPublicKey()?.equal(keyPairs[3].publicKey)).toBeTruthy()
    expect(registerAddress?.getNameHash()).toBeNull()
    expect(registerAddress?.getAccountPublicKey()?.equal(keyPairs[4].publicKey)).toBeTruthy()

  })

  it('gradido creation transaction body', () => {
    const rawData = MemoryBlock.fromBase64(creationTransactionBase64)
    const deserializer = new InteractionDeserialize(rawData, DeserializeType_TRANSACTION_BODY)
    deserializer.run()
    expect(deserializer.isTransactionBody()).toBeTruthy()
    expect(deserializer.isConfirmedTransaction()).toBeFalsy()
    expect(deserializer.isGradidoTransaction()).toBeFalsy()

    const body = deserializer.getTransactionBody()
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
    expect(recipient?.getPubkey()?.equal(keyPairs[4].publicKey)).toBeTruthy()
    expect(creation?.getTargetDate().getDate()).toEqual(targetDate)
  })
  
  it('gradido transfer transaction body', () => {
    const rawData = MemoryBlock.fromBase64(transferTransactionBase64)
    const deserializer = new InteractionDeserialize(rawData, DeserializeType_TRANSACTION_BODY)
    deserializer.run()
    expect(deserializer.isTransactionBody()).toBeTruthy()
    expect(deserializer.isConfirmedTransaction()).toBeFalsy()
    expect(deserializer.isGradidoTransaction()).toBeFalsy()

    const body = deserializer.getTransactionBody()
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
    expect(sender?.getPubkey()?.equal(keyPairs[4].publicKey)).toBeTruthy()
    expect(transfer?.getRecipient()?.equal(keyPairs[5].publicKey)).toBeTruthy()
  })

  it('gradido deferred transfer transaction body', () => {
    const rawData = MemoryBlock.fromBase64(deferredTransferTransactionBase64)
    const deserializer = new InteractionDeserialize(rawData, DeserializeType_TRANSACTION_BODY)
    deserializer.run()
    expect(deserializer.isTransactionBody()).toBeTruthy()
    expect(deserializer.isConfirmedTransaction()).toBeFalsy()
    expect(deserializer.isGradidoTransaction()).toBeFalsy()

    const body = deserializer.getTransactionBody()
    expect(body).not.toBeNull()
    expect(body?.getVersionNumber()).toEqual(versionString)
    expect(body?.getCreatedAt().getDate()).toEqual(createdAt)
    expect(body?.getType()).toEqual(CrossGroupType_LOCAL)

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
    expect(sender?.getPubkey()?.equal(keyPairs[4].publicKey)).toBeTruthy()
    expect(transfer?.getRecipient()?.equal(keyPairs[5].publicKey)).toBeTruthy()
    expect(deferredTransfer?.getTimeout().getDate()).toEqual(timeout)
  })

  it('community friends update transaction body', () => {
    const rawData = MemoryBlock.fromBase64(communityFriendsUpdateBase64)
    const deserializer = new InteractionDeserialize(rawData, DeserializeType_TRANSACTION_BODY)
    deserializer.run()
    expect(deserializer.isTransactionBody()).toBeTruthy()
    expect(deserializer.isConfirmedTransaction()).toBeFalsy()
    expect(deserializer.isGradidoTransaction()).toBeFalsy()

    const body = deserializer.getTransactionBody()
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
    const rawData = MemoryBlock.fromBase64(gradidoTransactionSignedInvalidBody)
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
    expect(crypto_sign_verify_detached(
      firstSignature!.data(),
      bodyBytes.data(),
      keyPairs[3].publicKey.data()
    )).toBeTruthy()
  })

  it('minimal confirmed transaction', () => {
    const rawData = MemoryBlock.fromBase64(minimalConfirmedTransaction)
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
    expect(confirmedTransaction?.getAccountBalance().toString()).toEqual('179.0000')
    expect(confirmedTransaction?.getRunningHash()?.size()).toEqual(crypto_generichash_BYTES)

    const gradidoTransaction = confirmedTransaction?.getGradidoTransaction()
    expect(gradidoTransaction).not.toBeNull()
    expect(gradidoTransaction?.getBodyBytes()).toBeNull()
    expect(gradidoTransaction?.getSignatureMap().getSignaturePairs().size()).toEqual(0)
  })

  it('complete confirmed transaction', () => {
    const rawData = MemoryBlock.fromBase64(completeConfirmedTransaction)
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
    expect(confirmedTransaction?.getAccountBalance().toString()).toEqual('899.7484')
    expect(confirmedTransaction?.getRunningHash()?.size()).toEqual(crypto_generichash_BYTES)
    expect(confirmedTransaction?.getRunningHash()?.convertToHex())
      .toEqual('882700c5d5acc7381a9da4861edb90adbbabc7d642869fdd572b345e5665d85a')

    const gradidoTransaction = confirmedTransaction?.getGradidoTransaction()
    expect(gradidoTransaction).not.toBeNull()
    const firstSignature = gradidoTransaction?.getSignatureMap().getSignaturePairs().get(0).getSignature() as MemoryBlock;
	  const bodyBytes = gradidoTransaction?.getBodyBytes();
    expect(bodyBytes).not.toBeNull()
    expect(verify(firstSignature, bodyBytes!, keyPairs[0])).toBeTruthy()
    expect(verify(firstSignature, bodyBytes!, keyPairs[2])).toBeFalsy()

    const body = gradidoTransaction?.getTransactionBody()
    expect(body).not.toBeNull()
    expect(body?.getMemo()).toEqual('Danke fuer dein Sein!')
    expect(body?.getCreatedAt().getDate()).toEqual(createdAt)
    expect(body?.isTransfer()).toBeTruthy()

    const transfer = body?.getTransfer()
    expect(transfer).not.toBeNull()
    const sender = transfer?.getSender()
    expect(sender).not.toBeNull()
    expect(sender?.getAmount().toString()).toEqual('100.2516')
    expect(sender?.getPubkey()?.equal(keyPairs[4].publicKey))
    expect(transfer?.getRecipient()?.equal(keyPairs[5].publicKey))
  })
})