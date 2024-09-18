import {
  InMemoryBlockchain,
  InMemoryBlockchainProvider,
  MemoryBlock,
  loadCryptoKeys,
  InteractionDeserialize,
  DeserializeType_GRADIDO_TRANSACTION
} from '../../'

import { confirmedAt } from '../helper/const'
import {
  communityRootTransactionBase64,
  creationTransactionBase64,
  deferredTransferTransactionBase64,
  registerAddressTransactionBase64,
  transferTransactionBase64
} from '../helper/serializedTransactions'

let blockchain: InMemoryBlockchain

describe('tests with empty in-memory blockchain', () => {
  beforeAll(() => {
    const blockchainTemp = InMemoryBlockchainProvider.getInstance().findBlockchain('test-community')
    expect(blockchainTemp).not.toBeNull()
    blockchain = blockchainTemp!    
    loadCryptoKeys(new MemoryBlock('salt'), MemoryBlock.fromHex('87da546fe765feadf541654ea654ef21'))
  })
  
  describe('valid', () => {
    it('add community root as first', () => {
      const communityRootRaw = MemoryBlock.fromBase64(communityRootTransactionBase64)
      const deserializer = new InteractionDeserialize(communityRootRaw, DeserializeType_GRADIDO_TRANSACTION)
      deserializer.run()
      expect(deserializer.isGradidoTransaction()).toBeTruthy()
      expect(() => blockchain.addGradidoTransaction(deserializer.getGradidoTransaction(), null, confirmedAt))
    })
  })

  describe('invalid', () => {
    it('register address as first', () => {
      const registerAddressRaw = MemoryBlock.fromBase64(registerAddressTransactionBase64)
      const deserializer = new InteractionDeserialize(registerAddressRaw, DeserializeType_GRADIDO_TRANSACTION)
      deserializer.run()
      expect(deserializer.isGradidoTransaction()).toBeTruthy()
      expect(() => blockchain.addGradidoTransaction(deserializer.getGradidoTransaction(), null, confirmedAt))
        .toThrow('cannot find community root transaction before register address')
    })

    it('gradido creation as first', () => {
      const creationRaw = MemoryBlock.fromBase64(creationTransactionBase64)
      const deserializer = new InteractionDeserialize(creationRaw, DeserializeType_GRADIDO_TRANSACTION)
      deserializer.run()
      expect(deserializer.isGradidoTransaction()).toBeTruthy()
      expect(() => blockchain.addGradidoTransaction(deserializer.getGradidoTransaction(), null, confirmedAt))
        .toThrow("signer for creation doesn't have a community human account")
    })

    it('gradido transfer as first', () => {
      const transferRaw = MemoryBlock.fromBase64(transferTransactionBase64)
      const deserializer = new InteractionDeserialize(transferRaw, DeserializeType_GRADIDO_TRANSACTION)
      deserializer.run()
      expect(deserializer.isGradidoTransaction()).toBeTruthy()
      expect(() => blockchain.addGradidoTransaction(deserializer.getGradidoTransaction(), null, confirmedAt))
        .toThrow('not enough gdd for transfer or deferred transfer')
    })

    it('gradido deferred transfer as first', () => {
      const deferredTransferRaw = MemoryBlock.fromBase64(deferredTransferTransactionBase64)
      const deserializer = new InteractionDeserialize(deferredTransferRaw, DeserializeType_GRADIDO_TRANSACTION)
      deserializer.run()
      expect(deserializer.isGradidoTransaction()).toBeTruthy()
      expect(() => blockchain.addGradidoTransaction(deserializer.getGradidoTransaction(), null, confirmedAt))
        .toThrow('not enough gdd for transfer or deferred transfer')
    })
  })
})