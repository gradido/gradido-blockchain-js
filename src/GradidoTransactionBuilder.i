// %module gradido

%exception {
    try {
        $function
    } catch (const gradido::GradidoTransactionBuilderException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}

%{
#include "gradido_blockchain/GradidoTransactionBuilder.h"
%}

%ignore GradidoTransactionBuilderException;
%include "gradido_blockchain/GradidoTransactionBuilder.h"



