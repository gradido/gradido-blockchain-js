%exception {
    try {
        $function
    } catch (const GradidoBlockchainException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}

%rename(InteractionCreateTransactionByEvent) gradido::interaction::createTransactionByEvent::Context;

%{
#include "gradido_blockchain/interaction/createTransactionByEvent/Context.h"
%}

%include "gradido_blockchain/interaction/createTransactionByEvent/Context.h"
