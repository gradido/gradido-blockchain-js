/**
 * generate key pair for tests
 */
import { KeyPairEd25519, MemoryBlock } from '../../'

function generateKeyPairs(): KeyPairEd25519[] {
  const keyPairs: KeyPairEd25519[] = []
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
		const seed = new MemoryBlock(Buffer.from(seeds[i]))
    const keyPair = KeyPairEd25519.create(seed.calculateHash())
    if(!keyPair) {
      throw Error('error creating Ed25519 KeyPair from seed: ' + seeds[i])
    }
		keyPairs.push(keyPair)
	}

  return keyPairs
}

export { generateKeyPairs }