%exception {
    try {
        $function
    } catch (const GradidoBlockchainException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());    
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}

%{
#include "gradido_blockchain/blockchain/FilterResult.h"   
#include "gradido_blockchain/blockchain/Pagination.h"   
#include "gradido_blockchain/blockchain/SearchDirection.h"    
#include "gradido_blockchain/blockchain/PublicKeySearchType.h"
#include "gradido_blockchain/blockchain/CompactFilter.h"
#include "gradido_blockchain/blockchain/FilterCriteria.h"
%}


namespace gradido::blockchain {
    %ignore CompactFilter::matches(const data::compact::ConfirmedGradidoTx& confirmedTx, FilterCriteria type) const;
    //%ignore Filter::Filter();   
    %ignore CompactFilterFilter::CompactFilterFilter(const Filter& filter, const IDictionary<PublicKey>& publicKeyDictionary, uint32_t communityIdIndex);
}

%include "gradido_blockchain/blockchain/FilterResult.h"
%include "gradido_blockchain/blockchain/Pagination.h"
%include "gradido_blockchain/blockchain/SearchDirection.h"
%include "gradido_blockchain/blockchain/PublicKeySearchType.h"
%include "gradido_blockchain/blockchain/FilterCriteria.h"
// %typemap(ts) gradido::blockchain::SearchDirection "SearchDirection";
// %template(searchDirectionToString) enum_to_string<gradido::blockchain::SearchDirection>;
// %template(stringToSearchDirection) string_to_enum<gradido::blockchain::SearchDirection>;
%include "gradido_blockchain/blockchain/CompactFilter.h"
%include "gradido_blockchain/serialization/toJsonString.h"

// toJson for each data Object
%extend gradido::blockchain::CompactFilter {
    std::string toJson(bool pretty = false) const {
        return serialization::toJsonString(*self, pretty);
    }
}
    