import { AddressType_COMMUNITY_AUF, stringToAddressType, stringToValidateType, ValidateType_ACCOUNT } from "../"

describe('enum to string test', () => {
  it('string to addressType', () => {
    expect(stringToAddressType('COMMUNITY_AUF')).toEqual(AddressType_COMMUNITY_AUF) 
  })

  it('invalid string to addressType', () => {
    expect(() => stringToAddressType('invalidString')).toThrow('cannot convert to enum, enum name: AddressType, value: invalidString')
  })

  it('string validationType', () => {
    expect(stringToValidateType('ACCOUNT')).toEqual(ValidateType_ACCOUNT)
  })

  it('invalid string to addressType', () => {
    expect(() => stringToValidateType('invalidString')).toThrow('cannot convert to enum, enum name: Type, value: invalidString')
  })
})