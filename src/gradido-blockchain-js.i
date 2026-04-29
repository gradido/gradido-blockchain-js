#define GRADIDOBLOCKCHAIN_EXPORT

/* gradido-blockchain.i */
%module gradido
%ignore GradidoBlockchainException;

%{
#include "gradido_blockchain/const.h"
#include "gradido_blockchain/GradidoBlockchainException.h"

#include <magic_enum/magic_enum.hpp>
#include <string>

template <typename E>
std::string enum_to_string(E value) {
  return std::string(magic_enum::enum_name(value));
}

template <typename E>
E string_to_enum(const std::string& name) {
  auto result = magic_enum::enum_cast<E>(name);
  if(result.has_value()) {
    return result.value();
  }
  auto firstEnumValue = magic_enum::enum_value<E>(0);
  auto typeName = magic_enum::enum_type_name<decltype(firstEnumValue)>();
  throw GradidoUnknownEnumException("cannot convert to enum", typeName.data(), name.data());
}
%}
%inline %{
template <typename E>
std::string enum_to_string(E value);
template <typename E>
E string_to_enum(const std::string& name);
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
%rename(plus) operator+;
%rename(minus) operator-;
%rename(times) operator*;
%rename(divide) operator/;
%ignore operator|;
%ignore operator&;
%ignore operator=;

// std libs 
%include <std_string.i>
%include <std_except.i>
%include <std_unique_ptr.i>
%include "lib/std_shared_ptr.i"
%include "lib/std_string_view.i"
%include <stdint.i>
%include <std_vector.i>
%include <std_pair.i>
%include <nodejs_buffer.i>
%include "types.i"
%include "lib/TimepointInterval.i"
%include "lib/MonotonicTimer.i"

// enums
%include "gradido_blockchain/data/AddressType.h"
%include "gradido_blockchain/data/BalanceDerivationType.h"
%include "gradido_blockchain/data/CrossGroupType.h"
%include "gradido_blockchain/data/TransactionType.h"
%include "gradido_blockchain/data/MemoKeyType.h"
%include "gradido_blockchain/data/TransactionTriggerEventType.h"

%typemap(ts) gradido::data::AddressType "AddressType";
%typemap(ts) gradido::data::BalanceDerivationType "BalanceDerivationType";
%typemap(ts) gradido::data::CrossGroupType "CrossGroupType";
%typemap(ts) gradido::data::TransactionType "TransactionType";
%typemap(ts) gradido::data::MemoKeyType "MemoKeyType";
%typemap(ts) gradido::data::TransactionTriggerEventType "TransactionTriggerEventType";

// needed for string_to_enum to get more infos on exception
%exception {
    try {
        $function
    } catch (const GradidoBlockchainException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}

%template(addressTypeToString) enum_to_string<gradido::data::AddressType>;
%template(stringToAddressType) string_to_enum<gradido::data::AddressType>;
%template(balanceDerivationTypeToString) enum_to_string<gradido::data::BalanceDerivationType>;
%template(stringToBalanceDerivationType) string_to_enum<gradido::data::BalanceDerivationType>;
%template(crossGroupTypeToString) enum_to_string<gradido::data::CrossGroupType>;
%template(stringToCrossGroupType) string_to_enum<gradido::data::CrossGroupType>;
%template(transactionTypeToString) enum_to_string<gradido::data::TransactionType>;
%template(stringToTransactionType) string_to_enum<gradido::data::TransactionType>;
%template(memoKeyTypeToString) enum_to_string<gradido::data::MemoKeyType>;
%template(stringToMemoKeyType) string_to_enum<gradido::data::MemoKeyType>;
%template(transactionTriggerEventTypeToString) enum_to_string<gradido::data::TransactionTriggerEventType>;
%template(stringToTransactionTriggerEventType) string_to_enum<gradido::data::TransactionTriggerEventType>;

// app context

//#include "gradido_blockchain/AppContext.h"
%{
#include "gradido_blockchain/AppContext.h"
#include "gradido_blockchain/lib/Dictionary.h"
#include "gradido_blockchain_core/utils/mono_timer.h"
%}
%init %{  
  gradido::g_appContext = std::make_unique<gradido::AppContext>(
    std::make_unique<RuntimeDictionary<std::string>>("communityIdDictionary"),
    std::make_unique<RuntimeDictionary<GenericHash, GenericHashHash, GenericHashEqual>>("userNameHashDictionary")
  );
  grdu_mono_timer_init();
%}


// base types
%include "crypto/SignatureOctet.i"
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
// serialization
%include "serialization/toJson.i"
// base types
%include "GradidoUnit.i"
%include "data_compact.i"
%include "data_hiero.i"
%include "data.i"

// advanced types
%include "GradidoTransactionBuilder.i"

// interactions
%include "interaction/deserialize.i"
%include "interaction/serialize.i"

%include "blockchain/blockchain_batch.i"
%include "blockchain/blockchain.i"

%include "interaction/calculateAccountBalance.i"
%include "interaction/createTransactionByEvent.i"
%include "interaction/validate.i"