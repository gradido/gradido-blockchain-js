import { MemoryBlock, SecretKeyCryptography, loadCryptoKeys } from "../../"

describe('authenticated encryption', () => {
  loadCryptoKeys(
    MemoryBlock.fromHex('21ffbbc616fe'), 
    MemoryBlock.fromHex('a51ef8ac7ef1abf162fb7a65261acd7a')
  )
  const user = 'max.musterman@gmail.com'
  const pwd = 'r3an7d_spassw'
  const message = 'Dies ist eine Test Message zur Encryption'
  const encryptedMessageHex = 
    '46844ac9906132f8c40d8165e6d426a84b7e507175b327ba8bea9789470e1b61501c3b29fe62071ed76a97f433b70e69ffccded2f089c6ccc2'
  it('hasKey', () => {  
    const auth = new SecretKeyCryptography()
    expect(auth.hasKey()).toBeFalsy()
    auth.createKey(user, pwd)

    expect(auth.hasKey()).toBeTruthy()
  })

  it('encryptionTest', () => {
    const auth = new SecretKeyCryptography()
    auth.createKey(user, pwd)
    expect(auth.encrypt(new MemoryBlock(message)).convertToHex()).toEqual(encryptedMessageHex)
  })

  it('decryptionTest', () => {
    const auth = new SecretKeyCryptography()
    auth.createKey(user, pwd)
    expect(auth.decrypt(MemoryBlock.fromHex(encryptedMessageHex)).copyAsString()).toEqual(message)
  })
})