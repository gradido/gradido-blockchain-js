%exception {
    try {
        $function
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}

%ignore operator|;
%ignore operator&;
%rename(InteractionToJson) gradido::interaction::toJson::Context;

%{
#include "gradido_blockchain/interaction/toJson/Context.h"
%}

%include "gradido_blockchain/interaction/toJson/BodyBytesType.h"
%typemap(ts) gradido::interaction::toJson::BodyBytesType "BodyBytesType";

%include "gradido_blockchain/interaction/toJson/Context.h"



