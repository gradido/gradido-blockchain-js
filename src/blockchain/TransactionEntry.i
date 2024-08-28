%exception {
    try {
        $function
    } catch(const InvalidGradidoTransaction& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}

namespace gradido::blockchain {
    %ignore TransactionEntry::getCoinCommunityId(const data::TransactionBody& body);
    
    %typemap(ts) TransactionEntries "TransactionEntries";
    %typemap(ts) const TransactionEntries& "TransactionEntries";    
    %typemap(ts) const std::vector<std::shared_ptr<TransactionEntry>>& "TransactionEntries";
    %typemap(ts) std::shared_ptr<TransactionEntry> "TransactionEntry";
    %typemap(ts) const std::shared_ptr<TransactionEntry>& "TransactionEntry";
}

%shared_ptr(gradido::blockchain::TransactionEntry)

%{
#include "gradido_blockchain/blockchain/TransactionEntry.h"
%}

%template(TransactionEntries) std::vector<std::shared_ptr<gradido::blockchain::TransactionEntry>>;

%include "gradido_blockchain/blockchain/TransactionEntry.h"
