%exception {
    try {
        $function
    } catch (const gradido::interaction::deserialize::MissingMemberException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const GradidoBlockchainException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());    
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}

%rename(InteractionDeserialize) gradido::interaction::deserialize::Context;
%rename(DeserializeType) gradido::interaction::deserialize::Type;

%{
#include "gradido_blockchain/interaction/deserialize/Type.h"
#include "gradido_blockchain/interaction/deserialize/Exceptions.h"
#include "gradido_blockchain/interaction/deserialize/Context.h"

%}

%include "gradido_blockchain/interaction/deserialize/Type.h"
%typemap(ts) gradido::interaction::deserialize::Type "DeserializeType";
%template(deserializeTypeToString) enum_to_string<gradido::interaction::deserialize::Type>;
%template(stringToDeserializeType) string_to_enum<gradido::interaction::deserialize::Type>;
%include "gradido_blockchain/interaction/deserialize/Context.h"
