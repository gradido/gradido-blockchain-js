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
      .toThrow('TransactionValidationInvalidInputException: wrong version with memo: memo and  with version_number: string, expected: 3.3, actual: 3.2')
  })

  it('invalid other group', () => {
    const body = new TransactionBody('memo', createdAt, versionString, CrossGroupType_LOCAL, '<script>')
    expect(() => new InteractionValidate(body).run(ValidateType_SINGLE, ''))
      .toThrow('TransactionValidationInvalidInputException: invalid character, only lowercase english latin letter, numbers and - with memo: memo and  with other_group: string, expected: ^[a-z0-9-]{3,120}$, actual: <script>')
  })
})