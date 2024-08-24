/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG JSE (https://www.swig.org).
 * Version 5.0.3
 *
 * Do not make changes to this file unless you know what you are doing - modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

#include "swig/gradido-blockchain-js.h"

/* Class: GradidoCreation (_exports_GradidoCreation) */
// jsnapi_getclass
Napi::Function _exports_GradidoCreation_inst::GetClass(Napi::Env env) {
  std::map<std::string, _exports_GradidoCreation_templ::PropertyDescriptor> members, staticMembers;
  GetMembers(env, members, staticMembers);
  
  std::vector<_exports_GradidoCreation_inst::PropertyDescriptor> symbolTable;
  for (auto it = members.begin(); it != members.end(); it++)
  symbolTable.push_back(it->second);
  for (auto it = staticMembers.begin(); it != staticMembers.end(); it++)
  symbolTable.push_back(it->second);
  
  return Napi::ObjectWrap<_exports_GradidoCreation_inst>::DefineClass(env, "GradidoCreation", symbolTable);
}

void _exports_GradidoCreation_inst::GetMembers(
  Napi::Env env,
  std::map<std::string, _exports_GradidoCreation_templ::PropertyDescriptor> &members,
  std::map<std::string, _exports_GradidoCreation_templ::PropertyDescriptor> &staticMembers
  ) {
  std::map<std::string, SWIG_NAPI_ObjectWrap_templ<SWIG_NAPI_ObjectWrap_inst>::PropertyDescriptor> baseMembers, baseStaticMembers;
  SWIG_NAPI_ObjectWrap_inst::GetMembers(env, baseMembers, baseStaticMembers);
  members.insert(baseMembers.begin(), baseMembers.end());
  staticMembers.insert(staticMembers.begin(), staticMembers.end());
  
  /* register wrapper functions */
  // jsnapi_register_member_function
  members.erase("getInvolvedAddresses");
  members.insert({
    "getInvolvedAddresses",
      _exports_GradidoCreation_templ::InstanceMethod("getInvolvedAddresses",
        &_exports_GradidoCreation_templ::_wrap_GradidoCreation_getInvolvedAddresses,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("isInvolved");
  members.insert({
    "isInvolved",
      _exports_GradidoCreation_templ::InstanceMethod("isInvolved",
        &_exports_GradidoCreation_templ::_wrap_GradidoCreation_isInvolved,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("getRecipient");
  members.insert({
    "getRecipient",
      _exports_GradidoCreation_templ::InstanceMethod("getRecipient",
        &_exports_GradidoCreation_templ::_wrap_GradidoCreation_getRecipient,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("getTargetDate");
  members.insert({
    "getTargetDate",
      _exports_GradidoCreation_templ::InstanceMethod("getTargetDate",
        &_exports_GradidoCreation_templ::_wrap_GradidoCreation_getTargetDate,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  
  /* add static class functions and variables */
  
  
#ifndef NAPI_CPP_EXCEPTIONS
  goto fail;
fail:
  return;
#endif
}

