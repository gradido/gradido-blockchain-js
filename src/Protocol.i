%unique_ptr(gradido::data::TransactionBody)
%unique_ptr(gradido::data::GradidoTransaction)
%shared_ptr(gradido::data::GradidoTransfer)
%shared_ptr(gradido::data::GradidoCreation)
%shared_ptr(gradido::data::CommunityFriendsUpdate)
%shared_ptr(gradido::data::RegisterAddress)
%shared_ptr(gradido::data::GradidoDeferredTransfer)
%shared_ptr(gradido::data::CommunityRoot)
%shared_ptr(gradido::data::TransactionBody)
%shared_ptr(gradido::data::GradidoTransaction)
%shared_ptr(gradido::data::ConfirmedTransaction)

//ConstTransactionBodyPtr

%ignore gradido::data::Timestamp::operator Timepoint;
%ignore gradido::data::TimestampSeconds::operator Timepoint;

%{
#include "gradido_blockchain/data/Protocol.h"
%}

%template(SignaturePairs) std::vector<gradido::data::SignaturePair>;

%typemap(ts) std::vector<gradido::data::SignaturePair> "SignaturePairs";

%include "gradido_blockchain/data/Protocol.h"
