
%rename(CompleteTransaction) gradido::data::runtime::CompleteTransaction;
%{
#include "gradido_blockchain/data/runtime/CompleteTransaction.h"
%}

namespace gradido::data::runtime {
  %ignore CompleteTransaction::getInvolvedAddresses() const;
  %ignore CompleteTransaction::getSenderCommunityUuid() const;
  %ignore CompleteTransaction::getRecipientCommunityUuid() const;
  %ignore CompleteTransaction::getAccountBalance(
		  PublicKey::ConstViewType publicKey,
			std::optional<Uuid> coinCommunityUuid = std::nullopt
		) const;
  %ignore getAccountBalances() const;
}
%include "gradido_blockchain/data/runtime/CompleteTransaction.h"

%{
#include "gradido_blockchain/data/runtime/CompleteTransaction.h"
#include "gradido_blockchain_core/data/runtime/complete_transaction.h"
#include "gradido_blockchain_core/utils/converter.h"
%}

%extend gradido::data::runtime::CompleteTransaction {
  std::string getSenderCommunityUuidString() const {
    std::optional<std::span<const uint8_t, 16>> uuid = self->getSenderCommunityUuid();
    if (!uuid.has_value()) { return "";}
    char uuidString[37];
    grdu_uuid_to_string(uuidString, uuid->data());
    return std::string(uuidString);
  }
  std::string getRecipientCommunityUuidString() const {
    std::optional<std::span<const uint8_t, 16>> uuid = self->getRecipientCommunityUuid();
    if (!uuid.has_value()) { return "";}
    char uuidString[37];
    grdu_uuid_to_string(uuidString, uuid->data());
    return std::string(uuidString);
  }
  gradido::data::AccountBalance getAccountBalance(
    gradido::data::PublicKey::ConstViewType publicKey, 
    std::optional<gradido::data::Uuid> coinCommunityUuid = std::nullopt
  ) const {
    return self->getAccountBalance(publicKey, coinCommunityUuid);
  }
  std::vector<gradido::data::AccountBalance> getAccountBalances() const {
    auto balances = self->getAccountBalances();
    return std::vector<gradido::data::AccountBalance>(balances.begin(), balances.end());
  }
}