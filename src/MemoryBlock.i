
%exception {
  
}
%shared_ptr(memory::Block)
%{
#include "gradido_blockchain/memory/Block.h"
%}

%include "gradido_blockchain/memory/Block.h"
// memory::ConstBlockPtr

