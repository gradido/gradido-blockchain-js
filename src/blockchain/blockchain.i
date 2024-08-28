%include "TransactionEntry.i"
%include "Filter.i"

%exception {
    try {
        $function
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}

namespace gradido::blockchain {
    %typemap(ts) DeferredRedeemedTransferPair "DeferredRedeemedTransferPair";
    %typemap(ts) const  std::pair<std::shared_ptr< gradido::blockchain::TransactionEntry >, std::shared_ptr< gradido::blockchain::TransactionEntry >>& "DeferredRedeemedTransferPair";
}
%template(DeferredRedeemedTransferPair) std::pair<std::shared_ptr<gradido::blockchain::TransactionEntry>, std::shared_ptr<gradido::blockchain::TransactionEntry>>;
//%template(DeferredRedeemedTransferPairs) std::vector<gradido::blockchain::DeferredRedeemedTransferPair>;


%include "blockchain/InMemory.i"
%include "blockchain/InMemoryProvider.i"