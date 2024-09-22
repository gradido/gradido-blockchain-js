%exception {
    try {
        $function
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}


%{
#include "gradido_blockchain/blockchain/FilterResult.h"   
#include "gradido_blockchain/blockchain/Pagination.h"   
#include "gradido_blockchain/blockchain/SearchDirection.h"    
#include "gradido_blockchain/blockchain/Filter.h"
#include "gradido_blockchain/blockchain/FilterBuilder.h"
%}


namespace gradido::blockchain {
    %ignore Filter::matches(std::shared_ptr<TransactionEntry> entry, FilterCriteria type, std::string_view communityId) const;
    //%ignore Filter::Filter();   
    %ignore Filter::Filter(
      uint64_t _minTransactionNr,
      uint64_t _maxTransactionNr,
      memory::ConstBlockPtr _involvedPublicKey = nullptr,
      SearchDirection _searchDirection = SearchDirection::DESC,
      Pagination _pagination = Pagination(0),					
      std::string_view coinCommunityId = std::string_view(),
      TimepointInterval _timepointInterval = TimepointInterval(),
      data::TransactionType _transactionType = data::TransactionType::NONE,
      std::function<FilterResult(const TransactionEntry&)> _filterFunction = nullptr
    );
    %ignore Filter::Filter(
      uint64_t _maxTransactionNr,
			memory::ConstBlockPtr _involvedPublicKey,
			TimepointInterval _timepointInterval,
			std::function<FilterResult(const TransactionEntry&)> _filterFunction
    );
    %ignore Filter::Filter(
      uint64_t _maxTransactionNr,
      memory::ConstBlockPtr _involvedPublicKey,
      SearchDirection _searchDirection,
      std::string_view coinCommunityId,
      std::function<FilterResult(const TransactionEntry&)> _filterFunction
    );
    %ignore Filter::Filter(std::function<FilterResult(const TransactionEntry&)> _filterFunction);
    %ignore Filter::filterFunction;
    %ignore FilterBuilder::setFilterFunction;
}

%include "gradido_blockchain/blockchain/FilterResult.h"
%include "gradido_blockchain/blockchain/Pagination.h"
%include "gradido_blockchain/blockchain/SearchDirection.h"
%typemap(ts) gradido::blockchain::SearchDirection "SearchDirection";
%template(searchDirectionToString) enum_to_string<gradido::blockchain::SearchDirection>;
%template(stringToSearchDirection) string_to_enum<gradido::blockchain::SearchDirection>;
%include "gradido_blockchain/blockchain/Filter.h"
%include "gradido_blockchain/blockchain/FilterBuilder.h"
