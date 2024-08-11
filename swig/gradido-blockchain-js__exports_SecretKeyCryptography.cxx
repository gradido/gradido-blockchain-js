/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG JSE (https://www.swig.org).
 * Version 5.0.3
 *
 * Do not make changes to this file unless you know what you are doing - modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

#include "swig/gradido-blockchain-js.h"

/* Class: SecretKeyCryptography (_exports_SecretKeyCryptography) */
// jsnapi_getclass
Napi::Function _exports_SecretKeyCryptography_inst::GetClass(Napi::Env env) {
  std::map<std::string, _exports_SecretKeyCryptography_templ::PropertyDescriptor> members, staticMembers;
  GetMembers(env, members, staticMembers);
  
  std::vector<_exports_SecretKeyCryptography_inst::PropertyDescriptor> symbolTable;
  for (auto it = members.begin(); it != members.end(); it++)
  symbolTable.push_back(it->second);
  for (auto it = staticMembers.begin(); it != staticMembers.end(); it++)
  symbolTable.push_back(it->second);
  
  return Napi::ObjectWrap<_exports_SecretKeyCryptography_inst>::DefineClass(env, "SecretKeyCryptography", symbolTable);
}

void _exports_SecretKeyCryptography_inst::GetMembers(
  Napi::Env env,
  std::map<std::string, _exports_SecretKeyCryptography_templ::PropertyDescriptor> &members,
  std::map<std::string, _exports_SecretKeyCryptography_templ::PropertyDescriptor> &staticMembers
  ) {
  std::map<std::string, SWIG_NAPI_ObjectWrap_templ<SWIG_NAPI_ObjectWrap_inst>::PropertyDescriptor> baseMembers, baseStaticMembers;
  SWIG_NAPI_ObjectWrap_inst::GetMembers(env, baseMembers, baseStaticMembers);
  members.insert(baseMembers.begin(), baseMembers.end());
  staticMembers.insert(staticMembers.begin(), staticMembers.end());
  
  /* register wrapper functions */
  // jsnapi_register_member_function
  members.erase("getKeyHashed");
  members.insert({
    "getKeyHashed",
      _exports_SecretKeyCryptography_templ::InstanceMethod("getKeyHashed",
        &_exports_SecretKeyCryptography_templ::_wrap_SecretKeyCryptography_getKeyHashed,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("isTheSame");
  members.insert({
    "isTheSame",
      _exports_SecretKeyCryptography_templ::InstanceMethod("isTheSame",
        &_exports_SecretKeyCryptography_templ::_wrap_SecretKeyCryptography_isTheSame,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("equal");
  members.insert({
    "equal",
      _exports_SecretKeyCryptography_templ::InstanceMethod("equal",
        &_exports_SecretKeyCryptography_templ::_wrap_SecretKeyCryptography__wrap_SecretKeyCryptography_equal,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("hasKey");
  members.insert({
    "hasKey",
      _exports_SecretKeyCryptography_templ::InstanceMethod("hasKey",
        &_exports_SecretKeyCryptography_templ::_wrap_SecretKeyCryptography_hasKey,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("createKey");
  members.insert({
    "createKey",
      _exports_SecretKeyCryptography_templ::InstanceMethod("createKey",
        &_exports_SecretKeyCryptography_templ::_wrap_SecretKeyCryptography_createKey,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("encrypt");
  members.insert({
    "encrypt",
      _exports_SecretKeyCryptography_templ::InstanceMethod("encrypt",
        &_exports_SecretKeyCryptography_templ::_wrap_SecretKeyCryptography_encrypt,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("decrypt");
  members.insert({
    "decrypt",
      _exports_SecretKeyCryptography_templ::InstanceMethod("decrypt",
        &_exports_SecretKeyCryptography_templ::_wrap_SecretKeyCryptography_decrypt,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  
  /* add static class functions and variables */
  
  
#ifndef NAPI_CPP_EXCEPTIONS
  goto fail;
fail:
  return;
#endif
}

