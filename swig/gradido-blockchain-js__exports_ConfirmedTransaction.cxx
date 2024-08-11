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
  // jsnapi_register_member_variable
  members.erase("id");
  members.insert({
    "id",
      _exports_ConfirmedTransaction_templ::InstanceAccessor("id",
        &_exports_ConfirmedTransaction_templ::_wrap_ConfirmedTransaction_id_get,
        &_exports_ConfirmedTransaction_templ::_wrap_ConfirmedTransaction_id_set,
        static_cast<napi_property_attributes>(napi_writable | napi_enumerable | napi_configurable))
    });
  // jsnapi_register_member_variable
  members.erase("gradidoTransaction");
  members.insert({
    "gradidoTransaction",
      _exports_ConfirmedTransaction_templ::InstanceAccessor("gradidoTransaction",
        &_exports_ConfirmedTransaction_templ::_wrap_ConfirmedTransaction_gradidoTransaction_get,
        &_exports_ConfirmedTransaction_templ::_wrap_ConfirmedTransaction_gradidoTransaction_set,
        static_cast<napi_property_attributes>(napi_writable | napi_enumerable | napi_configurable))
    });
  // jsnapi_register_member_variable
  members.erase("confirmedAt");
  members.insert({
    "confirmedAt",
      _exports_ConfirmedTransaction_templ::InstanceAccessor("confirmedAt",
        &_exports_ConfirmedTransaction_templ::_wrap_ConfirmedTransaction_confirmedAt_get,
        &_exports_ConfirmedTransaction_templ::_wrap_ConfirmedTransaction_confirmedAt_set,
        static_cast<napi_property_attributes>(napi_writable | napi_enumerable | napi_configurable))
    });
  // jsnapi_register_member_variable
  members.erase("versionNumber");
  members.insert({
    "versionNumber",
      _exports_ConfirmedTransaction_templ::InstanceAccessor("versionNumber",
        &_exports_ConfirmedTransaction_templ::_wrap_ConfirmedTransaction_versionNumber_get,
        &_exports_ConfirmedTransaction_templ::_wrap_ConfirmedTransaction_versionNumber_set,
        static_cast<napi_property_attributes>(napi_writable | napi_enumerable | napi_configurable))
    });
  // jsnapi_register_member_variable
  members.erase("runningHash");
  members.insert({
    "runningHash",
      _exports_ConfirmedTransaction_templ::InstanceAccessor("runningHash",
        &_exports_ConfirmedTransaction_templ::_wrap_ConfirmedTransaction_runningHash_get,
        &_exports_ConfirmedTransaction_templ::_wrap_ConfirmedTransaction_runningHash_set,
        static_cast<napi_property_attributes>(napi_writable | napi_enumerable | napi_configurable))
    });
  // jsnapi_register_member_variable
  members.erase("messageId");
  members.insert({
    "messageId",
      _exports_ConfirmedTransaction_templ::InstanceAccessor("messageId",
        &_exports_ConfirmedTransaction_templ::_wrap_ConfirmedTransaction_messageId_get,
        &_exports_ConfirmedTransaction_templ::_wrap_ConfirmedTransaction_messageId_set,
        static_cast<napi_property_attributes>(napi_writable | napi_enumerable | napi_configurable))
    });
  // jsnapi_register_member_variable
  members.erase("accountBalance");
  members.insert({
    "accountBalance",
      _exports_ConfirmedTransaction_templ::InstanceAccessor("accountBalance",
        &_exports_ConfirmedTransaction_templ::_wrap_ConfirmedTransaction_accountBalance_get,
        &_exports_ConfirmedTransaction_templ::_wrap_ConfirmedTransaction_accountBalance_set,
        static_cast<napi_property_attributes>(napi_writable | napi_enumerable | napi_configurable))
    });
  
  /* add static class functions and variables */
  
  
#ifndef NAPI_CPP_EXCEPTIONS
  goto fail;
fail:
  return;
#endif
}

