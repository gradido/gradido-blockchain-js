#include <stdexcept>
%shared_ptr(gradido::blockchain::InMemory)
%shared_ptr(gradido::blockchain::Abstract)

%exception {
    try {
        $function
    } catch(const InsufficientBalanceException &e) {
        SWIG_exception(SWIG_ValueError, e.getFullString().data());
    } catch(const BlockchainOrderException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const CryptoConfig::MissingKeyException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const gradido::GradidoTransactionBuilderException& e) {
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
        Timepoint getStartDate() const {
            return static_cast<const gradido::blockchain::Abstract*>($self)->getStartDate();
        }
        bool isTransactionExist(gradido::data::ConstGradidoTransactionPtr gradidoTransaction, gradido::data::Timestamp confirmedAt) const {
            return static_cast<const gradido::blockchain::Abstract*>($self)->isTransactionExist(gradidoTransaction, confirmedAt);
        }
        grdt_address getAddressTypeSlow(const Filter& filter) const {
            return static_cast<const gradido::blockchain::Abstract*>($self)->getAddressTypeSlow(filter);
        }
    }

    %rename(InMemoryBlockchain) InMemory;
    %ignore InMemory::getProvider() const;
    %ignore Abstract::getProvider() const;
    %ignore Abstract::getCommunityIdIndex() const;
    %ignore Abstract::countAll(const Filter&) const;
    %ignore Abstract::countAll(const CompactFilter&) const;
}

%{
#include "gradido_blockchain/blockchain/Abstract.h"
#include "gradido_blockchain/blockchain/InMemory.h"
%}

%include "gradido_blockchain/blockchain/Abstract.h"
%include "gradido_blockchain/blockchain/InMemory.h"
