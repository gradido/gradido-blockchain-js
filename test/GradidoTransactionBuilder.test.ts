import { GradidoTransactionBuilder, KeyPairEd25519, TransactionBody } from '../'
import { generateKeyPairs, KeyPair } from './helper/keyPairs'

let keyPairs: KeyPair[]

describe('gradido transaction builder test', () => {
  beforeAll(() => {
    keyPairs = generateKeyPairs()
  })
  it('sign transaction', () => {
    const body = new TransactionBody('', new Date(1609459200000), '3.3')
    const keyPair = new KeyPairEd25519(keyPairs[0].publicKey, keyPairs[0].privateKey)
    const builder = new GradidoTransactionBuilder
    const gradidoTransaction = builder 
      .setTransactionBody(body)
      .sign(keyPair)
      .build()

    expect(gradidoTransaction.getBodyBytes().convertToBase64()).toEqual('CgASCAiAzLn/BRAAGgMzLjMgAA==')
    const signaturePairs = gradidoTransaction.getSignatureMap().getSignaturePairs()
    expect(keyPairs[0].publicKey.convertToHex()).toEqual('643c438776fc2634faf887df8485b9ed580729c2099e00e4d4d53cd74626a0d6')
    expect(signaturePairs.get(0).getSignature().convertToHex()).toEqual(
      '1ebd44c1d9e2033c0422d40157f5976f95c5c40c78058306e66185393686d5abe8140d87eb29103816f2772ead804b4a072415c5ab78f28d2aa99246a7229604'
    )
    
  })
})