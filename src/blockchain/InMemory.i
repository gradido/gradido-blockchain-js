%shared_ptr(gradido::blockchain::InMemory)
%shared_ptr(gradido::blockchain::Abstract)

%exception {
    try {
        $function
    } catch(const BlockchainOrderException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const CryptoConfig::MissingKeyException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch(const GradidoBlockchainException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}

namespace gradido::blockchain {
    // typescript don't understand parent functions belong also to child, even when not overridden
    %extend InMemory {
        std::shared_ptr<const TransactionEntry> findOne(const Filter& filter = Filter::LAST_TRANSACTION) const {
            return static_cast<const gradido::blockchain::Abstract*>($self)->findOne(filter);
        }
        data::AddressType getAddressType(const Filter& filter = Filter::ALL_TRANSACTIONS) const {
            return static_cast<const gradido::blockchain::Abstract*>($self)->getAddressType(filter);
        }
    
        std::string_view getCommunityId() const {
            return static_cast<const gradido::blockchain::Abstract*>($self)->getCommunityId();
        }
    
        Timepoint getStartDate() const {
            return static_cast<const gradido::blockchain::Abstract*>($self)->getStartDate();
        }
    }

    %rename(InMemoryBlockchain) InMemory;
    %ignore InMemory::getProvider() const;
    %ignore Abstract::getProvider() const;
}

%{
#include "gradido_blockchain/blockchain/Abstract.h"
#include "gradido_blockchain/blockchain/InMemory.h"
%}

%include "gradido_blockchain/blockchain/Abstract.h"    
%include "gradido_blockchain/blockchain/InMemory.h"

