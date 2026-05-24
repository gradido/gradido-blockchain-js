%exception {
    try {
        $function
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}

%unique_ptr(gradido::data::EncryptedMemo)
%unique_ptr(gradido::data::AccountBalance)
%unique_ptr(gradido::data::GradidoTransfer)
%unique_ptr(gradido::data::GradidoCreation)
%unique_ptr(gradido::data::CommunityFriendsUpdate)
%unique_ptr(gradido::data::RegisterAddress)
%unique_ptr(gradido::data::GradidoDeferredTransfer)
%unique_ptr(gradido::data::GradidoRedeemDeferredTransfer)
%unique_ptr(gradido::data::GradidoTimeoutDeferredTransfer)
%unique_ptr(gradido::data::CommunityRoot)
%unique_ptr(gradido::data::TransactionBody)
%unique_ptr(gradido::data::TransactionTriggerEvent)
%unique_ptr(gradido::data::GradidoTransaction)
%unique_ptr(gradido::data::ConfirmedTransaction)

%shared_ptr(gradido::data::EncryptedMemo)
%shared_ptr(gradido::data::AccountBalance)
%shared_ptr(gradido::data::GradidoTransfer)
%shared_ptr(gradido::data::GradidoCreation)
%shared_ptr(gradido::data::CommunityFriendsUpdate)
%shared_ptr(gradido::data::RegisterAddress)
%shared_ptr(gradido::data::GradidoDeferredTransfer)
%shared_ptr(gradido::data::GradidoRedeemDeferredTransfer)
%shared_ptr(gradido::data::GradidoTimeoutDeferredTransfer)
%shared_ptr(gradido::data::CommunityRoot)
%shared_ptr(gradido::data::TransactionBody)
%shared_ptr(gradido::data::TransactionTriggerEvent)
%shared_ptr(gradido::data::GradidoTransaction)
%shared_ptr(gradido::data::ConfirmedTransaction)

// unique_ptr fix
%typemap(in) std::unique_ptr<const gradido::data::GradidoTransaction> (std::unique_ptr<const gradido::data::GradidoTransaction> tmp) {
    $1 = std::move(tmp);
}


%ignore gradido::data::DurationSeconds::operator Duration;
%rename(getDate) getAsTimepoint;

//ConstTransactionBodyPtr

%ignore gradido::data::Timestamp::operator Timepoint;
%ignore gradido::data::TimestampSeconds::operator Timepoint;

%{
#include "gradido_blockchain/data/ConfirmedTransaction.h"
#include "gradido_blockchain/data/TransactionTriggerEvent.h"
%}

// Signature Pairs vector
%typemap(ts) std::vector<gradido::data::SignaturePair> "SignaturePairs";
%typemap(ts) const gradido::data::SignaturePair& "SignaturePair";
%typemap(ts) const std::vector<gradido::data::SignaturePair>& "SignaturePairs";
%template(SignaturePairs) std::vector<gradido::data::SignaturePair>;

// Encrypted Memos vector
%typemap(ts) std::vector<gradido::data::EncryptedMemo> "EncryptedMemos";
%typemap(ts) const gradido::data::EncryptedMemo& "EncryptedMemo";
%typemap(ts) const std::vector<gradido::data::EncryptedMemo>& "EncryptedMemos";
%template(EncryptedMemos) std::vector<gradido::data::EncryptedMemo>;

namespace gradido::data {
    %ignore EncryptedMemo::EncryptedMemo(const char*);
    %ignore EncryptedMemo::EncryptedMemo(const char*, const AuthenticatedEncryption&);
    %ignore EncryptedMemo::EncryptedMemo(const char*, const AuthenticatedEncryption&, const AuthenticatedEncryption&);
    %ignore EncryptedMemo::EncryptedMemo(MemoKeyType, memory::Block&&);
    %ignore EncryptedMemo::EncryptedMemo(EncryptedMemo&&);
    %ignore EncryptedMemo::EncryptedMemo(const EncryptedMemo&);
    %ignore TransferAmount::TransferAmount(memory::ConstBlockPtr, const GradidoUnit&, uint32_t);
    %ignore AccountBalance::AccountBalance(memory::ConstBlockPtr, GradidoUnit, uint32_t);
    %ignore ConfirmedTransaction::getAccountBalance(memory::ConstBlockPtr, std::optional<uint32_t>) const;
    %ignore ConfirmedTransaction::hasAccountBalance(memory::ConstBlockPtr, std::optional<uint32_t>) const;
    %ignore ConfirmedTransaction::getDecayedAccountBalance(memory::ConstBlockPtr publicKey, std::optional<uint32_t> coinCommunityIdIndex, Timepoint endDate);
    %ignore GradidoTransaction::getCommunityIdIndex() const;
    %ignore TransactionBody::getCommunityIdIndex() const;
    %ignore TransactionBody::getOtherCommunityIdIndex() const;
    %ignore operator+(const Timestamp& timestamp, const DurationSeconds& duration);
}

// Account Balances vector
%typemap(ts) std::vector<gradido::data::AccountBalance> "AccountBalances";
%typemap(ts) const gradido::data::AccountBalance& "AccountBalance";
%typemap(ts) const std::vector<gradido::data::AccountBalance>& "AccountBalances";
%template(AccountBalances) std::vector<gradido::data::AccountBalance>;

// Transaction Trigger Events vector
%typemap(ts) std::vector<std::shared_ptr<const gradido::data::TransactionTriggerEvent>> "TransactionTriggerEvents";
// %typemap(ts) std::shared_ptr<const TransactionEntry> "TransactionTriggerEvent|null";
// %typemap(ts) const std::shared_ptr<const TransactionEntry>& "TransactionTriggerEvent|null";

%typemap(ts) uint8_t* "Buffer";
%typemap(out) uint8_t* {
  $result = Napi::Buffer<uint8_t>::Copy(info.Env(), arg1->data(), arg1->size());
}

// enum inside class
%typemap(ts) gradido::data::LedgerAnchor::Type "LedgerAnchorType";
%template(ledgerAnchorTypeToString) enum_to_string<gradido::data::LedgerAnchor::Type>;
%template(stringToLedgerAnchorType) string_to_enum<gradido::data::LedgerAnchor::Type>;

%include "gradido_blockchain/data/DurationSeconds.h"
%include "gradido_blockchain/data/TransferAmount.h"
%include "gradido_blockchain/data/TimestampSeconds.h"
%include "gradido_blockchain/data/Timestamp.h"
%include "gradido_blockchain/data/SignaturePair.h"
%include "gradido_blockchain/data/SignatureMap.h"
%include "gradido_blockchain/data/EncryptedMemo.h"
%include "gradido_blockchain/data/AccountBalance.h"
%include "gradido_blockchain/data/CommunityFriendsUpdate.h"
%include "gradido_blockchain/data/CommunityRoot.h"
%include "gradido_blockchain/data/GradidoCreation.h"
%include "gradido_blockchain/data/GradidoTransfer.h"
%include "gradido_blockchain/data/GradidoDeferredTransfer.h"
%include "gradido_blockchain/data/GradidoRedeemDeferredTransfer.h"
%include "gradido_blockchain/data/GradidoTimeoutDeferredTransfer.h"
%include "gradido_blockchain/data/LedgerAnchor.h"
%include "gradido_blockchain/data/RegisterAddress.h"
%include "gradido_blockchain/data/TransactionBody.h"
%include "gradido_blockchain/data/TransactionTriggerEvent.h"
%include "gradido_blockchain/data/GradidoTransaction.h"
%include "gradido_blockchain/data/ConfirmedTransaction.h"
%include "gradido_blockchain/serialization/toJsonString.h"

%{
#include "gradido_blockchain/AppContext.h"
#include "gradido_blockchain/data/adapter/uuid.h"
#include "gradido_blockchain/data/ByteArray.h"
%}

// replace get communityIdIndex with get community id
%extend gradido::data::GradidoTransaction {
    std::string getCommunityId() const {
        return gradido::data::adapter::uuidToString(gradido::g_appContext->getCommunityIds().getDataForIndexOrThrow(self->getCommunityIdIndex()));
    }
}
%extend gradido::data::TransactionBody {
    std::string getOtherCommunityId() const {
        auto communityIdIndexOptional = self->getOtherCommunityIdIndex();
        if (!communityIdIndexOptional) {
            return "";
        }
        return gradido::data::adapter::uuidToString(gradido::g_appContext->getCommunityIds().getDataForIndexOrThrow(communityIdIndexOptional.value()));
    }
}

%extend gradido::data::TransactionBody {
    std::string getCommunityId() const {
        return gradido::data::adapter::uuidToString(gradido::g_appContext->getCommunityIds().getDataForIndexOrThrow(self->getCommunityIdIndex()));
    }
}

// toJson for each data Object
%extend gradido::data::DurationSeconds {
    std::string toJson(bool pretty = false) const {
        return serialization::toJsonString(*self, pretty);
    }
}
%extend gradido::data::TransferAmount {
    std::string toJson(bool pretty = false) const {
        return serialization::toJsonString(*self, pretty);
    }
}
%extend gradido::data::TimestampSeconds {
    std::string toJson(bool pretty = false) const {
        return serialization::toJsonString(*self, pretty);
    }
}
%extend gradido::data::Timestamp {
    std::string toJson(bool pretty = false) const {
        return serialization::toJsonString(*self, pretty);
    }
}
%extend gradido::data::SignaturePair {
    std::string toJson(bool pretty = false) const {
        return serialization::toJsonString(*self, pretty);
    }
}
%extend gradido::data::SignatureMap {
    std::string toJson(bool pretty = false) const {
        return serialization::toJsonString(*self, pretty);
    }
}
%extend gradido::data::EncryptedMemo {
    std::string toJson(bool pretty = false) const {
        return serialization::toJsonString(*self, pretty);
    }
}
%extend gradido::data::AccountBalance {
    std::string toJson(bool pretty = false) const {
        return serialization::toJsonString(*self, pretty);
    }
}
%extend gradido::data::CommunityFriendsUpdate {
    std::string toJson(bool pretty = false) const {
        return serialization::toJsonString(*self, pretty);
    }
}
%extend gradido::data::CommunityRoot {
    std::string toJson(bool pretty = false) const {
        return serialization::toJsonString(*self, pretty);
    }
}
%extend gradido::data::GradidoCreation {
    std::string toJson(bool pretty = false) const {
        return serialization::toJsonString(*self, pretty);
    }
}
%extend gradido::data::GradidoTransfer {
    std::string toJson(bool pretty = false) const {
        return serialization::toJsonString(*self, pretty);
    }
}
%extend gradido::data::GradidoDeferredTransfer {
    std::string toJson(bool pretty = false) const {
        return serialization::toJsonString(*self, pretty);
    }
}
%extend gradido::data::GradidoRedeemDeferredTransfer {
    std::string toJson(bool pretty = false) const {
        return serialization::toJsonString(*self, pretty);
    }
}
%extend gradido::data::GradidoTimeoutDeferredTransfer {
    std::string toJson(bool pretty = false) const {
        return serialization::toJsonString(*self, pretty);
    }
}
%extend gradido::data::LedgerAnchor {
    std::string toJson(bool pretty = false) const {
        return serialization::toJsonString(*self, pretty);
    }
}
%extend gradido::data::RegisterAddress {
    std::string toJson(bool pretty = false) const {
        return serialization::toJsonString(*self, pretty);
    }
}
%extend gradido::data::TransactionBody {
    std::string toJson(bool pretty = false) const {
        return serialization::toJsonString(*self, pretty);
    }
}
%extend gradido::data::TransactionTriggerEvent {
    std::string toJson(bool pretty = false) const {
        return serialization::toJsonString(*self, pretty);
    }
}
%extend gradido::data::GradidoTransaction {
    std::string toJson(bool pretty = false) const {
        return serialization::toJsonString(*self, pretty);
    }
}
%extend gradido::data::ConfirmedTransaction {
    std::string toJson(bool pretty = false) const {
        return serialization::toJsonString(*self, pretty);
    }
}
