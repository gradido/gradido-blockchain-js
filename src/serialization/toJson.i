%exception {
    try {
        $function
    } catch (const GradidoBlockchainException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());    
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}

%rename(toJson) serialization::toJsonString;

%{
#include "gradido_blockchain/serialization/toJsonString.h"
%}

%include "gradido_blockchain/serialization/toJsonString.h"



