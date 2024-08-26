import {
  CrossGroupType_LOCAL,
  InteractionValidate,
  TransactionBody,
  ValidateType_SINGLE
} from '../../'
import { createdAt, versionString } from '../helper/const'

describe('validate transaction body', () => {
  it('invalid, missing specific transaction', () => {
    const body = new TransactionBody('memo', createdAt, versionString)
    expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, ''))
      .toThrow('TransactionValidationException: body without specific transaction')
  })

  it('invalid version', () => {
    const body = new TransactionBody('memo', createdAt, '3.2')
    expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, ''))
      .toThrow('TransactionValidationInvalidInputException: wrong version with version_number: string')
  })

  it('invalid other group', () => {
    const body = new TransactionBody('memo', createdAt, versionString, CrossGroupType_LOCAL, '<script>')
    expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, ''))
      .toThrow('TransactionValidationInvalidInputException: invalid character, only ascii with other_group: string')
  })
})