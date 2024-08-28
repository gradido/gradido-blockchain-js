%shared_ptr(gradido::blockchain::InMemory)

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
    %ignore Abstract;    
    %ignore InMemory::getProvider() const;
}

%{
#include "gradido_blockchain/blockchain/InMemory.h"

%}

%include "gradido_blockchain/blockchain/Abstract.h"    
%include "gradido_blockchain/blockchain/InMemory.h"

