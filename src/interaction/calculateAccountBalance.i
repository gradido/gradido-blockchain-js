%exception {
    try {
        $function
    } catch (const InsufficientBalanceException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}

%rename(InteractionCalculateAccountBalance) gradido::interaction::calculateAccountBalance::Context;

%{
#include "gradido_blockchain/interaction/calculateAccountBalance/Context.h"
%}

%include "gradido_blockchain/interaction/calculateAccountBalance/Context.h"
