import {
  InMemoryBlockchain,
  InMemoryBlockchainProvider,
  MemoryBlock,
  GradidoTransactionBuilder,
  KeyPairEd25519,
  loadCryptoKeys
} from '../../'

import { confirmedAt } from '../helper/const'
import { generateKeyPairs, KeyPair } from '../helper/keyPairs'
import {
  communityRootTransactionBase64,
  creationTransactionBase64,
  deferredTransferTransactionBase64,
  registeAddressTransactionBase64,
  transferTransactionBase64
} from '../helper/serializedTransactions'

let blockchain: InMemoryBlockchain
let builder: GradidoTransactionBuilder
let keyPairs: KeyPair[]

describe('tests with empty in-memory blockchain', () => {
  beforeAll(() => {
    keyPairs = generateKeyPairs()
    const blockchainTemp = InMemoryBlockchainProvider.getInstance().findBlockchain('test-community')
    expect(blockchainTemp).not.toBeNull()
    blockchain = blockchainTemp!    
    builder = new GradidoTransactionBuilder()
    loadCryptoKeys(new MemoryBlock('salt'), MemoryBlock.fromHex('87da546fe765feadf541654ea654ef21'))
  })
  
  describe('valid', () => {
    it('add community root as first', () => {
      const bodyBytes = MemoryBlock.fromBase64(communityRootTransactionBase64)
      const transaction = builder
        .setTransactionBody(bodyBytes)
        .sign(new KeyPairEd25519(keyPairs[0].publicKey, keyPairs[0].privateKey))
        .build()
  
      expect(() => blockchain.addGradidoTransaction(transaction, null, confirmedAt))
    })
  })

  describe('invalid', () => {
    it('missing signature', () => {
      const bodyBytes = MemoryBlock.fromBase64(communityRootTransactionBase64)
      const transaction = builder
        .setTransactionBody(bodyBytes)
        .build()
      expect(() => blockchain.addGradidoTransaction(transaction, null, confirmedAt))
        .toThrow('missing sign')
    })

    it('register address as first', () => {
      const bodyBytes = MemoryBlock.fromBase64(registeAddressTransactionBase64)
      const transaction = builder
        .setTransactionBody(bodyBytes)
        .sign(new KeyPairEd25519(keyPairs[0].publicKey, keyPairs[0].privateKey))
        .sign(new KeyPairEd25519(keyPairs[4].publicKey, keyPairs[4].privateKey))
        .build()
      expect(() => blockchain.addGradidoTransaction(transaction, null, confirmedAt))
        .toThrow('cannot find community root transaction before register address')
    })

    it('gradido creation as first', () => {
      const bodyBytes = MemoryBlock.fromBase64(creationTransactionBase64)
      const transaction = builder
        .setTransactionBody(bodyBytes)
        .sign(new KeyPairEd25519(keyPairs[3].publicKey, keyPairs[3].privateKey))
        .build()
      expect(() => blockchain.addGradidoTransaction(transaction, null, confirmedAt))
        .toThrow("signer for creation doesn't have a community human account")
    })

    it('gradido transfer as first', () => {
      const bodyBytes = MemoryBlock.fromBase64(transferTransactionBase64)
      const transaction = builder
        .setTransactionBody(bodyBytes)
        .sign(new KeyPairEd25519(keyPairs[4].publicKey, keyPairs[4].privateKey))
        .build()
      expect(() => blockchain.addGradidoTransaction(transaction, null, confirmedAt))
        .toThrow('not enough gdd for transfer or deferred transfer')
    })

    it('gradido deferred transfer as first', () => {
      const bodyBytes = MemoryBlock.fromBase64(deferredTransferTransactionBase64)
      const transaction = builder
        .setTransactionBody(bodyBytes)
        .sign(new KeyPairEd25519(keyPairs[4].publicKey, keyPairs[4].privateKey))
        .build()
      expect(() => blockchain.addGradidoTransaction(transaction, null, confirmedAt))
        .toThrow('not enough gdd for transfer or deferred transfer')
    })
  })
})