/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG JSE (https://www.swig.org).
 * Version 5.0.3
 *
 * Do not make changes to this file unless you know what you are doing - modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

#include "swig/gradido-blockchain-js.h"

/* Class: TimepointInterval (_exports_TimepointInterval) */
// jsnapi_getclass
Napi::Function _exports_TimepointInterval_inst::GetClass(Napi::Env env) {
  std::map<std::string, _exports_TimepointInterval_templ::PropertyDescriptor> members, staticMembers;
  GetMembers(env, members, staticMembers);
  
  std::vector<_exports_TimepointInterval_inst::PropertyDescriptor> symbolTable;
  for (auto it = members.begin(); it != members.end(); it++)
  symbolTable.push_back(it->second);
  for (auto it = staticMembers.begin(); it != staticMembers.end(); it++)
  symbolTable.push_back(it->second);
  
  return Napi::ObjectWrap<_exports_TimepointInterval_inst>::DefineClass(env, "TimepointInterval", symbolTable);
}

void _exports_TimepointInterval_inst::GetMembers(
  Napi::Env env,
  std::map<std::string, _exports_TimepointInterval_templ::PropertyDescriptor> &members,
  std::map<std::string, _exports_TimepointInterval_templ::PropertyDescriptor> &staticMembers
  ) {
  std::map<std::string, SWIG_NAPI_ObjectWrap_templ<SWIG_NAPI_ObjectWrap_inst>::PropertyDescriptor> baseMembers, baseStaticMembers;
  SWIG_NAPI_ObjectWrap_inst::GetMembers(env, baseMembers, baseStaticMembers);
  members.insert(baseMembers.begin(), baseMembers.end());
  staticMembers.insert(staticMembers.begin(), staticMembers.end());
  
  /* register wrapper functions */
  // jsnapi_register_member_function
  members.erase("getStartDate");
  members.insert({
    "getStartDate",
      _exports_TimepointInterval_templ::InstanceMethod("getStartDate",
        &_exports_TimepointInterval_templ::_wrap_TimepointInterval_getStartDate,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("getEndDate");
  members.insert({
    "getEndDate",
      _exports_TimepointInterval_templ::InstanceMethod("getEndDate",
        &_exports_TimepointInterval_templ::_wrap_TimepointInterval_getEndDate,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("isEmpty");
  members.insert({
    "isEmpty",
      _exports_TimepointInterval_templ::InstanceMethod("isEmpty",
        &_exports_TimepointInterval_templ::_wrap_TimepointInterval_isEmpty,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("isInsideInterval");
  members.insert({
    "isInsideInterval",
      _exports_TimepointInterval_templ::InstanceMethod("isInsideInterval",
        &_exports_TimepointInterval_templ::_wrap_TimepointInterval__wrap_TimepointInterval_isInsideInterval,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  
  /* add static class functions and variables */
  
  
#ifndef NAPI_CPP_EXCEPTIONS
  goto fail;
fail:
  return;
#endif
}

