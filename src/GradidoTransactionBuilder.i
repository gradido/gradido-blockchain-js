// %module gradido

%exception {
    try {
        $function
    } catch(const gradido::GradidoTransactionWrongBuildingStateBuilderException& e) {
        std::string message = "call methods in correct order. " + e.getFullString();
        SWIG_exception(SWIG_RuntimeError, message.data());    
    } catch (const gradido::GradidoTransactionBuilderException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());    
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}

%{
#include "gradido_blockchain/GradidoTransactionBuilder.h"
%}

%ignore gradido::GradidoTransactionBuilder::BodyBytesSignatureMap;
%ignore gradido::GradidoTransactionBuilderException;
%ignore gradido::GradidoTransactionWrongBuildingStateBuilderException;
%include "gradido_blockchain/GradidoTransactionBuilder.h"



