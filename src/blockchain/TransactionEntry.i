%exception {
    try {
        $function
    } catch(const InvalidGradidoTransaction& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}


// typemap for transaction list, converting it into vectors
%typemap(ts) gradido::blockchain::TransactionEntries "TransactionEntries";
/*%typemap(in) gradido::blockchain::TransactionEntries {
    if(!$input.IsNumber()) {
        SWIG_exception_fail(SWIG_TypeError, "Expected a number");
    }
    $1 = std::chrono::duration_cast<std::chrono::seconds>(std::chrono::duration<uint32_t>($input.As<Napi::Number>().Uint32Value()));
}
*/
%typemap(out) gradido::blockchain::TransactionEntries (std::vector<std::shared_ptr<gradido::blockchain::TransactionEntry>> transactionEntriesVector) {
    transactionEntriesVector.reserve($1.size());
    auto& transactionsList = *(&$1);
    for(auto v: transactionsList) {
        transactionEntriesVector.push_back(v);
    }
    $result = SWIG_NewPointerObj(
        (new std::vector<std::shared_ptr<gradido::blockchain::TransactionEntry>>(transactionEntriesVector)),
        SWIGTYPE_p_std__vectorT_std__shared_ptrT_gradido__blockchain__TransactionEntry_t_t, 
        SWIG_POINTER_OWN |  0 
    );
}

%typemap(ts) const gradido::blockchain::TransactionEntries& "TransactionEntries";
%typemap(out) const gradido::blockchain::TransactionEntries& (std::vector<std::shared_ptr<gradido::blockchain::TransactionEntry>> transactionEntriesVector) {
    transactionEntriesVector.reserve($1->size());
    auto& transactionsList = *$1;
    for(auto v: transactionsList) {
        transactionEntriesVector.push_back(v);
    }
    $result = SWIG_NewPointerObj(
        (new std::vector<std::shared_ptr<gradido::blockchain::TransactionEntry>>(transactionEntriesVector)),
        SWIGTYPE_p_std__vectorT_std__shared_ptrT_gradido__blockchain__TransactionEntry_t_t, 
        SWIG_POINTER_OWN |  0 
    );
}


namespace gradido::blockchain {
    %ignore TransactionEntry::getCoinCommunityId(const data::TransactionBody& body);
    
    //%typemap(ts) TransactionEntries "TransactionEntries";
    //%typemap(ts) const TransactionEntries& "TransactionEntries";    
    %typemap(ts) const std::vector<std::shared_ptr<TransactionEntry>>& "TransactionEntries";
    %typemap(ts) std::shared_ptr<TransactionEntry> "TransactionEntry|null";
    %typemap(ts) const std::shared_ptr<TransactionEntry>& "TransactionEntry|null";
}

%shared_ptr(gradido::blockchain::TransactionEntry)

%{
#include "gradido_blockchain/blockchain/TransactionEntry.h"
%}

%template(TransactionEntries) std::vector<std::shared_ptr<gradido::blockchain::TransactionEntry>>;

%include "gradido_blockchain/blockchain/TransactionEntry.h"
