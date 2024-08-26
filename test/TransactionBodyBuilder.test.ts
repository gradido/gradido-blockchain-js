import { 
  AddressType_COMMUNITY_HUMAN,
  GradidoTransfer,
  MemoryBlock,
  Timestamp,
  TimestampSeconds,
  TransactionBodyBuilder,
  TransactionType_COMMUNITY_ROOT,
  TransactionType_CREATION,
  TransactionType_DEFERRED_TRANSFER,
  TransactionType_REGISTER_ADDRESS,
  TransactionType_TRANSFER,
  TransferAmount
} from '../'
import { generateKeyPairs, KeyPair } from './helper/keyPairs'

let keyPairs: KeyPair[]
const builder = new TransactionBodyBuilder()
const now = new Date()

describe('test TransactionBodyBuilderFactory', () => {
  beforeAll(() => {
    keyPairs = generateKeyPairs()
  })
  it('community root', () => {
    const transactionBody = builder
      .setCommunityRoot(keyPairs[0].publicKey, keyPairs[1].publicKey, keyPairs[2].publicKey)
      .build()
    
    expect(transactionBody.isCommunityFriendsUpdate()).toBeFalsy()
    expect(transactionBody.isCommunityRoot()).toBeTruthy()
    expect(transactionBody.isCreation()).toBeFalsy()
    expect(transactionBody.isDeferredTransfer()).toBeFalsy()
    expect(transactionBody.isRegisterAddress()).toBeFalsy()
    expect(transactionBody.isTransfer()).toBeFalsy()
    expect(transactionBody.getTransactionType()).toEqual(TransactionType_COMMUNITY_ROOT)
    expect(transactionBody.isInvolved(keyPairs[0].publicKey)).toBeTruthy()

    const communityRoot = transactionBody.getCommunityRoot()
    expect(communityRoot.getPubkey()?.equal(keyPairs[0].publicKey)).toBeTruthy()
    expect(communityRoot.getGmwPubkey()?.equal(keyPairs[1].publicKey)).toBeTruthy()
    expect(communityRoot.getAufPubkey()?.equal(keyPairs[2].publicKey)).toBeTruthy()
    expect(transactionBody.getCreatedAt().gt(new Timestamp(now))).toBeTruthy()    
  })

  it('register address user only', () => {
    const transactionBody = builder
      .setRegisterAddress(keyPairs[3].publicKey, AddressType_COMMUNITY_HUMAN)
      .setCreatedAt(now)
      .build()
    
      expect(transactionBody.isCommunityFriendsUpdate()).toBeFalsy()
      expect(transactionBody.isCommunityRoot()).toBeFalsy()
      expect(transactionBody.isCreation()).toBeFalsy()
      expect(transactionBody.isDeferredTransfer()).toBeFalsy()
      expect(transactionBody.isRegisterAddress()).toBeTruthy()
      expect(transactionBody.isTransfer()).toBeFalsy()
      expect(transactionBody.getTransactionType()).toEqual(TransactionType_REGISTER_ADDRESS)
      expect(transactionBody.isInvolved(keyPairs[3].publicKey)).toBeTruthy()

      expect(transactionBody.getMemo()).toBe('')
      expect(transactionBody.getCreatedAt().getDate()).toEqual(now)

      const registerAddress = transactionBody.getRegisterAddress()
      expect(registerAddress.getAddressType()).toBe(AddressType_COMMUNITY_HUMAN)
      expect(registerAddress.getUserPublicKey()).toEqual(keyPairs[3].publicKey)
  })

  it('register address user and account', () => {
    const transactionBody = builder
      .setRegisterAddress(
        keyPairs[3].publicKey,
        AddressType_COMMUNITY_HUMAN,
        null,
        keyPairs[4].publicKey
      )
      .setCreatedAt(now)
      .build()
    
      expect(transactionBody.isCommunityFriendsUpdate()).toBeFalsy()
      expect(transactionBody.isCommunityRoot()).toBeFalsy()
      expect(transactionBody.isCreation()).toBeFalsy()
      expect(transactionBody.isDeferredTransfer()).toBeFalsy()
      expect(transactionBody.isRegisterAddress()).toBeTruthy()
      expect(transactionBody.isTransfer()).toBeFalsy()
      expect(transactionBody.getTransactionType()).toEqual(TransactionType_REGISTER_ADDRESS)
      expect(transactionBody.isInvolved(keyPairs[3].publicKey)).toBeTruthy()

      expect(transactionBody.getMemo()).toBe('')
      expect(transactionBody.getCreatedAt().getDate()).toEqual(now)

      const registerAddress = transactionBody.getRegisterAddress()
      expect(registerAddress.getAddressType()).toBe(AddressType_COMMUNITY_HUMAN)
      expect(registerAddress.getUserPublicKey()).toEqual(keyPairs[3].publicKey)
      expect(registerAddress.getAccountPublicKey()).toEqual(keyPairs[4].publicKey)
  })

  it('gradido creation', () => {
    const memo = 'Du bist der Schoepfer deiner Welt!'
    const transactionBody = builder
      .setTransactionCreation(
        new TransferAmount(keyPairs[4].publicKey, "1000"),
        new TimestampSeconds(1660953712).getDate()
      )
      .setCreatedAt(now)
      .setMemo(memo)
      .build()
    
    expect(transactionBody.isCommunityFriendsUpdate()).toBeFalsy()
    expect(transactionBody.isCommunityRoot()).toBeFalsy()
    expect(transactionBody.isCreation()).toBeTruthy()
    expect(transactionBody.isDeferredTransfer()).toBeFalsy()
    expect(transactionBody.isRegisterAddress()).toBeFalsy()
    expect(transactionBody.isTransfer()).toBeFalsy()
    expect(transactionBody.getTransactionType()).toEqual(TransactionType_CREATION)
    expect(transactionBody.isInvolved(keyPairs[4].publicKey)).toBeTruthy()

    expect(transactionBody.getMemo()).toEqual(memo)
    expect(transactionBody.getCreatedAt().getDate()).toEqual(now)

    const creation = transactionBody.getCreation()
    const recipient = creation.getRecipient()
    expect(recipient.getPubkey()).toEqual(keyPairs[4].publicKey)
    expect(recipient.getAmount().toString()).toEqual('1000.0000')
    expect(creation.getTargetDate()).toEqual(new TimestampSeconds(1660953712))
  })

  it('gradido transfer', () => {
    const memo = 'Danke fuer dein Sein!'
    const transactionBody = builder 
      .setTransactionTransfer(
        new TransferAmount(
          keyPairs[4].publicKey,
          "100.251621",
				  ""
        ), keyPairs[5].publicKey
      )
      .setCreatedAt(now)
      .setMemo(memo)
      .build()

    expect(transactionBody.isCommunityFriendsUpdate()).toBeFalsy()
    expect(transactionBody.isCommunityRoot()).toBeFalsy()
    expect(transactionBody.isCreation()).toBeFalsy()
    expect(transactionBody.isDeferredTransfer()).toBeFalsy()
    expect(transactionBody.isRegisterAddress()).toBeFalsy()
    expect(transactionBody.isTransfer()).toBeTruthy()
    expect(transactionBody.getTransactionType()).toEqual(TransactionType_TRANSFER)
    expect(transactionBody.isInvolved(keyPairs[4].publicKey)).toBeTruthy()
    expect(transactionBody.isInvolved(keyPairs[5].publicKey)).toBeTruthy()

    expect(transactionBody.getMemo()).toEqual(memo)
    expect(transactionBody.getCreatedAt().getDate()).toEqual(now)

    const transfer = transactionBody.getTransfer()
    const sender = transfer.getSender()
    expect(sender.getPubkey()).toEqual(keyPairs[4].publicKey)
    expect(sender.getCommunityId()).toEqual('')
    expect(sender.getAmount().toString()).toEqual('100.2516')
    expect(transfer.getRecipient()).toEqual(keyPairs[5].publicKey)
  
  })

  it('gradido deferred transfer', () => {
    const memo = 'Danke fuer dein Sein!'
    const now5DaysLater = new Date(now.getTime() + 5 * 24*60*60*1000)

    const transactionBody = builder 
      .setDeferredTransfer(
        new GradidoTransfer(
          new TransferAmount(
            keyPairs[4].publicKey,
            "100.251621",
            ""
          ), keyPairs[5].publicKey
        ), now5DaysLater
      )
      .setCreatedAt(now)
      .setMemo(memo)
      .build()

    expect(transactionBody.isCommunityFriendsUpdate()).toBeFalsy()
    expect(transactionBody.isCommunityRoot()).toBeFalsy()
    expect(transactionBody.isCreation()).toBeFalsy()
    expect(transactionBody.isDeferredTransfer()).toBeTruthy()
    expect(transactionBody.isRegisterAddress()).toBeFalsy()
    expect(transactionBody.isTransfer()).toBeFalsy()
    expect(transactionBody.getTransactionType()).toEqual(TransactionType_DEFERRED_TRANSFER)
    expect(transactionBody.isInvolved(keyPairs[4].publicKey)).toBeTruthy()
    expect(transactionBody.isInvolved(keyPairs[5].publicKey)).toBeTruthy()

    expect(transactionBody.getMemo()).toEqual(memo)
    expect(transactionBody.getCreatedAt().getDate()).toEqual(now)

    const deferredTransfer = transactionBody.getDeferredTransfer()
    const transfer = deferredTransfer.getTransfer()
    const sender = transfer.getSender()
    expect(sender.getPubkey()).toEqual(keyPairs[4].publicKey)
    expect(sender.getCommunityId()).toEqual('')
    expect(sender.getAmount().toString()).toEqual('100.2516')
    expect(transfer.getRecipient()).toEqual(keyPairs[5].publicKey)
    expect(deferredTransfer.getTimeout()).toEqual(new TimestampSeconds(now5DaysLater))
  
  })
})