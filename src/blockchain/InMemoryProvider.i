%exception {
    try {
        $function
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}

namespace gradido::blockchain {
  %ignore AbstractProvider;
  %ignore GroupNotFoundException;
  // I cannot undefine the AbstractProvider Base class so let at least replace any by a meaningful name
  %typemap(ts) AbstractProvider* "AbstractBlockchainProvider";
  %rename(InMemoryBlockchainProvider) InMemoryProvider;    
  //%ignore InMemoryProvider::findBlockchain(std::string_view communityId);  
  //%rename(findBlockchain) InMemoryProvider::getBlockchain;

  // %ignore AbstractProvider;
  %ignore GroupNotFoundException;
  %ignore InMemoryProvider::findBlockchain;
}

%{
#include "gradido_blockchain/blockchain/InMemoryProvider.h"
%}

%include "gradido_blockchain/blockchain/AbstractProvider.h"
%include "gradido_blockchain/blockchain/InMemoryProvider.h"

%extend gradido::blockchain::InMemoryProvider {
    std::shared_ptr<gradido::blockchain::InMemory> getBlockchain(const std::string& communityId) {
        return std::dynamic_pointer_cast<gradido::blockchain::InMemory>($self->findBlockchain(communityId));
    }
    std::shared_ptr<gradido::blockchain::InMemory> getBlockchain(uint32_t communityIdIndex) {
        return std::dynamic_pointer_cast<gradido::blockchain::InMemory>($self->findBlockchain(communityIdIndex));
    }
};
