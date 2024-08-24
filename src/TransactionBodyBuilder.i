// %module gradido

%exception {
    try {
        $function
    } catch (const TransactionBodyBuilderException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}

namespace gradido {
    %ignore TransactionBodyBuilder::setMemo(std::string_view memo);
    %ignore TransactionBodyBuilder::setVersionNumber(std::string_view versionNumber);
    %ignore TransactionBodyBuilder::setOtherGroup(std::string_view otherGroup);
}

%{
using namespace gradido;
#include "gradido_blockchain/TransactionBodyBuilder.h"
%}

%ignore TransactionBodyBuilderException;
%include "gradido_blockchain/TransactionBodyBuilder.h"

%extend gradido::TransactionBodyBuilder {
    TransactionBodyBuilder& setMemo(const std::string& memo) {
        return $self->setMemo(std::string_view(memo));
    }

    TransactionBodyBuilder& setVersionNumber(const std::string& versionNumber) {
        return $self->setVersionNumber(std::string_view(versionNumber));
    }

    TransactionBodyBuilder& setOtherGroup(const std::string& otherGroup) {
        return $self->setOtherGroup(std::string_view(otherGroup));
    }
};



