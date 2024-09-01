%exception {
    try {
        $function
    } catch (const gradido::interaction::validate::WrongAddressTypeException& e) {
        std::string message = "WrongAddressTypeException: " + e.getFullString();
        SWIG_exception(SWIG_RuntimeError, message.data());
    } catch (const gradido::interaction::validate::InvalidCreationException& e) {
        std::string message = "InvalidCreationException: " + e.getFullString();
        SWIG_exception(SWIG_RuntimeError, message.data());
    } catch (const InsufficientBalanceException& e) {
        std::string message = "InsufficientBalanceException: " + e.getFullString();
        SWIG_exception(SWIG_RuntimeError, message.data());
    } catch (const gradido::interaction::validate::AddressAlreadyExistException& e) {
        std::string message = "AddressAlreadyExistException: " + e.getFullString();
        SWIG_exception(SWIG_RuntimeError, message.data());
    } catch (const gradido::interaction::validate::PairingTransactionNotMatchException& e) {
        std::string message = "PairingTransactionNotMatchException: " + e.getFullString();
        SWIG_exception(SWIG_RuntimeError, message.data());
    } catch (const gradido::interaction::validate::TransactionValidationRequiredSignMissingException& e) {
        std::string message = "TransactionValidationRequiredSignMissingException: " + e.getFullString();
        SWIG_exception(SWIG_RuntimeError, message.data());        
    } catch (const gradido::interaction::validate::TransactionValidationMissingSignException& e) {
        std::string message = "TransactionValidationMissingSignException: " + e.getFullString();
        SWIG_exception(SWIG_RuntimeError, message.data());
    } catch (const gradido::interaction::validate::TransactionValidationForbiddenSignException& e) {
        std::string message = "TransactionValidationForbiddenSignException: " + e.getFullString();
        SWIG_exception(SWIG_RuntimeError, message.data());
    } catch (const gradido::interaction::validate::TransactionValidationInvalidSignatureException& e) {
        std::string message = "TransactionValidationInvalidSignatureException: " + e.getFullString();
        SWIG_exception(SWIG_RuntimeError, message.data());
    } catch (const gradido::interaction::validate::TransactionValidationInvalidInputException& e) {
        std::string message = "TransactionValidationInvalidInputException: " + e.getFullString();
        SWIG_exception(SWIG_RuntimeError, message.data());
    } catch (const gradido::interaction::validate::TransactionValidationException& e) {
        std::string message = "TransactionValidationException: " + e.getFullString();
        SWIG_exception(SWIG_RuntimeError, message.data());
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}

%ignore operator|;
%ignore operator&;
%rename(InteractionValidate) gradido::interaction::validate::Context;
%rename(ValidateType) gradido::interaction::validate::Type;

%{
#include "gradido_blockchain/interaction/validate/Type.h"
#include "gradido_blockchain/interaction/validate/Exceptions.h"
#include "gradido_blockchain/interaction/validate/Context.h"
%}
%include "gradido_blockchain/interaction/validate/Type.h"
%typemap(ts) gradido::interaction::validate::Type "ValidateType";

%include "gradido_blockchain/interaction/validate/Context.h"
