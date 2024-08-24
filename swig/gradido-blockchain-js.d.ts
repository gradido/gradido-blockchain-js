/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG JSE (https://www.swig.org).
 * Version 5.0.3
 *
 * Do not make changes to this file unless you know what you are doing - modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

declare const _SWIG_enum_tag: unique symbol;

export const AddressType_NONE: AddressType;

export const AddressType_COMMUNITY_HUMAN: AddressType;

export const AddressType_COMMUNITY_GMW: AddressType;

export const AddressType_COMMUNITY_AUF: AddressType;

export const AddressType_COMMUNITY_PROJECT: AddressType;

export const AddressType_SUBACCOUNT: AddressType;

export const AddressType_CRYPTO_ACCOUNT: AddressType;

export type AddressType = number & { readonly [_SWIG_enum_tag]: 'AddressType'; };

export const CrossGroupType_LOCAL: CrossGroupType;

export const CrossGroupType_INBOUND: CrossGroupType;

export const CrossGroupType_OUTBOUND: CrossGroupType;

export const CrossGroupType_CROSS: CrossGroupType;

export type CrossGroupType = number & { readonly [_SWIG_enum_tag]: 'CrossGroupType'; };

export const TransactionType_NONE: TransactionType;

export const TransactionType_CREATION: TransactionType;

export const TransactionType_TRANSFER: TransactionType;

export const TransactionType_COMMUNITY_FRIENDS_UPDATE: TransactionType;

export const TransactionType_REGISTER_ADDRESS: TransactionType;

export const TransactionType_DEFERRED_TRANSFER: TransactionType;

export const TransactionType_COMMUNITY_ROOT: TransactionType;

export type TransactionType = number & { readonly [_SWIG_enum_tag]: 'TransactionType'; };

export  class MemoryBlocks {

  constructor();

  constructor(n: number);

  constructor(other: any);

  size(): number;

  capacity(): number;

  reserve(n: number): void;

  isEmpty(): boolean;

  clear(): void;

  add(x: any): void;

  get(i: number): any;

  set(i: number, val: any): void;
}

export  class MemoryBlock {

  constructor(size: Buffer);

  constructor(data: string);

  constructor(other: MemoryBlock);

  size(): number;

  data(): Buffer;

  convertToHex(): string;

  convertToBase64(variant: number): string;

  convertToBase64(): string;

  copyAsString(): string;

  calculateHash(): MemoryBlock;

 static fromHex(hex: string): MemoryBlock;

 static fromBase64(base64: string, variant: number): MemoryBlock;

 static fromBase64(base64: string): MemoryBlock;

  isEmpty(): boolean;

  equal(b: MemoryBlock): boolean;

  notEqual(b: MemoryBlock): boolean;

  lt(b: MemoryBlock): boolean;

 static empty(): MemoryBlock;
}

export const MnemonicType_GRADIDO_BOOK_GERMAN_RANDOM_ORDER: MnemonicType;

export const MnemonicType_GRADIDO_BOOK_GERMAN_RANDOM_ORDER_FIXED_CASES: MnemonicType;

export const MnemonicType_BIP0039_SORTED_ORDER: MnemonicType;

export const MnemonicType_MAX: MnemonicType;

export type MnemonicType = number & { readonly [_SWIG_enum_tag]: 'MnemonicType'; };

export function loadCryptoKeys(cryptoAppSecret: MemoryBlock, serverCryptoKey: MemoryBlock): void;

export  class Passphrase {

  constructor(passphrase: string, wordListType: MnemonicType);

 static generate(wordListType: MnemonicType): Passphrase;

 static detectMnemonicWithKeyPair(passphrase: string, userKeyPair: KeyPairEd25519): MnemonicType;

 static detectMnemonic(passphrase: string): MnemonicType;

  transform(wordListType: MnemonicType): Passphrase;

  createClearPassphrase(): string;

 static filter(passphrase: string): string;

  checkIfValid(): boolean;

  getString(): string;
}

export  class SecretKeyCryptography {

  constructor();

  constructor(opslimit: number, memlimit: number, algo: number);

  equal(b: SecretKeyCryptography): boolean;

  hasKey(): boolean;

  createKey(salt_parameter: string, passwd: string): void;

  encrypt(message: MemoryBlock): MemoryBlock;

  decrypt(encryptedMessage: MemoryBlock): MemoryBlock;
}

export const Ed25519DerivationType_SOFT: Ed25519DerivationType;

export const Ed25519DerivationType_HARD: Ed25519DerivationType;

export type Ed25519DerivationType = number & { readonly [_SWIG_enum_tag]: 'Ed25519DerivationType'; };

export const ED25519_CHAIN_CODE_SIZE: number;

export  class KeyPairEd25519 {

  constructor(publicKey: MemoryBlock, privateKey: MemoryBlock, chainCode: MemoryBlock);

  constructor(publicKey: MemoryBlock, privateKey: MemoryBlock);

  constructor(publicKey: MemoryBlock);

 static create(passphrase: Passphrase): KeyPairEd25519;

 static calculatePublicKey(privateKey: MemoryBlock): MemoryBlock;

  deriveChild(index: number): KeyPairEd25519Ex;

 static getDerivationType(index: number): Ed25519DerivationType;

  sign(message: MemoryBlock): MemoryBlock;

  sign(bodyBytes: string): MemoryBlock;

  sign(message: Uint8Array): MemoryBlock;

  verify(message: string, signature: string): boolean;

  verify(message: MemoryBlock, signature: MemoryBlock): boolean;

  is3rdHighestBitClear(): boolean;

  getPublicKey(): MemoryBlock;

  getChainCode(): MemoryBlock;

  isTheSame(b: KeyPairEd25519): boolean;

  isTheSame(privkey: MemoryBlock): number;

  equal(b: KeyPairEd25519): boolean;

  notEqual(b: KeyPairEd25519): boolean;

  hasPrivateKey(): boolean;

  getCryptedPrivKey(password: SecretKeyCryptography): MemoryBlock;
}

export  class KeyPairEd25519Ex extends KeyPairEd25519 {

  constructor(publicKey: MemoryBlock, privateKey: MemoryBlock, chainCode: MemoryBlock, derivationIndex: number);

  sign(message: Uint8Array): MemoryBlock;

  isChildOf(parent: KeyPairEd25519 | KeyPairEd25519Ex): boolean;
}

export  class AuthenticatedEncryption {

  constructor();

  constructor(ed25519KeyPair: KeyPairEd25519 | KeyPairEd25519Ex);

  constructor(privateKeyx25519: MemoryBlock);

  constructor(pubkeyx25519: any);

  encrypt(message: Uint8Array, recipiantKey: AuthenticatedEncryption): MemoryBlock;

  encrypt(message: MemoryBlock, recipiantKey: AuthenticatedEncryption): MemoryBlock;

  encrypt(message: string, recipiantKey: AuthenticatedEncryption): MemoryBlock;

  encrypt(message: MemoryBlock, precalculatedSharedSecretIndex: number): MemoryBlock;

  decrypt(encryptedMessage: MemoryBlock, senderKey: AuthenticatedEncryption): MemoryBlock;

  decrypt(encryptedMessage: MemoryBlock, precalculatedSharedSecretIndex: number): MemoryBlock;

  precalculateSharedSecret(recipiantKey: AuthenticatedEncryption): number;

  removePrecalculatedSharedSecret(index: number): boolean;

  mPubkey: MemoryBlock;

  getPublicKey(): MemoryBlock;

  getPrivateKey(): MemoryBlock;

  hasPrivateKey(): boolean;
}

export function SealedBoxEncrypt(keys: AuthenticatedEncryption, message: string): MemoryBlock;

export function SealedBoxDecrypt(keys: AuthenticatedEncryption, encryptedMessage: MemoryBlock): string;

export function SealedBoxDecrypt(privateKey: MemoryBlock, encryptedMessage: MemoryBlock): string;

export  class GradidoUnit {

  constructor();

  constructor(gdd: number);

  constructor(stringAmount: string);

  toString(): string;

  getGradidoCent(): number;

  value(): number;

  add(other: GradidoUnit): GradidoUnit;

  sub(other: GradidoUnit): GradidoUnit;

  mul(other: GradidoUnit): GradidoUnit;

  gt(other: GradidoUnit): boolean;

  gte(other: GradidoUnit): boolean;

  lt(other: GradidoUnit): boolean;

  lte(other: GradidoUnit): boolean;

  equal(other: GradidoUnit): boolean;

  notEqual(other: GradidoUnit): boolean;

 static calculateDecayDirect(gradidoCent: number, seconds: number): number;

  calculateDecay(duration: number): GradidoUnit;

  calculateDecay(startTime: Date, endTime: Date): GradidoUnit;

 static calculateDecayDurationSeconds(startTime: Date, endTime: Date): number;

 static zero(): GradidoUnit;
}

export  class SignaturePairs {

  constructor();

  constructor(n: number);

  constructor(other: any);

  size(): number;

  capacity(): number;

  reserve(n: number): void;

  isEmpty(): boolean;

  clear(): void;

  add(x: any): void;

  get(i: number): any;

  set(i: number, val: any): void;
}

export  class TransferAmount {

  constructor(pubkeyPtr: MemoryBlock, amountString: string, communityId: string);

  constructor(pubkeyPtr: MemoryBlock, amountString: string);

  equal(other: TransferAmount): boolean;

  getPubkey(): MemoryBlock;

  getAmount(): GradidoUnit;

  getCommunityId(): string;
}

export  class TimestampSeconds {

  constructor();

  constructor(date: Date);

  constructor(seconds: number);

  getDate(): Date;

  getSeconds(): number;

  equal(other: TimestampSeconds): boolean;

  notEqual(other: TimestampSeconds): boolean;

  lt(other: TimestampSeconds): boolean;

  lte(other: TimestampSeconds): boolean;

  gt(other: TimestampSeconds): boolean;

  gte(other: TimestampSeconds): boolean;
}

export  class Timestamp {

  constructor();

  constructor(date: Date);

  constructor(_seconds: number, _nanos: number);

  getDate(): Date;

  getSeconds(): number;

  getNanos(): number;

  equal(other: Timestamp): boolean;

  lt(other: Timestamp): boolean;

  gt(other: Timestamp): boolean;

  lt(other: TimestampSeconds): boolean;

  gt(other: TimestampSeconds): boolean;
}

export  class SignaturePair {

  constructor();

  constructor(pubkeyPtr: MemoryBlock, signaturePtr: MemoryBlock);

  equal(other: SignaturePair): boolean;

  getPubkey(): MemoryBlock;

  getSignature(): MemoryBlock;
}

export  class SignatureMap {

  constructor(sizeHint: number);

  constructor();

  constructor(firstSignaturePair: SignaturePair, sizeHint: number);

  constructor(firstSignaturePair: SignaturePair);

  push(signaturePair: SignaturePair): void;

  getSignaturePairs(): any;
}

export  class CommunityFriendsUpdate {

  constructor(colorFusion: boolean);

  equal(other: CommunityFriendsUpdate): boolean;

  getColorFusion(): boolean;
}

export  class CommunityRoot {

  constructor(pubkeyPtr: MemoryBlock, gmwPubkeyPtr: MemoryBlock, aufPubkeyPtr: MemoryBlock);

  getInvolvedAddresses(): MemoryBlocks;

  isInvolved(publicKey: MemoryBlock): boolean;

  getPubkey(): MemoryBlock;

  getGmwPubkey(): MemoryBlock;

  getAufPubkey(): MemoryBlock;
}

export  class GradidoCreation {

  constructor(recipient: TransferAmount, targetDate: Date);

  getInvolvedAddresses(): MemoryBlocks;

  isInvolved(publicKey: MemoryBlock): boolean;

  getRecipient(): TransferAmount;

  getTargetDate(): TimestampSeconds;
}

export  class GradidoTransfer {

  constructor(_sender: TransferAmount, recipientPtr: MemoryBlock);

  equal(other: GradidoTransfer): boolean;

  getInvolvedAddresses(): MemoryBlocks;

  isInvolved(publicKey: MemoryBlock): boolean;

  getSender(): TransferAmount;

  getRecipient(): MemoryBlock;
}

export  class GradidoDeferredTransfer {

  constructor(transfer: GradidoTransfer, timeout: Date);

  getInvolvedAddresses(): MemoryBlocks;

  isInvolved(publicKey: MemoryBlock): boolean;

  getSenderPublicKey(): MemoryBlock;

  getRecipientPublicKey(): MemoryBlock;

  getTransfer(): GradidoTransfer;

  getTimeout(): TimestampSeconds;
}

export  class RegisterAddress {

  constructor(_addressType: AddressType, _derivationIndex: number, userPubkeyPtr: MemoryBlock, nameHashPtr: MemoryBlock, accountPubkeyPtr: MemoryBlock);

  constructor(_addressType: AddressType, _derivationIndex: number, userPubkeyPtr: MemoryBlock, nameHashPtr: MemoryBlock);

  constructor(_addressType: AddressType, _derivationIndex: number, userPubkeyPtr: MemoryBlock);

  constructor(_addressType: AddressType, _derivationIndex: number);

  constructor(_addressType: AddressType);

  equal(other: RegisterAddress): boolean;

  getInvolvedAddresses(): MemoryBlocks;

  isInvolved(publicKey: MemoryBlock): boolean;

  getUserPublicKey(): MemoryBlock;

  getAddressType(): AddressType;

  getNameHash(): MemoryBlock;

  getAccountPublicKey(): MemoryBlock;

  getDerivationIndex(): number;
}

export  class TransactionBody {

  constructor();

  constructor(_memo: string, _createdAt: Date, _versionNumber: string, _type: CrossGroupType, _otherGroup: string);

  constructor(_memo: string, _createdAt: Date, _versionNumber: string, _type: CrossGroupType);

  constructor(_memo: string, _createdAt: Date, _versionNumber: string);

  isTransfer(): boolean;

  isCreation(): boolean;

  isCommunityFriendsUpdate(): boolean;

  isRegisterAddress(): boolean;

  isDeferredTransfer(): boolean;

  isCommunityRoot(): boolean;

  getTransactionType(): TransactionType;

  isPairing(other: TransactionBody): boolean;

  isInvolved(publicKey: MemoryBlock): boolean;

  getTransferAmount(): TransferAmount;

  getInvolvedAddresses(): MemoryBlocks;

  getMemo(): string;

  getCreatedAt(): Timestamp;

  getVersionNumber(): string;

  getType(): CrossGroupType;

  getOtherGroup(): string;

  getTransfer(): GradidoTransfer;

  getCreation(): GradidoCreation;

  getCommunityFriendsUpdate(): CommunityFriendsUpdate;

  getRegisterAddress(): RegisterAddress;

  getDeferredTransfer(): GradidoDeferredTransfer;

  getCommunityRoot(): CommunityRoot;
}

export  class GradidoTransaction {

  constructor();

  constructor(signatureMap: SignatureMap, bodyBytes: MemoryBlock, paringMessageId: MemoryBlock);

  constructor(signatureMap: SignatureMap, bodyBytes: MemoryBlock);

  constructor(other: GradidoTransaction);

  getTransactionBody(): TransactionBody;

  isPairing(other: GradidoTransaction): boolean;

  isInvolved(publicKey: MemoryBlock): boolean;

  getInvolvedAddresses(): MemoryBlocks;

  getSerializedTransaction(): MemoryBlock;

  getFingerprint(): MemoryBlock;

  getSignatureMap(): SignatureMap;

  getSignatureMap(): SignatureMap;

  getBodyBytes(): MemoryBlock;

  getParingMessageId(): MemoryBlock;
}

export  class ConfirmedTransaction {

  constructor(id: number, gradidoTransaction: GradidoTransaction, confirmedAt: Date, versionNumber: string, messageId: MemoryBlock, accountBalanceString: string, previousConfirmedTransaction: ConfirmedTransaction);

  constructor(id: number, gradidoTransaction: GradidoTransaction, confirmedAt: Date, versionNumber: string, messageId: MemoryBlock, accountBalanceString: string);

  constructor(id: number, gradidoTransaction: GradidoTransaction, confirmedAt: Date, versionNumber: string, runningHash: MemoryBlock, messageId: MemoryBlock, accountBalanceString: string);

  calculateRunningHash(previousConfirmedTransaction: ConfirmedTransaction): MemoryBlock;

  calculateRunningHash(): MemoryBlock;

  getId(): number;

  getGradidoTransaction(): GradidoTransaction;

  getConfirmedAt(): TimestampSeconds;

  getVersionNumber(): string;

  getRunningHash(): MemoryBlock;

  getMessageId(): MemoryBlock;

  getAccountBalance(): GradidoUnit;
}

export  class TransactionBodyBuilder {

  constructor();

  reset(): void;

  build(): TransactionBody;

  setDeferredTransfer(transactionTransfer: GradidoTransfer, timeout: Date): TransactionBodyBuilder;

  setDeferredTransfer(deferredTransfer: GradidoDeferredTransfer): TransactionBodyBuilder;

  setCommunityFriendsUpdate(colorFusion: boolean): TransactionBodyBuilder;

  setCommunityFriendsUpdate(communityFriendsUpdate: CommunityFriendsUpdate): TransactionBodyBuilder;

  setRegisterAddress(userPubkey: MemoryBlock, type: AddressType, nameHash: MemoryBlock, accountPubkey: MemoryBlock): TransactionBodyBuilder;

  setRegisterAddress(userPubkey: MemoryBlock, type: AddressType, nameHash: MemoryBlock): TransactionBodyBuilder;

  setRegisterAddress(userPubkey: MemoryBlock, type: AddressType): TransactionBodyBuilder;

  setRegisterAddress(registerAddress: RegisterAddress): TransactionBodyBuilder;

  setTransactionCreation(recipient: TransferAmount, targetDate: Date): TransactionBodyBuilder;

  setTransactionCreation(creation: GradidoCreation): TransactionBodyBuilder;

  setTransactionTransfer(sender: TransferAmount, recipientPubkey: MemoryBlock): TransactionBodyBuilder;

  setTransactionTransfer(transfer: GradidoTransfer): TransactionBodyBuilder;

  setCommunityRoot(pubkey: MemoryBlock, gmwPubkey: MemoryBlock, aufPubkey: MemoryBlock): TransactionBodyBuilder;

  setCommunityRoot(communityRoot: CommunityRoot): TransactionBodyBuilder;

  setCreatedAt(createdAt: Date): TransactionBodyBuilder;

  setCrossGroupType(type: CrossGroupType): TransactionBodyBuilder;

  setMemo(memo: string): TransactionBodyBuilder;

  setVersionNumber(versionNumber: string): TransactionBodyBuilder;

  setOtherGroup(otherGroup: string): TransactionBodyBuilder;
}

export  class GradidoTransactionBuilder {

  constructor();

  reset(): void;

  build(): GradidoTransaction;

  setTransactionBody(body: TransactionBody): GradidoTransactionBuilder;

  setTransactionBody(bodyBytes: MemoryBlock): GradidoTransactionBuilder;

  addSignaturePair(publicKey: MemoryBlock, signature: MemoryBlock): GradidoTransactionBuilder;

  sign(keyPair: KeyPairEd25519): GradidoTransactionBuilder;

  setParentMessageId(paringMessageId: MemoryBlock): GradidoTransactionBuilder;
}


