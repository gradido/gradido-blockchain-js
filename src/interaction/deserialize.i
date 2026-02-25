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
%ignore gradido::interaction::deserialize::Context::run(uint32_t);
%rename(InteractionDeserialize) gradido::interaction::deserialize::Context;
%rename(DeserializeType) gradido::interaction::deserialize::Type;

%{
#include "gradido_blockchain/AppContext.h"
#include "gradido_blockchain/interaction/deserialize/Type.h"
#include "gradido_blockchain/interaction/deserialize/Exceptions.h"
#include "gradido_blockchain/interaction/deserialize/Context.h"
%}

%include "gradido_blockchain/interaction/deserialize/Type.h"
%typemap(ts) gradido::interaction::deserialize::Type "DeserializeType";
%template(deserializeTypeToString) enum_to_string<gradido::interaction::deserialize::Type>;
%template(stringToDeserializeType) string_to_enum<gradido::interaction::deserialize::Type>;
%include "gradido_blockchain/interaction/deserialize/Context.h"

%extend gradido::interaction::deserialize::Context {
    void run(std::string communityId) {
        self->run(gradido::g_appContext->getOrAddCommunityIdIndex(communityId));
    }
}