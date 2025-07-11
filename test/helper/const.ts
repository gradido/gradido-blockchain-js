import { EncryptedMemo, MemoKeyType_PLAIN, MemoryBlock } from "../../"

export const versionString = '3.4'
export const createdAt = new Date(1609459200000)
export const confirmedAt = new Date(1609464130000)
export const targetDate = new Date(1609459000000)
export const timeout = new Date(1609465000000)
export const timeoutDuration = 7889238 // 3 months in seconds

export const creationMemoString = new MemoryBlock('Deine erste Schoepfung ;)')
export const creationMemo = new EncryptedMemo(MemoKeyType_PLAIN, creationMemoString)
export const transferMemo = new EncryptedMemo(MemoKeyType_PLAIN, new MemoryBlock('Ich teile mit dir'))
export const deferredTransferMemo = new EncryptedMemo(MemoKeyType_PLAIN, new MemoryBlock('Link zum einloesen'))
export const aFilledMemo = new EncryptedMemo(MemoKeyType_PLAIN, new MemoryBlock('a'.repeat(451)))
export const hallMemo = new EncryptedMemo(MemoKeyType_PLAIN, new MemoryBlock('hall'))