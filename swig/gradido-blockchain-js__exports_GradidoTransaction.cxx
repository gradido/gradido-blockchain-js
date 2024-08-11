/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG JSE (https://www.swig.org).
 * Version 5.0.3
 *
 * Do not make changes to this file unless you know what you are doing - modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

#include "swig/gradido-blockchain-js.h"

/* Class: GradidoTransaction (_exports_GradidoTransaction) */
// jsnapi_getclass
Napi::Function _exports_GradidoTransaction_inst::GetClass(Napi::Env env) {
  std::map<std::string, _exports_GradidoTransaction_templ::PropertyDescriptor> members, staticMembers;
  GetMembers(env, members, staticMembers);
  
  std::vector<_exports_GradidoTransaction_inst::PropertyDescriptor> symbolTable;
  for (auto it = members.begin(); it != members.end(); it++)
  symbolTable.push_back(it->second);
  for (auto it = staticMembers.begin(); it != staticMembers.end(); it++)
  symbolTable.push_back(it->second);
  
  return Napi::ObjectWrap<_exports_GradidoTransaction_inst>::DefineClass(env, "GradidoTransaction", symbolTable);
}

void _exports_GradidoTransaction_inst::GetMembers(
  Napi::Env env,
  std::map<std::string, _exports_GradidoTransaction_templ::PropertyDescriptor> &members,
  std::map<std::string, _exports_GradidoTransaction_templ::PropertyDescriptor> &staticMembers
  ) {
  std::map<std::string, SWIG_NAPI_ObjectWrap_templ<SWIG_NAPI_ObjectWrap_inst>::PropertyDescriptor> baseMembers, baseStaticMembers;
  SWIG_NAPI_ObjectWrap_inst::GetMembers(env, baseMembers, baseStaticMembers);
  members.insert(baseMembers.begin(), baseMembers.end());
  staticMembers.insert(staticMembers.begin(), staticMembers.end());
  
  /* register wrapper functions */
  // jsnapi_register_member_variable
  members.erase("signatureMap");
  members.insert({
    "signatureMap",
      _exports_GradidoTransaction_templ::InstanceAccessor("signatureMap",
        &_exports_GradidoTransaction_templ::_wrap_GradidoTransaction_signatureMap_get,
        &_exports_GradidoTransaction_templ::_wrap_GradidoTransaction_signatureMap_set,
        static_cast<napi_property_attributes>(napi_writable | napi_enumerable | napi_configurable))
    });
  // jsnapi_register_member_variable
  members.erase("bodyBytes");
  members.insert({
    "bodyBytes",
      _exports_GradidoTransaction_templ::InstanceAccessor("bodyBytes",
        &_exports_GradidoTransaction_templ::_wrap_GradidoTransaction_bodyBytes_get,
        &_exports_GradidoTransaction_templ::_wrap_GradidoTransaction_bodyBytes_set,
        static_cast<napi_property_attributes>(napi_writable | napi_enumerable | napi_configurable))
    });
  // jsnapi_register_member_variable
  members.erase("paringMessageId");
  members.insert({
    "paringMessageId",
      _exports_GradidoTransaction_templ::InstanceAccessor("paringMessageId",
        &_exports_GradidoTransaction_templ::_wrap_GradidoTransaction_paringMessageId_get,
        &_exports_GradidoTransaction_templ::_wrap_GradidoTransaction_paringMessageId_set,
        static_cast<napi_property_attributes>(napi_writable | napi_enumerable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("getTransactionBody");
  members.insert({
    "getTransactionBody",
      _exports_GradidoTransaction_templ::InstanceMethod("getTransactionBody",
        &_exports_GradidoTransaction_templ::_wrap_GradidoTransaction_getTransactionBody,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("isPairing");
  members.insert({
    "isPairing",
      _exports_GradidoTransaction_templ::InstanceMethod("isPairing",
        &_exports_GradidoTransaction_templ::_wrap_GradidoTransaction_isPairing,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("isInvolved");
  members.insert({
    "isInvolved",
      _exports_GradidoTransaction_templ::InstanceMethod("isInvolved",
        &_exports_GradidoTransaction_templ::_wrap_GradidoTransaction_isInvolved,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("getInvolvedAddresses");
  members.insert({
    "getInvolvedAddresses",
      _exports_GradidoTransaction_templ::InstanceMethod("getInvolvedAddresses",
        &_exports_GradidoTransaction_templ::_wrap_GradidoTransaction_getInvolvedAddresses,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("getSerializedTransaction");
  members.insert({
    "getSerializedTransaction",
      _exports_GradidoTransaction_templ::InstanceMethod("getSerializedTransaction",
        &_exports_GradidoTransaction_templ::_wrap_GradidoTransaction_getSerializedTransaction,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("getFingerprint");
  members.insert({
    "getFingerprint",
      _exports_GradidoTransaction_templ::InstanceMethod("getFingerprint",
        &_exports_GradidoTransaction_templ::_wrap_GradidoTransaction_getFingerprint,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  
  /* add static class functions and variables */
  
  
#ifndef NAPI_CPP_EXCEPTIONS
  goto fail;
fail:
  return;
#endif
}

