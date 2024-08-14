/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG JSE (https://www.swig.org).
 * Version 5.0.3
 *
 * Do not make changes to this file unless you know what you are doing - modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

#include "swig/gradido-blockchain-js.h"

/* Class: AuthenticatedEncryption (_exports_AuthenticatedEncryption) */
// jsnapi_getclass
Napi::Function _exports_AuthenticatedEncryption_inst::GetClass(Napi::Env env) {
  std::map<std::string, _exports_AuthenticatedEncryption_templ::PropertyDescriptor> members, staticMembers;
  GetMembers(env, members, staticMembers);
  
  std::vector<_exports_AuthenticatedEncryption_inst::PropertyDescriptor> symbolTable;
  for (auto it = members.begin(); it != members.end(); it++)
  symbolTable.push_back(it->second);
  for (auto it = staticMembers.begin(); it != staticMembers.end(); it++)
  symbolTable.push_back(it->second);
  
  return Napi::ObjectWrap<_exports_AuthenticatedEncryption_inst>::DefineClass(env, "AuthenticatedEncryption", symbolTable);
}

void _exports_AuthenticatedEncryption_inst::GetMembers(
  Napi::Env env,
  std::map<std::string, _exports_AuthenticatedEncryption_templ::PropertyDescriptor> &members,
  std::map<std::string, _exports_AuthenticatedEncryption_templ::PropertyDescriptor> &staticMembers
  ) {
  std::map<std::string, SWIG_NAPI_ObjectWrap_templ<SWIG_NAPI_ObjectWrap_inst>::PropertyDescriptor> baseMembers, baseStaticMembers;
  SWIG_NAPI_ObjectWrap_inst::GetMembers(env, baseMembers, baseStaticMembers);
  members.insert(baseMembers.begin(), baseMembers.end());
  staticMembers.insert(staticMembers.begin(), staticMembers.end());
  
  /* register wrapper functions */
  // jsnapi_register_member_function
  members.erase("encrypt");
  members.insert({
    "encrypt",
      _exports_AuthenticatedEncryption_templ::InstanceMethod("encrypt",
        &_exports_AuthenticatedEncryption_templ::_wrap_AuthenticatedEncryption__wrap_AuthenticatedEncryption_encrypt,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("decrypt");
  members.insert({
    "decrypt",
      _exports_AuthenticatedEncryption_templ::InstanceMethod("decrypt",
        &_exports_AuthenticatedEncryption_templ::_wrap_AuthenticatedEncryption__wrap_AuthenticatedEncryption_decrypt,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("precalculateSharedSecret");
  members.insert({
    "precalculateSharedSecret",
      _exports_AuthenticatedEncryption_templ::InstanceMethod("precalculateSharedSecret",
        &_exports_AuthenticatedEncryption_templ::_wrap_AuthenticatedEncryption_precalculateSharedSecret,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("removePrecalculatedSharedSecret");
  members.insert({
    "removePrecalculatedSharedSecret",
      _exports_AuthenticatedEncryption_templ::InstanceMethod("removePrecalculatedSharedSecret",
        &_exports_AuthenticatedEncryption_templ::_wrap_AuthenticatedEncryption_removePrecalculatedSharedSecret,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_variable
  members.erase("mPubkey");
  members.insert({
    "mPubkey",
      _exports_AuthenticatedEncryption_templ::InstanceAccessor("mPubkey",
        &_exports_AuthenticatedEncryption_templ::_wrap_AuthenticatedEncryption_mPubkey_get,
        &_exports_AuthenticatedEncryption_templ::_wrap_AuthenticatedEncryption_mPubkey_set,
        static_cast<napi_property_attributes>(napi_writable | napi_enumerable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("getPublicKey");
  members.insert({
    "getPublicKey",
      _exports_AuthenticatedEncryption_templ::InstanceMethod("getPublicKey",
        &_exports_AuthenticatedEncryption_templ::_wrap_AuthenticatedEncryption_getPublicKey,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("getPrivateKey");
  members.insert({
    "getPrivateKey",
      _exports_AuthenticatedEncryption_templ::InstanceMethod("getPrivateKey",
        &_exports_AuthenticatedEncryption_templ::_wrap_AuthenticatedEncryption_getPrivateKey,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("hasPrivateKey");
  members.insert({
    "hasPrivateKey",
      _exports_AuthenticatedEncryption_templ::InstanceMethod("hasPrivateKey",
        &_exports_AuthenticatedEncryption_templ::_wrap_AuthenticatedEncryption_hasPrivateKey,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  
  /* add static class functions and variables */
  
  
#ifndef NAPI_CPP_EXCEPTIONS
  goto fail;
fail:
  return;
#endif
}

