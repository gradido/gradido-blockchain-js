/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG JSE (https://www.swig.org).
 * Version 5.0.3
 *
 * Do not make changes to this file unless you know what you are doing - modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

#include "swig/gradido-blockchain-js.h"

/* Class: SignaturePair (_exports_SignaturePair) */
// jsnapi_getclass
Napi::Function _exports_SignaturePair_inst::GetClass(Napi::Env env) {
  std::map<std::string, _exports_SignaturePair_templ::PropertyDescriptor> members, staticMembers;
  GetMembers(env, members, staticMembers);
  
  std::vector<_exports_SignaturePair_inst::PropertyDescriptor> symbolTable;
  for (auto it = members.begin(); it != members.end(); it++)
  symbolTable.push_back(it->second);
  for (auto it = staticMembers.begin(); it != staticMembers.end(); it++)
  symbolTable.push_back(it->second);
  
  return Napi::ObjectWrap<_exports_SignaturePair_inst>::DefineClass(env, "SignaturePair", symbolTable);
}

void _exports_SignaturePair_inst::GetMembers(
  Napi::Env env,
  std::map<std::string, _exports_SignaturePair_templ::PropertyDescriptor> &members,
  std::map<std::string, _exports_SignaturePair_templ::PropertyDescriptor> &staticMembers
  ) {
  std::map<std::string, SWIG_NAPI_ObjectWrap_templ<SWIG_NAPI_ObjectWrap_inst>::PropertyDescriptor> baseMembers, baseStaticMembers;
  SWIG_NAPI_ObjectWrap_inst::GetMembers(env, baseMembers, baseStaticMembers);
  members.insert(baseMembers.begin(), baseMembers.end());
  staticMembers.insert(staticMembers.begin(), staticMembers.end());
  
  /* register wrapper functions */
  // jsnapi_register_member_function
  members.erase("equal");
  members.insert({
    "equal",
      _exports_SignaturePair_templ::InstanceMethod("equal",
        &_exports_SignaturePair_templ::_wrap_SignaturePair_equal,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("getPubkey");
  members.insert({
    "getPubkey",
      _exports_SignaturePair_templ::InstanceMethod("getPubkey",
        &_exports_SignaturePair_templ::_wrap_SignaturePair_getPubkey,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("getSignature");
  members.insert({
    "getSignature",
      _exports_SignaturePair_templ::InstanceMethod("getSignature",
        &_exports_SignaturePair_templ::_wrap_SignaturePair_getSignature,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  
  /* add static class functions and variables */
  
  
#ifndef NAPI_CPP_EXCEPTIONS
  goto fail;
fail:
  return;
#endif
}

