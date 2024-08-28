/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG JSE (https://www.swig.org).
 * Version 5.0.3
 *
 * Do not make changes to this file unless you know what you are doing - modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

#include "swig/gradido-blockchain-js.h"

/* Class: Profiler (_exports_Profiler) */
// jsnapi_getclass
Napi::Function _exports_Profiler_inst::GetClass(Napi::Env env) {
  std::map<std::string, _exports_Profiler_templ::PropertyDescriptor> members, staticMembers;
  GetMembers(env, members, staticMembers);
  
  std::vector<_exports_Profiler_inst::PropertyDescriptor> symbolTable;
  for (auto it = members.begin(); it != members.end(); it++)
  symbolTable.push_back(it->second);
  for (auto it = staticMembers.begin(); it != staticMembers.end(); it++)
  symbolTable.push_back(it->second);
  
  return Napi::ObjectWrap<_exports_Profiler_inst>::DefineClass(env, "Profiler", symbolTable);
}

void _exports_Profiler_inst::GetMembers(
  Napi::Env env,
  std::map<std::string, _exports_Profiler_templ::PropertyDescriptor> &members,
  std::map<std::string, _exports_Profiler_templ::PropertyDescriptor> &staticMembers
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
      _exports_Profiler_templ::InstanceMethod("reset",
        &_exports_Profiler_templ::_wrap_Profiler_reset,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("millis");
  members.insert({
    "millis",
      _exports_Profiler_templ::InstanceMethod("millis",
        &_exports_Profiler_templ::_wrap_Profiler_millis,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("micros");
  members.insert({
    "micros",
      _exports_Profiler_templ::InstanceMethod("micros",
        &_exports_Profiler_templ::_wrap_Profiler_micros,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("nanos");
  members.insert({
    "nanos",
      _exports_Profiler_templ::InstanceMethod("nanos",
        &_exports_Profiler_templ::_wrap_Profiler_nanos,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("seconds");
  members.insert({
    "seconds",
      _exports_Profiler_templ::InstanceMethod("seconds",
        &_exports_Profiler_templ::_wrap_Profiler_seconds,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("string");
  members.insert({
    "string",
      _exports_Profiler_templ::InstanceMethod("string",
        &_exports_Profiler_templ::_wrap_Profiler_string,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  
  /* add static class functions and variables */
  
  
#ifndef NAPI_CPP_EXCEPTIONS
  goto fail;
fail:
  return;
#endif
}

