/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG JSE (https://www.swig.org).
 * Version 5.0.3
 *
 * Do not make changes to this file unless you know what you are doing - modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

#include "swig/gradido-blockchain-js.h"

/* Class: TransactionBodyBuilder (_exports_TransactionBodyBuilder) */
// jsnapi_getclass
Napi::Function _exports_TransactionBodyBuilder_inst::GetClass(Napi::Env env) {
  std::map<std::string, _exports_TransactionBodyBuilder_templ::PropertyDescriptor> members, staticMembers;
  GetMembers(env, members, staticMembers);
  
  std::vector<_exports_TransactionBodyBuilder_inst::PropertyDescriptor> symbolTable;
  for (auto it = members.begin(); it != members.end(); it++)
  symbolTable.push_back(it->second);
  for (auto it = staticMembers.begin(); it != staticMembers.end(); it++)
  symbolTable.push_back(it->second);
  
  return Napi::ObjectWrap<_exports_TransactionBodyBuilder_inst>::DefineClass(env, "TransactionBodyBuilder", symbolTable);
}

void _exports_TransactionBodyBuilder_inst::GetMembers(
  Napi::Env env,
  std::map<std::string, _exports_TransactionBodyBuilder_templ::PropertyDescriptor> &members,
  std::map<std::string, _exports_TransactionBodyBuilder_templ::PropertyDescriptor> &staticMembers
  ) {
  std::map<std::string, SWIG_NAPI_ObjectWrap_templ<SWIG_NAPI_ObjectWrap_inst>::PropertyDescriptor> baseMembers, baseStaticMembers;
  SWIG_NAPI_ObjectWrap_inst::GetMembers(env, baseMembers, baseStaticMembers);
  members.insert(baseMembers.begin(), baseMembers.end());
  staticMembers.insert(staticMembers.begin(), staticMembers.end());
  
  /* register wrapper functions */
  // jsnapi_register_member_function
  members.erase("reset");
  members.insert({
    "reset",
      _exports_TransactionBodyBuilder_templ::InstanceMethod("reset",
        &_exports_TransactionBodyBuilder_templ::_wrap_TransactionBodyBuilder_reset,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("build");
  members.insert({
    "build",
      _exports_TransactionBodyBuilder_templ::InstanceMethod("build",
        &_exports_TransactionBodyBuilder_templ::_wrap_TransactionBodyBuilder_build,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("setDeferredTransfer");
  members.insert({
    "setDeferredTransfer",
      _exports_TransactionBodyBuilder_templ::InstanceMethod("setDeferredTransfer",
        &_exports_TransactionBodyBuilder_templ::_wrap_TransactionBodyBuilder__wrap_TransactionBodyBuilder_setDeferredTransfer,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("setCommunityFriendsUpdate");
  members.insert({
    "setCommunityFriendsUpdate",
      _exports_TransactionBodyBuilder_templ::InstanceMethod("setCommunityFriendsUpdate",
        &_exports_TransactionBodyBuilder_templ::_wrap_TransactionBodyBuilder__wrap_TransactionBodyBuilder_setCommunityFriendsUpdate,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("setRegisterAddress");
  members.insert({
    "setRegisterAddress",
      _exports_TransactionBodyBuilder_templ::InstanceMethod("setRegisterAddress",
        &_exports_TransactionBodyBuilder_templ::_wrap_TransactionBodyBuilder__wrap_TransactionBodyBuilder_setRegisterAddress,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("setTransactionCreation");
  members.insert({
    "setTransactionCreation",
      _exports_TransactionBodyBuilder_templ::InstanceMethod("setTransactionCreation",
        &_exports_TransactionBodyBuilder_templ::_wrap_TransactionBodyBuilder__wrap_TransactionBodyBuilder_setTransactionCreation,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("setTransactionTransfer");
  members.insert({
    "setTransactionTransfer",
      _exports_TransactionBodyBuilder_templ::InstanceMethod("setTransactionTransfer",
        &_exports_TransactionBodyBuilder_templ::_wrap_TransactionBodyBuilder__wrap_TransactionBodyBuilder_setTransactionTransfer,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("setCommunityRoot");
  members.insert({
    "setCommunityRoot",
      _exports_TransactionBodyBuilder_templ::InstanceMethod("setCommunityRoot",
        &_exports_TransactionBodyBuilder_templ::_wrap_TransactionBodyBuilder__wrap_TransactionBodyBuilder_setCommunityRoot,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("setCreatedAt");
  members.insert({
    "setCreatedAt",
      _exports_TransactionBodyBuilder_templ::InstanceMethod("setCreatedAt",
        &_exports_TransactionBodyBuilder_templ::_wrap_TransactionBodyBuilder_setCreatedAt,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("setCrossGroupType");
  members.insert({
    "setCrossGroupType",
      _exports_TransactionBodyBuilder_templ::InstanceMethod("setCrossGroupType",
        &_exports_TransactionBodyBuilder_templ::_wrap_TransactionBodyBuilder_setCrossGroupType,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("setMemo");
  members.insert({
    "setMemo",
      _exports_TransactionBodyBuilder_templ::InstanceMethod("setMemo",
        &_exports_TransactionBodyBuilder_templ::_wrap_TransactionBodyBuilder_setMemo,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("setVersionNumber");
  members.insert({
    "setVersionNumber",
      _exports_TransactionBodyBuilder_templ::InstanceMethod("setVersionNumber",
        &_exports_TransactionBodyBuilder_templ::_wrap_TransactionBodyBuilder_setVersionNumber,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("setOtherGroup");
  members.insert({
    "setOtherGroup",
      _exports_TransactionBodyBuilder_templ::InstanceMethod("setOtherGroup",
        &_exports_TransactionBodyBuilder_templ::_wrap_TransactionBodyBuilder_setOtherGroup,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  
  /* add static class functions and variables */
  
  
#ifndef NAPI_CPP_EXCEPTIONS
  goto fail;
fail:
  return;
#endif
}

