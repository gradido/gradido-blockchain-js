import { GradidoTransactionBuilder, KeyPairEd25519, TransactionBody } from '../'
import { generateKeyPairs } from './helper/keyPairs'

let keyPairs: KeyPairEd25519[]

describe('gradido transaction builder test', () => {
  beforeAll(() => {
    keyPairs = generateKeyPairs()
  })
  it('sign transaction', () => {
    const body = new TransactionBody('', new Date(1609459200000), '3.3')
    const keyPair = keyPairs[0]
    expect(keyPair).not.toBeNull()
    const builder = new GradidoTransactionBuilder
    const gradidoTransaction = builder 
      .setTransactionBody(body)
      .sign(keyPair)
      .build()

    expect(gradidoTransaction.getBodyBytes()?.convertToBase64()).toEqual('CgASCAiAzLn/BRAAGgMzLjMgAA==')
    const signaturePairs = gradidoTransaction.getSignatureMap().getSignaturePairs()
    expect(keyPair.getPublicKey()?.convertToHex()).toEqual('81670329946988edf451f4c424691d83cf5a90439042882d5bb72243ef551ef4')
    const firstSignature = signaturePairs.get(0).getSignature()
    expect(firstSignature).not.toBeNull()
    expect(firstSignature!.convertToHex()).toEqual(
      '04e0d0f6c4bbd2d87dc879fc5f72be48dbf682c888757fd5d3d6da0af4026fecc25edf7aeba19ced1e5f481d2619d4d62bf3bc357e93a053dde942a05584e400'
    )
    
  })
})