%exception {
    try {
        $function
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}

namespace gradido::blockchain {
  %ignore AbstractProvider;
  // I cannot undefine the AbstractProvider Base class so let at least replace any by a meaningful name
  %typemap(ts) AbstractProvider* "AbstractBlockchainProvider";
  %rename(InMemoryBlockchainProvider) InMemoryProvider;    
  %ignore InMemoryProvider::findBlockchain(std::string_view communityId);  
}

%{
#include "gradido_blockchain/blockchain/InMemoryProvider.h"
%}

%include "gradido_blockchain/blockchain/AbstractProvider.h"
%include "gradido_blockchain/blockchain/InMemoryProvider.h"

%extend gradido::blockchain::InMemoryProvider {
    std::shared_ptr<gradido::blockchain::InMemory> getBlockchain(std::string_view communityId) {
        return std::dynamic_pointer_cast<gradido::blockchain::InMemory>($self->findBlockchain(communityId));
    }
};
