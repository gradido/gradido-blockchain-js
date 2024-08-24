%exception {
    try {
        $function
    } catch (const TransactionBodyBuilderException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}

%rename(InteractionSerialize) gradido::interaction::serialize::Context;

%{
#include "gradido_blockchain/interaction/serialize/Context.h"
%}

%include "gradido_blockchain/interaction/serialize/Context.h"
