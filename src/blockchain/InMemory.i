%shared_ptr(gradido::blockchain::InMemory)
%shared_ptr(gradido::blockchain::Abstract)

%exception {
    try {
        $function
    } catch(const BlockchainOrderException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}

namespace gradido::blockchain {
    %rename(InMemoryBlockchain) InMemory;
    %ignore InMemory::getProvider() const;
    %ignore Abstract;
}

%{
#include "gradido_blockchain/blockchain/InMemory.h"
%}

%include "gradido_blockchain/blockchain/Abstract.h"    
%include "gradido_blockchain/blockchain/InMemory.h"

