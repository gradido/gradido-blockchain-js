// %module gradido

%exception {
    try {
        $function
    } catch (const gradido::TransactionBodyBuilderException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}

%{
#include "gradido_blockchain/TransactionBodyBuilder.h"
%}

%ignore TransactionBodyBuilderException;
%include "gradido_blockchain/TransactionBodyBuilder.h"


