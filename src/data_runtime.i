
%rename(CompleteTransaction) gradido::data::runtime::CompleteTransaction;
%{
#include "gradido_blockchain/data/runtime/CompleteTransaction.h"
%}

%ignore gradido::data::runtime::CompleteTransaction::getInvolvedAddresses() const;

%include "gradido_blockchain/data/runtime/CompleteTransaction.h"
