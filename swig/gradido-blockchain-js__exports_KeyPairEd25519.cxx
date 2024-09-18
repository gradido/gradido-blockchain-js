/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG JSE (https://www.swig.org).
 * Version 5.0.3
 *
 * Do not make changes to this file unless you know what you are doing - modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

#include "swig/gradido-blockchain-js.h"

/* Class: KeyPairEd25519 (_exports_KeyPairEd25519) */
// jsnapi_getclass
Napi::Function _exports_KeyPairEd25519_inst::GetClass(Napi::Env env) {
  std::map<std::string, _exports_KeyPairEd25519_templ::PropertyDescriptor> members, staticMembers;
  GetMembers(env, members, staticMembers);
  
  std::vector<_exports_KeyPairEd25519_inst::PropertyDescriptor> symbolTable;
  for (auto it = members.begin(); it != members.end(); it++)
  symbolTable.push_back(it->second);
  for (auto it = staticMembers.begin(); it != staticMembers.end(); it++)
  symbolTable.push_back(it->second);
  
  return Napi::ObjectWrap<_exports_KeyPairEd25519_inst>::DefineClass(env, "KeyPairEd25519", symbolTable);
}

void _exports_KeyPairEd25519_inst::GetMembers(
  Napi::Env env,
  std::map<std::string, _exports_KeyPairEd25519_templ::PropertyDescriptor> &members,
  std::map<std::string, _exports_KeyPairEd25519_templ::PropertyDescriptor> &staticMembers
  ) {
  std::map<std::string, SWIG_NAPI_ObjectWrap_templ<SWIG_NAPI_ObjectWrap_inst>::PropertyDescriptor> baseMembers, baseStaticMembers;
  SWIG_NAPI_ObjectWrap_inst::GetMembers(env, baseMembers, baseStaticMembers);
  members.insert(baseMembers.begin(), baseMembers.end());
  staticMembers.insert(staticMembers.begin(), staticMembers.end());
  
  /* register wrapper functions */
  // jsnapi_register_member_function
  members.erase("deriveChild");
  members.insert({
    "deriveChild",
      _exports_KeyPairEd25519_templ::InstanceMethod("deriveChild",
        &_exports_KeyPairEd25519_templ::_wrap_KeyPairEd25519_deriveChild,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("sign");
  members.insert({
    "sign",
      _exports_KeyPairEd25519_templ::InstanceMethod("sign",
        &_exports_KeyPairEd25519_templ::_wrap_KeyPairEd25519__wrap_KeyPairEd25519_sign,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("verify");
  members.insert({
    "verify",
      _exports_KeyPairEd25519_templ::InstanceMethod("verify",
        &_exports_KeyPairEd25519_templ::_wrap_KeyPairEd25519__wrap_KeyPairEd25519_verify,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("is3rdHighestBitClear");
  members.insert({
    "is3rdHighestBitClear",
      _exports_KeyPairEd25519_templ::InstanceMethod("is3rdHighestBitClear",
        &_exports_KeyPairEd25519_templ::_wrap_KeyPairEd25519_is3rdHighestBitClear,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("getPublicKey");
  members.insert({
    "getPublicKey",
      _exports_KeyPairEd25519_templ::InstanceMethod("getPublicKey",
        &_exports_KeyPairEd25519_templ::_wrap_KeyPairEd25519_getPublicKey,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("getChainCode");
  members.insert({
    "getChainCode",
      _exports_KeyPairEd25519_templ::InstanceMethod("getChainCode",
        &_exports_KeyPairEd25519_templ::_wrap_KeyPairEd25519_getChainCode,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("isTheSame");
  members.insert({
    "isTheSame",
      _exports_KeyPairEd25519_templ::InstanceMethod("isTheSame",
        &_exports_KeyPairEd25519_templ::_wrap_KeyPairEd25519__wrap_KeyPairEd25519_isTheSame,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("equal");
  members.insert({
    "equal",
      _exports_KeyPairEd25519_templ::InstanceMethod("equal",
        &_exports_KeyPairEd25519_templ::_wrap_KeyPairEd25519_equal,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("notEqual");
  members.insert({
    "notEqual",
      _exports_KeyPairEd25519_templ::InstanceMethod("notEqual",
        &_exports_KeyPairEd25519_templ::_wrap_KeyPairEd25519_notEqual,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("hasPrivateKey");
  members.insert({
    "hasPrivateKey",
      _exports_KeyPairEd25519_templ::InstanceMethod("hasPrivateKey",
        &_exports_KeyPairEd25519_templ::_wrap_KeyPairEd25519_hasPrivateKey,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("getCryptedPrivKey");
  members.insert({
    "getCryptedPrivKey",
      _exports_KeyPairEd25519_templ::InstanceMethod("getCryptedPrivKey",
        &_exports_KeyPairEd25519_templ::_wrap_KeyPairEd25519_getCryptedPrivKey,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("isNormalized");
  members.insert({
    "isNormalized",
      _exports_KeyPairEd25519_templ::InstanceMethod("isNormalized",
        &_exports_KeyPairEd25519_templ::_wrap_KeyPairEd25519_isNormalized,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  
  /* add static class functions and variables */
  // jsnapi_register_static_function
  staticMembers.erase("create");
  staticMembers.insert({
    "create",
      StaticMethod("create",
        &_exports_KeyPairEd25519_templ::_wrap_KeyPairEd25519__wrap_KeyPairEd25519_create,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_static_function
  staticMembers.erase("calculatePublicKey");
  staticMembers.insert({
    "calculatePublicKey",
      StaticMethod("calculatePublicKey",
        &_exports_KeyPairEd25519_templ::_wrap_KeyPairEd25519_calculatePublicKey,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_static_function
  staticMembers.erase("validatePublicKey");
  staticMembers.insert({
    "validatePublicKey",
      StaticMethod("validatePublicKey",
        &_exports_KeyPairEd25519_templ::_wrap_KeyPairEd25519_validatePublicKey,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_static_function
  staticMembers.erase("getDerivationType");
  staticMembers.insert({
    "getDerivationType",
      StaticMethod("getDerivationType",
        &_exports_KeyPairEd25519_templ::_wrap_KeyPairEd25519_getDerivationType,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_static_function
  staticMembers.erase("normalizeBytesForce3rd");
  staticMembers.insert({
    "normalizeBytesForce3rd",
      StaticMethod("normalizeBytesForce3rd",
        &_exports_KeyPairEd25519_templ::_wrap_KeyPairEd25519_normalizeBytesForce3rd,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  
  
#ifndef NAPI_CPP_EXCEPTIONS
  goto fail;
fail:
  return;
#endif
}

