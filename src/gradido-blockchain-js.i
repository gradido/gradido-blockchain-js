#define GRADIDOBLOCKCHAIN_EXPORT

/* gradido-blockchain.i */
%module gradido

%{
#include "gradido_blockchain/const.h"
%}

// operator remapping with names because no operator overloading in javascript 
%rename(call) operator();
// %rename(clone) operator=;
%rename(equal) operator==;
%rename(notEqual) operator!=;
%rename(gt) operator>;
%rename(lt) operator<;
%rename(gte) operator>=;
%rename(lte) operator<=;
%rename(add) operator+=;
%rename(sub) operator-=;
%rename(mul) operator*=;
%rename(div) operator/=;
%ignore operator+;
%ignore operator-;
%ignore operator*;
%ignore operator/;

// std libs 
%include <std_string.i>
%include <std_except.i>
%include <std_unique_ptr.i>
%include <std_shared_ptr.i>
%include <stdint.i>
%include <std_vector.i>

%include <nodejs_buffer.i>
%include "types.i"

// enums
%include "gradido_blockchain/data/AddressType.h"
%include "gradido_blockchain/data/CrossGroupType.h"
%include "gradido_blockchain/data/TransactionType.h"

%typemap(ts) gradido::data::AddressType "AddressType";
%typemap(ts) gradido::data::CrossGroupType "CrossGroupType";
%typemap(ts) gradido::data::TransactionType "TransactionType";

// base types
%include "MemoryBlock.i"
// crypto types
%include "gradido_blockchain/crypto/MnemonicType.h"
%typemap(ts) MnemonicType "MnemonicType";
%include "crypto/CryptoConfig.i"
%include "crypto/Passphrase.i"
%include "crypto/SecretKeyCryptography.i"
%include "crypto/KeyPairEd25519.i"
%include "crypto/AuthenticatedEncryption.i"
%include "crypto/SealedBoxes.i"
// base types
%include "GradidoUnit.i"
%include "data.i"

// advanced types
%include "TransactionBodyBuilder.i"
%include "GradidoTransactionBuilder.i"
