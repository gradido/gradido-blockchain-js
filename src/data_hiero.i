%rename(HieroAccountId) hiero::AccountId;
%rename(HieroTopicId) hiero::TopicId;
%rename(HieroTransactionId) hiero::TransactionId;

%exception {
    try {
        $function
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}

%unique_ptr(hiero::AccountId)
%unique_ptr(hiero::TopicId)
%unique_ptr(hiero::TransactionId)

%shared_ptr(hiero::AccountId)
%shared_ptr(hiero::TopicId)
%shared_ptr(hiero::TransactionId)


%include "gradido_blockchain/data/hiero/AccountId.h"
%include "gradido_blockchain/data/hiero/TopicId.h"
%include "gradido_blockchain/data/hiero/TransactionId.h"
%include "gradido_blockchain/serialization/toJsonString.h"

// toJson for each data Object
%extend hiero::AccountId {
    std::string toJson(bool pretty = false) const {
        return serialization::toJsonString(*self, pretty);
    }
}

%extend hiero::TransactionId {
    std::string toJson(bool pretty = false) const {
        return serialization::toJsonString(*self, pretty);
    }
}