import {
  AddressType_COMMUNITY_HUMAN,
  GradidoTransactionBuilder,
  GradidoTransfer,
  InteractionValidate,
  KeyPairEd25519,
  MemoryBlock,
  TransferAmount,
  ValidateType_SINGLE
} from '../../'
import { createdAt, timeout, versionString } from '../helper/const'
import { generateKeyPairs } from '../helper/keyPairs'
import {
  invalidBodyTestPayload,
} from '../helper/serializedTransactions'

let keyPairs: KeyPairEd25519[]

const builder = new GradidoTransactionBuilder()

describe('validate Gradido Transaction', () => {
  beforeAll(() => {
    keyPairs = generateKeyPairs()
  })
  beforeEach(() => {
    builder.reset()
    builder
      .setCreatedAt(createdAt)
      .setVersionNumber(versionString)
  })

  it('invalid body', () => {
    expect(() => builder.setTransactionBody(new MemoryBlock(invalidBodyTestPayload))).toThrow('')
  })  

  describe('community root transaction', () => {
    it('valid', () => {
      builder
		    .setCommunityRoot(
			    keyPairs[0].getPublicKey(),
          keyPairs[1].getPublicKey(),
          keyPairs[2].getPublicKey()
		    )
		    .sign(keyPairs[0])

	    const transaction = builder.build()
      expect(() => new InteractionValidate(transaction).run(ValidateType_SINGLE, '')).not.toThrow()
    })
    describe('invalid', () => {
      it('wrong signer', () => {
          builder
            .setCommunityRoot(
              keyPairs[0].getPublicKey(),
              keyPairs[1].getPublicKey(),
              keyPairs[2].getPublicKey()
          )
          .sign(keyPairs[1])
          
        const transaction = builder.build()
        expect(() => new InteractionValidate(transaction).run(ValidateType_SINGLE, ''))
          .toThrow('TransactionValidationRequiredSignMissingException: missing required sign')
      })
    })    
  })

  describe('register address transaction', () => {
    it('valid', () => {
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
      expect(() => new InteractionValidate(transaction!).run(ValidateType_SINGLE, '')).not.toThrow()
    })

    describe('invalid', () => {
      it('missing signature', () => {
        const transaction = builder
          .setRegisterAddress(
            keyPairs[3].getPublicKey(),
            AddressType_COMMUNITY_HUMAN,
            null,
            keyPairs[4].getPublicKey()
          )
          .sign(keyPairs[0])
          .build()
        
        const body = transaction.getTransactionBody()
        expect(body).not.toBeNull()
        expect(body?.isRegisterAddress()).toBeTruthy()
        expect(() => new InteractionValidate(transaction).run(ValidateType_SINGLE, ''))
          .toThrow('TransactionValidationMissingSignException: missing sign, signed: 1 from 2')
      })

      it('missing required signature', () => {
          const transaction = builder
            .setRegisterAddress(
              keyPairs[3].getPublicKey(),
              AddressType_COMMUNITY_HUMAN,
              null,
              keyPairs[4].getPublicKey()
            )
            .sign(keyPairs[0])
            .sign(keyPairs[3])
            .build()
        
          const body = transaction.getTransactionBody()
          expect(body).not.toBeNull()
          expect(body?.isRegisterAddress()).toBeTruthy()

          expect(() => new InteractionValidate(transaction).run(ValidateType_SINGLE, ''))
          .toThrow('TransactionValidationRequiredSignMissingException: missing required sign')
      })
    })
  })

  describe('Gradido Creation Transaction', () => {
    it('valid', () => {
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
      expect(() => new InteractionValidate(transaction).run(ValidateType_SINGLE, '')).not.toThrow()
    })

    describe('invalid', () => {
      it('wrong signature', () => {
        const transaction = builder
          .setMemo('Deine erste Schoepfung ;)')
          .setTransactionCreation(
            new TransferAmount(keyPairs[4].getPublicKey(), "1000.00"),
            new Date(1609459000000)
          )
          .sign(keyPairs[4])
          .build()

        const body = transaction.getTransactionBody()
        expect(body).not.toBeNull()
        expect(body?.isCreation()).toBeTruthy()
        expect(() => new InteractionValidate(transaction).run(ValidateType_SINGLE, ''))
          .toThrow('TransactionValidationForbiddenSignException: this forbidden pubkey was used for signing: db0ed6125a14f030abed1bfc831e0a218cf9fabfcee7ecd581c0c0e788f017c7')
      })
    })
  })

  describe('Gradido Transfer Transaction', () => {
    it('valid', () => {
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
      expect(() => new InteractionValidate(transaction).run(ValidateType_SINGLE, '')).not.toThrow()
    })

    describe('invalid', () => {
      it('wrong signature', () => {
        const transaction = builder
          .setMemo('Ich teile mit dir')
          .setTransactionTransfer(
            new TransferAmount(keyPairs[4].getPublicKey(), "500.55"),
            keyPairs[5].getPublicKey()
          )
          .sign(keyPairs[3])
          .build()

        const body = transaction.getTransactionBody()
        expect(body).not.toBeNull()
        expect(body?.isTransfer()).toBeTruthy()
        expect(() => new InteractionValidate(transaction).run(ValidateType_SINGLE, ''))
          .toThrow('TransactionValidationRequiredSignMissingException: missing required sign')
      })
    })
  })

  describe('Gradido Deferred Transfer Transaction', () => {
    it('valid', () => {
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
      expect(() => new InteractionValidate(transaction).run(ValidateType_SINGLE, '')).not.toThrow()
    })

    describe('invalid', () => {
      it('wrong signature', () => {
        const transaction = builder
          .setMemo('Link zum einloesen')
          .setDeferredTransfer(
            new GradidoTransfer(
              new TransferAmount(keyPairs[4].getPublicKey(), "555.55"),
              keyPairs[5].getPublicKey()
            ), timeout
          )
          .sign(keyPairs[3])
          .build()
        
        const body = transaction.getTransactionBody()
        expect(body).not.toBeNull()
        expect(body?.isDeferredTransfer()).toBeTruthy()
        expect(() => new InteractionValidate(transaction).run(ValidateType_SINGLE, ''))
          .toThrow('TransactionValidationRequiredSignMissingException: missing required sign')
      })
    })
  })
})
