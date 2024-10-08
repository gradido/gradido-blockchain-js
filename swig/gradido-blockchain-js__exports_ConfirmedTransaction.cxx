/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG JSE (https://www.swig.org).
 * Version 5.0.3
 *
 * Do not make changes to this file unless you know what you are doing - modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

#include "swig/gradido-blockchain-js.h"

/* Class: ConfirmedTransaction (_exports_ConfirmedTransaction) */
// jsnapi_getclass
Napi::Function _exports_ConfirmedTransaction_inst::GetClass(Napi::Env env) {
  std::map<std::string, _exports_ConfirmedTransaction_templ::PropertyDescriptor> members, staticMembers;
  GetMembers(env, members, staticMembers);
  
  std::vector<_exports_ConfirmedTransaction_inst::PropertyDescriptor> symbolTable;
  for (auto it = members.begin(); it != members.end(); it++)
  symbolTable.push_back(it->second);
  for (auto it = staticMembers.begin(); it != staticMembers.end(); it++)
  symbolTable.push_back(it->second);
  
  return Napi::ObjectWrap<_exports_ConfirmedTransaction_inst>::DefineClass(env, "ConfirmedTransaction", symbolTable);
}

void _exports_ConfirmedTransaction_inst::GetMembers(
  Napi::Env env,
  std::map<std::string, _exports_ConfirmedTransaction_templ::PropertyDescriptor> &members,
  std::map<std::string, _exports_ConfirmedTransaction_templ::PropertyDescriptor> &staticMembers
  ) {
  std::map<std::string, SWIG_NAPI_ObjectWrap_templ<SWIG_NAPI_ObjectWrap_inst>::PropertyDescriptor> baseMembers, baseStaticMembers;
  SWIG_NAPI_ObjectWrap_inst::GetMembers(env, baseMembers, baseStaticMembers);
  members.insert(baseMembers.begin(), baseMembers.end());
  staticMembers.insert(staticMembers.begin(), staticMembers.end());
  
  /* register wrapper functions */
  // jsnapi_register_member_function
  members.erase("calculateRunningHash");
  members.insert({
    "calculateRunningHash",
      _exports_ConfirmedTransaction_templ::InstanceMethod("calculateRunningHash",
        &_exports_ConfirmedTransaction_templ::_wrap_ConfirmedTransaction__wrap_ConfirmedTransaction_calculateRunningHash,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("getId");
  members.insert({
    "getId",
      _exports_ConfirmedTransaction_templ::InstanceMethod("getId",
        &_exports_ConfirmedTransaction_templ::_wrap_ConfirmedTransaction_getId,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("getGradidoTransaction");
  members.insert({
    "getGradidoTransaction",
      _exports_ConfirmedTransaction_templ::InstanceMethod("getGradidoTransaction",
        &_exports_ConfirmedTransaction_templ::_wrap_ConfirmedTransaction_getGradidoTransaction,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("getConfirmedAt");
  members.insert({
    "getConfirmedAt",
      _exports_ConfirmedTransaction_templ::InstanceMethod("getConfirmedAt",
        &_exports_ConfirmedTransaction_templ::_wrap_ConfirmedTransaction_getConfirmedAt,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("getVersionNumber");
  members.insert({
    "getVersionNumber",
      _exports_ConfirmedTransaction_templ::InstanceMethod("getVersionNumber",
        &_exports_ConfirmedTransaction_templ::_wrap_ConfirmedTransaction_getVersionNumber,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("getRunningHash");
  members.insert({
    "getRunningHash",
      _exports_ConfirmedTransaction_templ::InstanceMethod("getRunningHash",
        &_exports_ConfirmedTransaction_templ::_wrap_ConfirmedTransaction_getRunningHash,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("getMessageId");
  members.insert({
    "getMessageId",
      _exports_ConfirmedTransaction_templ::InstanceMethod("getMessageId",
        &_exports_ConfirmedTransaction_templ::_wrap_ConfirmedTransaction_getMessageId,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("getAccountBalance");
  members.insert({
    "getAccountBalance",
      _exports_ConfirmedTransaction_templ::InstanceMethod("getAccountBalance",
        &_exports_ConfirmedTransaction_templ::_wrap_ConfirmedTransaction_getAccountBalance,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  
  /* add static class functions and variables */
  
  
#ifndef NAPI_CPP_EXCEPTIONS
  goto fail;
fail:
  return;
#endif
}

