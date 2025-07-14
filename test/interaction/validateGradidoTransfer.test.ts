import { crypto_sign_PUBLICKEYBYTES } from 'sodium-native'
import { 
  EncryptedMemo,
  GradidoUnit,
  InteractionValidate, 
  MemoryBlock, 
  GradidoTransactionBuilder, 
  TransferAmount, 
  ValidateType_SINGLE, 
  KeyPairEd25519 
} from '../../'
import { aFilledMemo, createdAt, hallMemo, transferMemo, versionString } from '../helper/const'
import { generateKeyPairs } from '../helper/keyPairs'

let keyPairs: KeyPairEd25519[]

const builder = new GradidoTransactionBuilder()

describe('validate Gradido Transfer Transactions', () => {
  beforeAll(() => {
    keyPairs = generateKeyPairs()
  })
  beforeEach(() => {
    builder.reset()
    builder
      .setCreatedAt(createdAt)
      .setVersionNumber(versionString)
  })
  it('valid', () => {
    const transaction = builder
      .addMemo(transferMemo)
      .setTransactionTransfer(
        new TransferAmount(keyPairs[4].getPublicKey(), new GradidoUnit('500.55')),
        keyPairs[5].getPublicKey()
      )
      .sign(keyPairs[4])
      .build()

    const body = transaction.getTransactionBody()
    expect(body).not.toBeNull()
    expect(body?.isTransfer()).toBeTruthy()
    expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE)).not.toThrow()
  })

  describe('invalid memo', () => {
    it('empty memo', () => {
      const transaction = builder
        .addMemo(new EncryptedMemo(''))
        .setTransactionTransfer(
          new TransferAmount(keyPairs[4].getPublicKey(), new GradidoUnit('500.55')),
          keyPairs[5].getPublicKey()
        )
        .sign(keyPairs[4])
        .build()
  
      const body = transaction.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE))
        .toThrow('TransactionValidationInvalidInputException: not in expected range [5;450] with memo: string')
    })

    it('memo to short', () => {
      const transaction = builder
        .addMemo(hallMemo)
        .setTransactionTransfer(
          new TransferAmount(keyPairs[4].getPublicKey(), new GradidoUnit('500.55')),
          keyPairs[5].getPublicKey()
        )
        .sign(keyPairs[4])
        .build()

      const body = transaction.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE))
        .toThrow('TransactionValidationInvalidInputException: not in expected range [5;450] with memo: hall and  with memo: string, expected: >= 5 && <= 450, actual: 4')
    })

    it('memo to big', () => {
      const transaction = builder
        .addMemo(aFilledMemo) 
        .setTransactionTransfer(
          new TransferAmount(keyPairs[4].getPublicKey(), new GradidoUnit('500.55')),
          keyPairs[5].getPublicKey()
        )
        .sign(keyPairs[4])
        .build()
  
      const body = transaction.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE))
        .toThrow('TransactionValidationInvalidInputException: not in expected range [5;450] with memo: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa and  with memo: string, expected: >= 5 && <= 450, actual: 451')
    })
  })

  describe('invalid amount', () => {
    it('zero amount', () => {
      const transaction = builder
        .addMemo(transferMemo)
        .setTransactionTransfer(
          new TransferAmount(keyPairs[4].getPublicKey(), GradidoUnit.zero()),
          keyPairs[5].getPublicKey()
        )
        .sign(keyPairs[4])
        .build()
  
      const body = transaction.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE))
        .toThrow('TransactionValidationInvalidInputException: zero or negative amount with memo: Ich teile mit dir and  with amount: string')
    })

    it('negative amount', () => {
      const transaction = builder
        .addMemo(transferMemo)
        .setTransactionTransfer(
          new TransferAmount(keyPairs[4].getPublicKey(), GradidoUnit.fromGradidoCent(-10000)),
          keyPairs[5].getPublicKey()
        )
        .sign(keyPairs[4])
        .build()
  
      const body = transaction.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE))
        .toThrow('TransactionValidationInvalidInputException: zero or negative amount with memo: Ich teile mit dir and  with amount: string')
    })
  }) 

  describe('invalid coin community id', () => {
    it('invalid coin community id', () => {
      const transaction = builder
        .addMemo(transferMemo)
        .setTransactionTransfer(
          new TransferAmount(keyPairs[4].getPublicKey(), new GradidoUnit('500.55'), '<script>'),
          keyPairs[5].getPublicKey()
        )
        .sign(keyPairs[4])
        .build()
  
      const body = transaction.getTransactionBody()
      expect(body).not.toBeNull()
      expect(body?.isTransfer()).toBeTruthy()
      expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE))
        .toThrow('TransactionValidationInvalidInputException: invalid character, only lowercase english latin letter, numbers and - with memo: Ich teile mit dir and  with community_id: string, expected: ^[a-z0-9-]{3,120}$, actual: <script>')
    })
  })

  it('sender and recipient identical', () => {
    const transaction = builder
      .addMemo(transferMemo)
      .setTransactionTransfer(
        new TransferAmount(keyPairs[4].getPublicKey(), new GradidoUnit('500.55')),
        keyPairs[4].getPublicKey()
      )
      .sign(keyPairs[4])
      .build()

    const body = transaction.getTransactionBody()
    expect(body).not.toBeNull()
    expect(body?.isTransfer()).toBeTruthy()
    expect(() => new InteractionValidate(body!).run(ValidateType_SINGLE))
      .toThrow('TransactionValidationException: sender and recipient are the same')
  })

  describe('invalid public key', () => {
   
    it('recipient public key: null', () => {
      expect(() => builder.addMemo(transferMemo).setTransactionTransfer(
        new TransferAmount(keyPairs[4].getPublicKey(), new GradidoUnit('500.55')),
        null
      )).toThrow('pubkey cannot be a nullptr')
    })

    it('recipient public key: empty', () => {
      expect(() => builder.addMemo(transferMemo).setTransactionTransfer(
        new TransferAmount(keyPairs[4].getPublicKey(), new GradidoUnit('500.55')),
        MemoryBlock.createPtr(new MemoryBlock(Buffer.alloc(crypto_sign_PUBLICKEYBYTES)))
      )).toThrow('pubkey cannot be empty')
    })

    it('recipient public key: invalid', () => {
      expect(() => builder.addMemo(transferMemo).setTransactionTransfer(
        new TransferAmount(keyPairs[4].getPublicKey(), new GradidoUnit('500.55')),
        MemoryBlock.createPtr(MemoryBlock.fromHex('9a3b4c5d6e7f8c9b0a'))
      )).toThrow('invalid key size for public key')
    })
  })
})