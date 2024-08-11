%unique_ptr(gradido::data::TransactionBody)
%unique_ptr(gradido::data::GradidoTransaction)
%shared_ptr(gradido::data::GradidoTransfer)
%shared_ptr(gradido::data::GradidoCreation)
%shared_ptr(gradido::data::CommunityFriendsUpdate)
%shared_ptr(gradido::data::RegisterAddress)
%shared_ptr(gradido::data::GradidoDeferredTransfer)
%shared_ptr(gradido::data::CommunityRoot)

%{
#include "gradido_blockchain/data/Protocol.h"
%}

%include "gradido_blockchain/data/Protocol.h"
