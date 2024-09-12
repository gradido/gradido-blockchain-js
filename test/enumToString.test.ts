import { AddressType_COMMUNITY_AUF, addressTypeToString, ValidateType_ACCOUNT, validateTypeToString } from "../"

describe('enum to string test', () => {
  it('addressType to string', () => {
    expect(addressTypeToString(AddressType_COMMUNITY_AUF)).toEqual('COMMUNITY_AUF')
  })

  it('validationType to string', () => {
    expect(validateTypeToString(ValidateType_ACCOUNT)).toEqual('ACCOUNT')
  })
})