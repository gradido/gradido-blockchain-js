/**
 * generate key pair for tests
 */
import { 
  crypto_hash_sha512,
  crypto_sign_seed_keypair,
  crypto_sign_SEEDBYTES, 
  crypto_hash_sha512_BYTES,
  crypto_sign_PUBLICKEYBYTES, 
  crypto_sign_SECRETKEYBYTES, 
  crypto_sign_BYTES, 
  crypto_sign_detached, 
  crypto_sign_verify_detached
} from 'sodium-native'
import { GradidoTransaction, MemoryBlock, SignaturePair } from '../../'

class KeyPair {
  constructor(publicKey: Buffer, privateKey: Buffer) {
    this.publicKey = new MemoryBlock(publicKey)
    this.privateKey = new MemoryBlock(privateKey)
  }
  publicKey: MemoryBlock
  privateKey: MemoryBlock
}
function generateKeyPairs(): KeyPair[] {
  const keyPairs: KeyPair[] = []
  var hash = Buffer.alloc(crypto_hash_sha512_BYTES)
  const seeds = [
    "A medium of exchange for the people",
    "Love and health",
    "Three cheers",
    "We make the Earth a paradise for all beings",
    "Gratitude balance",
    "Follows its call",
    "The present is theirs; the future, for which I have really worked, is mine. - Nikola Tesla",
    "Imagination is more important than knowledge. - Albert Einstein",
    "I have not failed. I've just found 10,000 ways that won't work. - Thomas Edison",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "The true sign of intelligence is not knowledge but imagination. - Albert Einstein",
    "If you want to find the secrets of the universe, think in terms of energy, frequency, and vibration. - Nikola Tesla",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
    "To invent, you need a good imagination and a pile of junk. - Thomas Edison",
    "In the middle of every difficulty lies opportunity. - Albert Einstein",
    "Our virtues and our failings are inseparable, like force and matter. When they separate, man is no more. - Nikola Tesla",
    "The important thing is not to stop questioning. Curiosity has its own reason for existence. - Albert Einstein",
    "The scientists of today think deeply instead of clearly. One must be sane to think clearly, but one can think deeply and be quite insane. - Nikola Tesla",
    "Life is like riding a bicycle. To keep your balance, you must keep moving. - Albert Einstein",
    "Genius is one percent inspiration, ninety-nine percent perspiration. - Thomas Edison"
  ]

  for (let i = 0; i < seeds.length; i++)
  {
		const seed = Buffer.from(seeds[i])    
		crypto_hash_sha512(hash, seed);
    const publicKeyBuffer = Buffer.alloc(crypto_sign_PUBLICKEYBYTES)
    const privateKeyBuffer = Buffer.alloc(crypto_sign_SECRETKEYBYTES)
		crypto_sign_seed_keypair(publicKeyBuffer, privateKeyBuffer, hash.subarray(0, crypto_sign_SEEDBYTES));
		keyPairs.push(new KeyPair(publicKeyBuffer, privateKeyBuffer))
	}

  return keyPairs
}

function simpleSign(bodyBytes: MemoryBlock, keyPair: KeyPair): MemoryBlock
{
  const signBuffer = Buffer.alloc(crypto_sign_BYTES)
  crypto_sign_detached(
    signBuffer, 
    Buffer.from(bodyBytes.data()), 
    Buffer.from(keyPair.privateKey.data())
  )
  return new MemoryBlock(signBuffer)
}

function verify(signature: MemoryBlock, bodyBytes: MemoryBlock, keyPair: KeyPair): boolean
{
  return crypto_sign_verify_detached(
    Buffer.from(signature.data()), 
    Buffer.from(bodyBytes.data()), 
    Buffer.from(keyPair.publicKey.data())
  )
}

function sign(transaction: GradidoTransaction, keyPair: KeyPair)
{
    const signBuffer = Buffer.alloc(crypto_sign_BYTES)
    const bodyBytes = transaction.getBodyBytes()
    if(!bodyBytes) {
      throw Error('transaction has empty body bytes, cannot sign without payload')
    }
    crypto_sign_detached(
      signBuffer, 
      Buffer.from(bodyBytes.data()), 
      Buffer.from(keyPair.privateKey.data())
    )
    transaction.getSignatureMap().push(new SignaturePair(keyPair.publicKey, new MemoryBlock(signBuffer)));
}

export { generateKeyPairs, sign, simpleSign, verify, KeyPair }