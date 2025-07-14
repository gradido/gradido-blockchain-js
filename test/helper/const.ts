import { DurationSeconds, EncryptedMemo } from "../../"

export const versionString = '3.4'
export const createdAt = new Date(1609459200000)
export const confirmedAt = new Date(1609464130000)
export const targetDate = new Date(1609459000000)
export const timeout = new Date(1609465000000)
export const timeoutDuration = new DurationSeconds(7889238) // 3 months in seconds

export const creationMemo = new EncryptedMemo('Deine erste Schoepfung ;)')
export const transferMemo = new EncryptedMemo('Ich teile mit dir')
export const deferredTransferMemo = new EncryptedMemo('Link zum einloesen')
export const aFilledMemo = new EncryptedMemo('a'.repeat(451))
export const hallMemo = new EncryptedMemo('hall')
export const autoCompleteTransactionMemoString = 'Danke fuer dein Sein!'