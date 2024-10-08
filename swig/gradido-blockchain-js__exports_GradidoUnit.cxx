/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG JSE (https://www.swig.org).
 * Version 5.0.3
 *
 * Do not make changes to this file unless you know what you are doing - modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

#include "swig/gradido-blockchain-js.h"

/* Class: GradidoUnit (_exports_GradidoUnit) */
// jsnapi_getclass
Napi::Function _exports_GradidoUnit_inst::GetClass(Napi::Env env) {
  std::map<std::string, _exports_GradidoUnit_templ::PropertyDescriptor> members, staticMembers;
  GetMembers(env, members, staticMembers);
  
  std::vector<_exports_GradidoUnit_inst::PropertyDescriptor> symbolTable;
  for (auto it = members.begin(); it != members.end(); it++)
  symbolTable.push_back(it->second);
  for (auto it = staticMembers.begin(); it != staticMembers.end(); it++)
  symbolTable.push_back(it->second);
  
  return Napi::ObjectWrap<_exports_GradidoUnit_inst>::DefineClass(env, "GradidoUnit", symbolTable);
}

void _exports_GradidoUnit_inst::GetMembers(
  Napi::Env env,
  std::map<std::string, _exports_GradidoUnit_templ::PropertyDescriptor> &members,
  std::map<std::string, _exports_GradidoUnit_templ::PropertyDescriptor> &staticMembers
  ) {
  std::map<std::string, SWIG_NAPI_ObjectWrap_templ<SWIG_NAPI_ObjectWrap_inst>::PropertyDescriptor> baseMembers, baseStaticMembers;
  SWIG_NAPI_ObjectWrap_inst::GetMembers(env, baseMembers, baseStaticMembers);
  members.insert(baseMembers.begin(), baseMembers.end());
  staticMembers.insert(staticMembers.begin(), staticMembers.end());
  
  /* register wrapper functions */
  // jsnapi_register_member_function
  members.erase("toString");
  members.insert({
    "toString",
      _exports_GradidoUnit_templ::InstanceMethod("toString",
        &_exports_GradidoUnit_templ::_wrap_GradidoUnit_toString,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("getGradidoCent");
  members.insert({
    "getGradidoCent",
      _exports_GradidoUnit_templ::InstanceMethod("getGradidoCent",
        &_exports_GradidoUnit_templ::_wrap_GradidoUnit_getGradidoCent,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("value");
  members.insert({
    "value",
      _exports_GradidoUnit_templ::InstanceMethod("value",
        &_exports_GradidoUnit_templ::_wrap_GradidoUnit_value,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("add");
  members.insert({
    "add",
      _exports_GradidoUnit_templ::InstanceMethod("add",
        &_exports_GradidoUnit_templ::_wrap_GradidoUnit_add,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("sub");
  members.insert({
    "sub",
      _exports_GradidoUnit_templ::InstanceMethod("sub",
        &_exports_GradidoUnit_templ::_wrap_GradidoUnit_sub,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("mul");
  members.insert({
    "mul",
      _exports_GradidoUnit_templ::InstanceMethod("mul",
        &_exports_GradidoUnit_templ::_wrap_GradidoUnit_mul,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("plus");
  members.insert({
    "plus",
      _exports_GradidoUnit_templ::InstanceMethod("plus",
        &_exports_GradidoUnit_templ::_wrap_GradidoUnit_plus,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("minus");
  members.insert({
    "minus",
      _exports_GradidoUnit_templ::InstanceMethod("minus",
        &_exports_GradidoUnit_templ::_wrap_GradidoUnit_minus,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("times");
  members.insert({
    "times",
      _exports_GradidoUnit_templ::InstanceMethod("times",
        &_exports_GradidoUnit_templ::_wrap_GradidoUnit_times,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("gt");
  members.insert({
    "gt",
      _exports_GradidoUnit_templ::InstanceMethod("gt",
        &_exports_GradidoUnit_templ::_wrap_GradidoUnit_gt,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("gte");
  members.insert({
    "gte",
      _exports_GradidoUnit_templ::InstanceMethod("gte",
        &_exports_GradidoUnit_templ::_wrap_GradidoUnit_gte,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("lt");
  members.insert({
    "lt",
      _exports_GradidoUnit_templ::InstanceMethod("lt",
        &_exports_GradidoUnit_templ::_wrap_GradidoUnit_lt,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("lte");
  members.insert({
    "lte",
      _exports_GradidoUnit_templ::InstanceMethod("lte",
        &_exports_GradidoUnit_templ::_wrap_GradidoUnit_lte,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("equal");
  members.insert({
    "equal",
      _exports_GradidoUnit_templ::InstanceMethod("equal",
        &_exports_GradidoUnit_templ::_wrap_GradidoUnit_equal,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("notEqual");
  members.insert({
    "notEqual",
      _exports_GradidoUnit_templ::InstanceMethod("notEqual",
        &_exports_GradidoUnit_templ::_wrap_GradidoUnit_notEqual,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("calculateCompoundInterest");
  members.insert({
    "calculateCompoundInterest",
      _exports_GradidoUnit_templ::InstanceMethod("calculateCompoundInterest",
        &_exports_GradidoUnit_templ::_wrap_GradidoUnit__wrap_GradidoUnit_calculateCompoundInterest,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("calculateDecay");
  members.insert({
    "calculateDecay",
      _exports_GradidoUnit_templ::InstanceMethod("calculateDecay",
        &_exports_GradidoUnit_templ::_wrap_GradidoUnit__wrap_GradidoUnit_calculateDecay,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  
  /* add static class functions and variables */
  // jsnapi_register_static_function
  staticMembers.erase("calculateDecayDirect");
  staticMembers.insert({
    "calculateDecayDirect",
      StaticMethod("calculateDecayDirect",
        &_exports_GradidoUnit_templ::_wrap_GradidoUnit_calculateDecayDirect,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_static_function
  staticMembers.erase("calculateCompoundInterestDirect");
  staticMembers.insert({
    "calculateCompoundInterestDirect",
      StaticMethod("calculateCompoundInterestDirect",
        &_exports_GradidoUnit_templ::_wrap_GradidoUnit_calculateCompoundInterestDirect,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_static_function
  staticMembers.erase("calculateDecayDurationSeconds");
  staticMembers.insert({
    "calculateDecayDurationSeconds",
      StaticMethod("calculateDecayDurationSeconds",
        &_exports_GradidoUnit_templ::_wrap_GradidoUnit_calculateDecayDurationSeconds,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_static_function
  staticMembers.erase("zero");
  staticMembers.insert({
    "zero",
      StaticMethod("zero",
        &_exports_GradidoUnit_templ::_wrap_GradidoUnit_zero,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  
  
#ifndef NAPI_CPP_EXCEPTIONS
  goto fail;
fail:
  return;
#endif
}

