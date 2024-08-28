%include "blockchain/TransactionEntry.i"

%exception {
    try {
        $function
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}

namespace gradido::blockchain {
    %ignore Filter::matches(std::shared_ptr<TransactionEntry> entry, FilterCriteria type, std::string_view communityId) const;
    %ignore AbstractProvider;
    %ignore GroupNotFoundException;
    %ignore Filter::Filter;   
    %ignore Filter::filterFunction;
    %ignore FilterBuilder::setFilterFunction;

    %typemap(ts) DeferredRedeemedTransferPair "DeferredRedeemedTransferPair";
    %typemap(ts) const  std::pair<std::shared_ptr< gradido::blockchain::TransactionEntry >, std::shared_ptr< gradido::blockchain::TransactionEntry >>& "DeferredRedeemedTransferPair";
}
%template(DeferredRedeemedTransferPair) std::pair<std::shared_ptr<gradido::blockchain::TransactionEntry>, std::shared_ptr<gradido::blockchain::TransactionEntry>>;
//%template(DeferredRedeemedTransferPairs) std::vector<gradido::blockchain::DeferredRedeemedTransferPair>;

%ignore TimepointInterval::MonthYearIterator;
%ignore TimepointInterval::begin();
%ignore TimepointInterval::end();

%{
#include "gradido_blockchain/blockchain/FilterResult.h"   
#include "gradido_blockchain/blockchain/Pagination.h"   
#include "gradido_blockchain/blockchain/SearchDirection.h"    
#include "gradido_blockchain/lib/TimepointInterval.h"
#include "gradido_blockchain/blockchain/Filter.h"
#include "gradido_blockchain/blockchain/FilterBuilder.h"

%}

%include "gradido_blockchain/blockchain/FilterResult.h"
%include "gradido_blockchain/blockchain/Pagination.h"
%include "gradido_blockchain/blockchain/SearchDirection.h"
%typemap(ts) gradido::blockchain::SearchDirection "SearchDirection";
%include "gradido_blockchain/lib/TimepointInterval.h"
%include "gradido_blockchain/blockchain/Filter.h"
%include "gradido_blockchain/blockchain/FilterBuilder.h"

%include "blockchain/InMemory.i"
%include "blockchain/InMemoryProvider.i"