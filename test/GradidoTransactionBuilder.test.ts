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

    expect(gradidoTransaction.getBodyBytes()?.convertToBase64()).toEqual('CgASCAiAzLn/BRAAGgMzLjMgAA==')
    const signaturePairs = gradidoTransaction.getSignatureMap().getSignaturePairs()
    expect(keyPairs[0].publicKey.convertToHex()).toEqual('643c438776fc2634faf887df8485b9ed580729c2099e00e4d4d53cd74626a0d6')
    const firstSignature = signaturePairs.get(0).getSignature()
    expect(firstSignature).not.toBeNull()
    expect(firstSignature!.convertToHex()).toEqual(
      '2d9ab75e055a4853ce3cf69b8a121b052b32a50332b87ee540c6e1cfd5914ef9e485366d779478f104a39eee79d907b3a9aae64b95878c812562b2cd4ae71504'
    )
    
  })
})