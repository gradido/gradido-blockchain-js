%exception {
    try {
        $function
    } catch (const GradidoBlockchainException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());    
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}

%rename(InteractionToJson) gradido::interaction::toJson::Context;

%{
#include "gradido_blockchain/interaction/toJson/Context.h"
%}

%include "gradido_blockchain/interaction/toJson/BodyBytesType.h"
%typemap(ts) gradido::interaction::toJson::BodyBytesType "BodyBytesType";
%template(bodyBytesTypeToString) enum_to_string<gradido::interaction::toJson::BodyBytesType>;
%template(stringToBodyBytesType) string_to_enum<gradido::interaction::toJson::BodyBytesType>;
%include "gradido_blockchain/interaction/toJson/Context.h"



