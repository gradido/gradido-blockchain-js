%exception {
    try {
        $function
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}

%unique_ptr(gradido::data::GradidoTransfer)
%unique_ptr(gradido::data::GradidoCreation)
%unique_ptr(gradido::data::CommunityFriendsUpdate)
%unique_ptr(gradido::data::RegisterAddress)
%unique_ptr(gradido::data::GradidoDeferredTransfer)
%unique_ptr(gradido::data::CommunityRoot)
%unique_ptr(gradido::data::TransactionBody)
%unique_ptr(gradido::data::GradidoTransaction)
%unique_ptr(gradido::data::ConfirmedTransaction)

%shared_ptr(gradido::data::GradidoTransfer)
%shared_ptr(gradido::data::GradidoCreation)
%shared_ptr(gradido::data::CommunityFriendsUpdate)
%shared_ptr(gradido::data::RegisterAddress)
%shared_ptr(gradido::data::GradidoDeferredTransfer)
%shared_ptr(gradido::data::CommunityRoot)
%shared_ptr(gradido::data::TransactionBody)
%shared_ptr(gradido::data::GradidoTransaction)
%shared_ptr(gradido::data::ConfirmedTransaction)

%rename(getDate) getAsTimepoint;

//ConstTransactionBodyPtr

%ignore gradido::data::Timestamp::operator Timepoint;
%ignore gradido::data::TimestampSeconds::operator Timepoint;

%{
#include "gradido_blockchain/data/ConfirmedTransaction.h"
%}

%typemap(ts) std::vector<gradido::data::SignaturePair> "SignaturePairs";
%typemap(ts) const gradido::data::SignaturePair& "SignaturePair";
%typemap(ts) const std::vector<gradido::data::SignaturePair>& "SignaturePairs";
%template(SignaturePairs) std::vector<gradido::data::SignaturePair>;


%typemap(ts) uint8_t* "Buffer";
%typemap(out) uint8_t* {
  $result = Napi::Buffer<uint8_t>::Copy(info.Env(), arg1->data(), arg1->size());
}

%include "gradido_blockchain/data/TransferAmount.h"
%include "gradido_blockchain/data/TimestampSeconds.h"
%include "gradido_blockchain/data/Timestamp.h"
%include "gradido_blockchain/data/SignaturePair.h"
%include "gradido_blockchain/data/SignatureMap.h"
%include "gradido_blockchain/data/CommunityFriendsUpdate.h"
%include "gradido_blockchain/data/CommunityRoot.h"
%include "gradido_blockchain/data/GradidoCreation.h"
%include "gradido_blockchain/data/GradidoTransfer.h"
%include "gradido_blockchain/data/GradidoDeferredTransfer.h"
%include "gradido_blockchain/data/RegisterAddress.h"
%include "gradido_blockchain/data/TransactionBody.h"
%include "gradido_blockchain/data/GradidoTransaction.h"
%include "gradido_blockchain/data/ConfirmedTransaction.h"

