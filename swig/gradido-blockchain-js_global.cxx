/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG JSE (https://www.swig.org).
 * Version 5.0.3
 *
 * Do not make changes to this file unless you know what you are doing - modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

#include "swig/gradido-blockchain-js.h"


// js_global_function
Napi::Value _wrap_loadCryptoKeys(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();
  Napi::Value jsresult;
  memory::BlockPtr arg1 ;
  memory::BlockPtr arg2 ;
  
  
#ifdef NAPI_CPP_EXCEPTIONS
  try {
#endif
    
    if(static_cast<int>(info.Length()) < 2 || static_cast<int>(info.Length()) > 2) {
      SWIG_Error(SWIG_ERROR, "Illegal number of arguments for _wrap_loadCryptoKeys.");
    }
    
    {
      {
        memory::Block *plain_ptr;
        int res = SWIG_ConvertPtr(info[0], reinterpret_cast<void**>(&plain_ptr), SWIGTYPE_p_memory__Block,  0 );
        if (!SWIG_IsOK(res)) {
          SWIG_exception_fail(SWIG_ArgError(res), "in method '" "loadCryptoKeys" "', argument " "1"" of type '" "memory::Block""'");
        }
        arg1 = std::shared_ptr< memory::Block>(plain_ptr, SWIG_null_deleter());
      }
    }
    {
      {
        memory::Block *plain_ptr;
        int res = SWIG_ConvertPtr(info[1], reinterpret_cast<void**>(&plain_ptr), SWIGTYPE_p_memory__Block,  0 );
        if (!SWIG_IsOK(res)) {
          SWIG_exception_fail(SWIG_ArgError(res), "in method '" "loadCryptoKeys" "', argument " "2"" of type '" "memory::Block""'");
        }
        arg2 = std::shared_ptr< memory::Block>(plain_ptr, SWIG_null_deleter());
      }
    }
    
    
    
    
    
    {
      
    }
    
    
    
    jsresult = env.Undefined();
    
    
    return jsresult;
#ifdef NAPI_CPP_EXCEPTIONS
  } catch (...) {
    std::rethrow_exception(std::current_exception());
  }
#else
  goto fail;
fail:
  
#endif
  return Napi::Value();
}


// js_global_function
Napi::Value _wrap_SealedBoxEncrypt(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();
  Napi::Value jsresult;
  AuthenticatedEncryption *arg1 = (AuthenticatedEncryption *) 0 ;
  std::string *arg2 = 0 ;
  void *argp1 = 0 ;
  int res1 = 0 ;
  int res2 = SWIG_OLDOBJ ;
  SwigValueWrapper< memory::Block > result;
  
  
#ifdef NAPI_CPP_EXCEPTIONS
  try {
#endif
    
    if(static_cast<int>(info.Length()) < 2 || static_cast<int>(info.Length()) > 2) {
      SWIG_Error(SWIG_ERROR, "Illegal number of arguments for _wrap_SealedBoxEncrypt.");
    }
    
    res1 = SWIG_ConvertPtr(info[0], &argp1,SWIGTYPE_p_AuthenticatedEncryption, 0 |  0 );
    if (!SWIG_IsOK(res1)) {
      SWIG_exception_fail(SWIG_ArgError(res1), "in method '" "SealedBoxEncrypt" "', argument " "1"" of type '" "AuthenticatedEncryption const *""'"); 
    }
    arg1 = reinterpret_cast< AuthenticatedEncryption * >(argp1);{
      {
        std::string *ptr = (std::string *)0;
        res2 = SWIG_AsPtr_std_string(info[1], &ptr);
        if (!SWIG_IsOK(res2)) {
          SWIG_exception_fail(SWIG_ArgError(res2), "in method '" "SealedBoxEncrypt" "', argument " "2"" of type '" "std::string const &""'"); 
        }
        if (!ptr) {
          SWIG_exception_fail(SWIG_ValueError, "invalid null reference " "in method '" "SealedBoxEncrypt" "', argument " "2"" of type '" "std::string const &""'"); 
        }
        arg2 = ptr;
      }
    }
    
    
    
    
    
    {
      try {
        result = SealedBoxes::encrypt((AuthenticatedEncryption const *)arg1,(std::string const &)*arg2);
      } catch (const SealedBoxes::DecryptException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
      } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
      }
    }
    
    
    
    jsresult = SWIG_NewPointerObj((new memory::Block(result)), SWIGTYPE_p_memory__Block, SWIG_POINTER_OWN |  0 );
    
    if (SWIG_IsNewObj(res2)) delete arg2;
    
    return jsresult;
#ifdef NAPI_CPP_EXCEPTIONS
  } catch (...) {
    if (SWIG_IsNewObj(res2)) delete arg2;
    
    std::rethrow_exception(std::current_exception());
  }
#else
  goto fail;
fail:
  if (SWIG_IsNewObj(res2)) delete arg2;
  
#endif
  return Napi::Value();
}


// js_global_overloaded_function
Napi::Value _wrap_SealedBoxDecrypt__SWIG_0(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();
  Napi::Value jsresult;
  AuthenticatedEncryption *arg1 = (AuthenticatedEncryption *) 0 ;
  memory::Block *arg2 = 0 ;
  void *argp1 = 0 ;
  int res1 = 0 ;
  void *argp2 = 0 ;
  int res2 = 0 ;
  std::string result;
  
#ifdef NAPI_CPP_EXCEPTIONS
  try {
#endif
    
    res1 = SWIG_ConvertPtr(info[0], &argp1,SWIGTYPE_p_AuthenticatedEncryption, 0 |  0 );
    if (!SWIG_IsOK(res1)) {
      SWIG_exception_fail(SWIG_ArgError(res1), "in method '" "SealedBoxDecrypt" "', argument " "1"" of type '" "AuthenticatedEncryption const *""'"); 
    }
    arg1 = reinterpret_cast< AuthenticatedEncryption * >(argp1);res2 = SWIG_ConvertPtr(info[1], &argp2, SWIGTYPE_p_memory__Block,  0 );
    if (!SWIG_IsOK(res2)) {
      SWIG_exception_fail(SWIG_ArgError(res2), "in method '" "SealedBoxDecrypt" "', argument " "2"" of type '" "memory::Block const &""'"); 
    }
    if (!argp2) {
      SWIG_exception_fail(SWIG_ValueError, "invalid null reference " "in method '" "SealedBoxDecrypt" "', argument " "2"" of type '" "memory::Block const &""'"); 
    }
    arg2 = reinterpret_cast< memory::Block * >(argp2);
    
    
    
    
    {
      try {
        result = SealedBoxes::decrypt((AuthenticatedEncryption const *)arg1,(memory::Block const &)*arg2);
      } catch (const SealedBoxes::DecryptException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
      } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
      }
    }
    
    
    
    jsresult = SWIG_From_std_string  SWIG_NAPI_FROM_CALL_ARGS(static_cast< std::string >(result));
    
    
    return jsresult;
#ifdef NAPI_CPP_EXCEPTIONS
  } catch (...) {
    std::rethrow_exception(std::current_exception());
  }
#else
  goto fail;
fail:
  
#endif
  return Napi::Value();
}


// js_global_overloaded_function
Napi::Value _wrap_SealedBoxDecrypt__SWIG_1(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();
  Napi::Value jsresult;
  memory::ConstBlockPtr arg1 ;
  memory::Block *arg2 = 0 ;
  void *argp2 = 0 ;
  int res2 = 0 ;
  std::string result;
  
#ifdef NAPI_CPP_EXCEPTIONS
  try {
#endif
    
    {
      {
        memory::Block *plain_ptr;
        int res = SWIG_ConvertPtr(info[0], reinterpret_cast<void**>(&plain_ptr), SWIGTYPE_p_memory__Block,  0 );
        if (!SWIG_IsOK(res)) {
          SWIG_exception_fail(SWIG_ArgError(res), "in method '" "SealedBoxDecrypt" "', argument " "1"" of type '" "memory::Block""'");
        }
        arg1 = std::shared_ptr<const memory::Block>(plain_ptr, SWIG_null_deleter());
      }
    }
    res2 = SWIG_ConvertPtr(info[1], &argp2, SWIGTYPE_p_memory__Block,  0 );
    if (!SWIG_IsOK(res2)) {
      SWIG_exception_fail(SWIG_ArgError(res2), "in method '" "SealedBoxDecrypt" "', argument " "2"" of type '" "memory::Block const &""'"); 
    }
    if (!argp2) {
      SWIG_exception_fail(SWIG_ValueError, "invalid null reference " "in method '" "SealedBoxDecrypt" "', argument " "2"" of type '" "memory::Block const &""'"); 
    }
    arg2 = reinterpret_cast< memory::Block * >(argp2);
    
    
    
    
    {
      try {
        result = SealedBoxes::decrypt(SWIG_STD_MOVE(arg1),(memory::Block const &)*arg2);
      } catch (const SealedBoxes::DecryptException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
      } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
      }
    }
    
    
    
    jsresult = SWIG_From_std_string  SWIG_NAPI_FROM_CALL_ARGS(static_cast< std::string >(result));
    
    
    return jsresult;
#ifdef NAPI_CPP_EXCEPTIONS
  } catch (...) {
    std::rethrow_exception(std::current_exception());
  }
#else
  goto fail;
fail:
  
#endif
  return Napi::Value();
}


// js_global_function_dispatcher
Napi::Value _wrap_SealedBoxes__wrap_SealedBoxDecrypt(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();
  Napi::Value jsresult;
  
  // js_function_dispatch_case
  if(static_cast<int>(info.Length()) >= 2 && static_cast<int>(info.Length()) <= 2) {
#ifdef NAPI_CPP_EXCEPTIONS
    bool tryNext = false;
    try {
      jsresult = _wrap_SealedBoxDecrypt__SWIG_0(info);
    } catch (const Napi::TypeError &) {
      tryNext = true;
    } catch (const Napi::Error &e) {
      throw e;
    }
    if (!tryNext)
    return jsresult;
#else
    _wrap_SealedBoxDecrypt__SWIG_0(info);
    if (env.IsExceptionPending()) {
      Napi::Error e = env.GetAndClearPendingException();
      Napi::Value typeErrorValue;
      bool isTypeError;
      Napi::Function typeErrorCons;
      // Yes, this is ugly
      // TODO: Fix this in Node.js when the core team grows up
      NAPI_CHECK_RESULT(env.Global().Get("TypeError"), typeErrorValue);
      typeErrorCons = typeErrorValue.As<Napi::Function>();
      NAPI_CHECK_RESULT(e.Value().InstanceOf(typeErrorCons), isTypeError);
      if (!isTypeError) {
        // This is not the error you are looking for
        e.ThrowAsJavaScriptException();
        SWIG_fail;
      }
    } else {
      return jsresult;
    }
#endif
  }
  
  // js_function_dispatch_case
  if(static_cast<int>(info.Length()) >= 2 && static_cast<int>(info.Length()) <= 2) {
#ifdef NAPI_CPP_EXCEPTIONS
    bool tryNext = false;
    try {
      jsresult = _wrap_SealedBoxDecrypt__SWIG_1(info);
    } catch (const Napi::TypeError &) {
      tryNext = true;
    } catch (const Napi::Error &e) {
      throw e;
    }
    if (!tryNext)
    return jsresult;
#else
    _wrap_SealedBoxDecrypt__SWIG_1(info);
    if (env.IsExceptionPending()) {
      Napi::Error e = env.GetAndClearPendingException();
      Napi::Value typeErrorValue;
      bool isTypeError;
      Napi::Function typeErrorCons;
      // Yes, this is ugly
      // TODO: Fix this in Node.js when the core team grows up
      NAPI_CHECK_RESULT(env.Global().Get("TypeError"), typeErrorValue);
      typeErrorCons = typeErrorValue.As<Napi::Function>();
      NAPI_CHECK_RESULT(e.Value().InstanceOf(typeErrorCons), isTypeError);
      if (!isTypeError) {
        // This is not the error you are looking for
        e.ThrowAsJavaScriptException();
        SWIG_fail;
      }
    } else {
      return jsresult;
    }
#endif
  }
  
  
  SWIG_Error(SWIG_ERROR, "Illegal arguments for function SealedBoxDecrypt.");
  
#ifndef NAPI_CPP_EXCEPTIONS
  goto fail;
fail:
#endif
  return Napi::Value();
}


/* -------- TYPE CONVERSION AND EQUIVALENCE RULES (BEGIN) -------- */

static void *_p_KeyPairEd25519ExTo_p_KeyPairEd25519(void *x, int *SWIGUNUSEDPARM(newmemory)) {
    return (void *)((KeyPairEd25519 *)  ((KeyPairEd25519Ex *) x));
}
static void *_p_DecryptionExceptionTo_p_SecretKeyCryptographyException(void *x, int *SWIGUNUSEDPARM(newmemory)) {
    return (void *)((SecretKeyCryptographyException *)  ((DecryptionException *) x));
}
static void *_p_EncryptionExceptionTo_p_SecretKeyCryptographyException(void *x, int *SWIGUNUSEDPARM(newmemory)) {
    return (void *)((SecretKeyCryptographyException *)  ((EncryptionException *) x));
}
static void *_p_EncryptionKeyExceptionTo_p_SecretKeyCryptographyException(void *x, int *SWIGUNUSEDPARM(newmemory)) {
    return (void *)((SecretKeyCryptographyException *)  ((EncryptionKeyException *) x));
}
static void *_p_MissingEncryptionExceptionTo_p_SecretKeyCryptographyException(void *x, int *SWIGUNUSEDPARM(newmemory)) {
    return (void *)((SecretKeyCryptographyException *)  ((MissingEncryptionException *) x));
}
static void *_p_std__shared_ptrT_KeyPairEd25519Ex_tTo_p_std__shared_ptrT_KeyPairEd25519_t(void *x, int *newmemory) {
    *newmemory = SWIG_CAST_NEW_MEMORY;
    return (void *) new std::shared_ptr< KeyPairEd25519 >(*(std::shared_ptr< KeyPairEd25519Ex > *)x);
}
SWIGINTERN swig_type_info _swigt__p_AuthenticatedEncryption = {"_p_AuthenticatedEncryption", "AuthenticatedEncryption *|p_AuthenticatedEncryption", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_GradidoUnit = {"_p_GradidoUnit", "p_GradidoUnit|GradidoUnit *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_KeyPairEd25519 = {"_p_KeyPairEd25519", "p_KeyPairEd25519|KeyPairEd25519 *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_KeyPairEd25519Ex = {"_p_KeyPairEd25519Ex", "p_KeyPairEd25519Ex|KeyPairEd25519Ex *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_Passphrase = {"_p_Passphrase", "p_Passphrase|Passphrase *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_SecretKeyCryptography = {"_p_SecretKeyCryptography", "p_SecretKeyCryptography|SecretKeyCryptography *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_SecretKeyCryptographyException = {"_p_SecretKeyCryptographyException", "SecretKeyCryptographyException *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_DecryptionException = {"_p_DecryptionException", 0, 0, 0, 0, 0};
SWIGINTERN swig_type_info _swigt__p_EncryptionException = {"_p_EncryptionException", 0, 0, 0, 0, 0};
SWIGINTERN swig_type_info _swigt__p_EncryptionKeyException = {"_p_EncryptionKeyException", 0, 0, 0, 0, 0};
SWIGINTERN swig_type_info _swigt__p_MissingEncryptionException = {"_p_MissingEncryptionException", 0, 0, 0, 0, 0};
SWIGINTERN swig_type_info _swigt__p_char = {"_p_char", "char *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_difference_type = {"_p_difference_type", "difference_type *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_gradido__GradidoTransactionBuilder = {"_p_gradido__GradidoTransactionBuilder", "p_gradido__GradidoTransactionBuilder|gradido::GradidoTransactionBuilder *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_gradido__TransactionBodyBuilder = {"_p_gradido__TransactionBodyBuilder", "p_gradido__TransactionBodyBuilder|gradido::TransactionBodyBuilder *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_gradido__data__CommunityFriendsUpdate = {"_p_gradido__data__CommunityFriendsUpdate", "p_gradido__data__CommunityFriendsUpdate|gradido::data::CommunityFriendsUpdate *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_gradido__data__CommunityRoot = {"_p_gradido__data__CommunityRoot", "p_gradido__data__CommunityRoot|gradido::data::CommunityRoot *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_gradido__data__ConfirmedTransaction = {"_p_gradido__data__ConfirmedTransaction", "p_gradido__data__ConfirmedTransaction|gradido::data::ConfirmedTransaction *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_gradido__data__GradidoCreation = {"_p_gradido__data__GradidoCreation", "p_gradido__data__GradidoCreation|gradido::data::GradidoCreation *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_gradido__data__GradidoDeferredTransfer = {"_p_gradido__data__GradidoDeferredTransfer", "p_gradido__data__GradidoDeferredTransfer|gradido::data::GradidoDeferredTransfer *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_gradido__data__GradidoTransaction = {"_p_gradido__data__GradidoTransaction", "p_gradido__data__GradidoTransaction|gradido::data::GradidoTransaction *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_gradido__data__GradidoTransfer = {"_p_gradido__data__GradidoTransfer", "gradido::data::GradidoTransfer *|p_gradido__data__GradidoTransfer", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_gradido__data__RegisterAddress = {"_p_gradido__data__RegisterAddress", "gradido::data::RegisterAddress *|p_gradido__data__RegisterAddress", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_gradido__data__SignatureMap = {"_p_gradido__data__SignatureMap", "gradido::data::SignatureMap *|p_gradido__data__SignatureMap", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_gradido__data__SignaturePair = {"_p_gradido__data__SignaturePair", "p_gradido__data__SignaturePair|std::vector< gradido::data::SignaturePair >::value_type *|gradido::data::SignaturePair *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_gradido__data__Timestamp = {"_p_gradido__data__Timestamp", "p_gradido__data__Timestamp|gradido::data::Timestamp *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_gradido__data__TimestampSeconds = {"_p_gradido__data__TimestampSeconds", "gradido::data::TimestampSeconds *|p_gradido__data__TimestampSeconds", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_gradido__data__TransactionBody = {"_p_gradido__data__TransactionBody", "gradido::data::TransactionBody *|p_gradido__data__TransactionBody", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_gradido__data__TransferAmount = {"_p_gradido__data__TransferAmount", "gradido::data::TransferAmount *|p_gradido__data__TransferAmount", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_int = {"_p_int", "int32_t *|int_fast16_t *|int_fast32_t *|int_least32_t *|intptr_t *|int *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_long_long = {"_p_long_long", "int64_t *|int_fast64_t *|int_least64_t *|intmax_t *|long long *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_memory__Block = {"_p_memory__Block", "MemoryBin *|p_memory__Block|memory::Block *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_short = {"_p_short", "int16_t *|int_least16_t *|short *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_signed_char = {"_p_signed_char", "int8_t *|int_fast8_t *|int_least8_t *|signed char *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_size_type = {"_p_size_type", "size_type *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_std__arrayT_unsigned_char_crypto_scalarmult_curve25519_BYTES_t = {"_p_std__arrayT_unsigned_char_crypto_scalarmult_curve25519_BYTES_t", "std::array< unsigned char,crypto_scalarmult_curve25519_BYTES > *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_std__chrono__system_clock__duration = {"_p_std__chrono__system_clock__duration", "Duration *|std::chrono::system_clock::duration *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_std__chrono__time_pointT_std__chrono__system_clock_t = {"_p_std__chrono__time_pointT_std__chrono__system_clock_t", "Timepoint *|std::chrono::time_point< std::chrono::system_clock > *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_std__shared_ptrT_KeyPairEd25519_t = {"_p_std__shared_ptrT_KeyPairEd25519_t", "std::shared_ptr< KeyPairEd25519 > *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_std__shared_ptrT_KeyPairEd25519Ex_t = {"_p_std__shared_ptrT_KeyPairEd25519Ex_t", 0, 0, 0, 0, 0};
SWIGINTERN swig_type_info _swigt__p_std__shared_ptrT_Passphrase_t = {"_p_std__shared_ptrT_Passphrase_t", "std::shared_ptr< Passphrase > *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_std__shared_ptrT_SecretKeyCryptography_t = {"_p_std__shared_ptrT_SecretKeyCryptography_t", "std::shared_ptr< SecretKeyCryptography > *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_std__shared_ptrT_gradido__data__CommunityFriendsUpdate_t = {"_p_std__shared_ptrT_gradido__data__CommunityFriendsUpdate_t", "std::shared_ptr< gradido::data::CommunityFriendsUpdate > *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_std__shared_ptrT_gradido__data__CommunityRoot_t = {"_p_std__shared_ptrT_gradido__data__CommunityRoot_t", "std::shared_ptr< gradido::data::CommunityRoot > *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_std__shared_ptrT_gradido__data__ConfirmedTransaction_const_t = {"_p_std__shared_ptrT_gradido__data__ConfirmedTransaction_const_t", "gradido::data::ConstConfirmedTransactionPtr *|std::shared_ptr< gradido::data::ConfirmedTransaction const > *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_std__shared_ptrT_gradido__data__ConfirmedTransaction_t = {"_p_std__shared_ptrT_gradido__data__ConfirmedTransaction_t", "gradido::data::ConfirmedTransactionPtr *|std::shared_ptr< gradido::data::ConfirmedTransaction > *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_std__shared_ptrT_gradido__data__GradidoCreation_t = {"_p_std__shared_ptrT_gradido__data__GradidoCreation_t", "std::shared_ptr< gradido::data::GradidoCreation > *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_std__shared_ptrT_gradido__data__GradidoDeferredTransfer_t = {"_p_std__shared_ptrT_gradido__data__GradidoDeferredTransfer_t", "std::shared_ptr< gradido::data::GradidoDeferredTransfer > *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_std__shared_ptrT_gradido__data__GradidoTransaction_const_t = {"_p_std__shared_ptrT_gradido__data__GradidoTransaction_const_t", "gradido::data::ConstGradidoTransactionPtr *|std::shared_ptr< gradido::data::GradidoTransaction const > *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_std__shared_ptrT_gradido__data__GradidoTransfer_t = {"_p_std__shared_ptrT_gradido__data__GradidoTransfer_t", "std::shared_ptr< gradido::data::GradidoTransfer > *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_std__shared_ptrT_gradido__data__RegisterAddress_t = {"_p_std__shared_ptrT_gradido__data__RegisterAddress_t", "std::shared_ptr< gradido::data::RegisterAddress > *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_std__shared_ptrT_gradido__data__TransactionBody_const_t = {"_p_std__shared_ptrT_gradido__data__TransactionBody_const_t", "gradido::data::ConstTransactionBodyPtr *|std::shared_ptr< gradido::data::TransactionBody const > *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_std__shared_ptrT_memory__Block_const_t = {"_p_std__shared_ptrT_memory__Block_const_t", "memory::ConstBlockPtr *|std::shared_ptr< memory::Block const > *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_std__shared_ptrT_memory__Block_t = {"_p_std__shared_ptrT_memory__Block_t", "memory::BlockPtr *|std::vector< std::shared_ptr< memory::Block > >::value_type *|std::shared_ptr< memory::Block > *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_std__string = {"_p_std__string", "std::string *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_std__vectorT_gradido__data__SignaturePair_t = {"_p_std__vectorT_gradido__data__SignaturePair_t", "std::vector< gradido::data::SignaturePair > *|p_std__vectorT_gradido__data__SignaturePair_t", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_std__vectorT_std__shared_ptrT_memory__Block_const_t_t = {"_p_std__vectorT_std__shared_ptrT_memory__Block_const_t_t", "std::vector< memory::ConstBlockPtr > *|std::vector< std::shared_ptr< memory::Block const > > *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_std__vectorT_std__shared_ptrT_memory__Block_t_t = {"_p_std__vectorT_std__shared_ptrT_memory__Block_t_t", "p_std__vectorT_std__shared_ptrT_memory__Block_t_t|std::vector< std::shared_ptr< memory::Block > > *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_unsigned_char = {"_p_unsigned_char", "uint8_t *|uint_fast8_t *|uint_least8_t *|unsigned char *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_unsigned_int = {"_p_unsigned_int", "uint32_t *|uint_fast16_t *|uint_fast32_t *|uint_least32_t *|uintptr_t *|unsigned int *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_unsigned_long_long = {"_p_unsigned_long_long", "KeyHashed *|uint64_t *|uint_fast64_t *|uint_least64_t *|uintmax_t *|unsigned long long *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_unsigned_short = {"_p_unsigned_short", "uint16_t *|uint_least16_t *|unsigned short *", 0, 0, (void*)0, 0};
SWIGINTERN swig_type_info _swigt__p_value_type = {"_p_value_type", "value_type *", 0, 0, (void*)0, 0};

SWIGINTERN swig_type_info *swig_type_initial[] = {

/* -------- TYPES TABLE (BEGIN) -------- */

  &_swigt__p_AuthenticatedEncryption,
  &_swigt__p_DecryptionException,
  &_swigt__p_EncryptionException,
  &_swigt__p_EncryptionKeyException,
  &_swigt__p_GradidoUnit,
  &_swigt__p_KeyPairEd25519,
  &_swigt__p_KeyPairEd25519Ex,
  &_swigt__p_MissingEncryptionException,
  &_swigt__p_Passphrase,
  &_swigt__p_SecretKeyCryptography,
  &_swigt__p_SecretKeyCryptographyException,
  &_swigt__p_char,
  &_swigt__p_difference_type,
  &_swigt__p_gradido__GradidoTransactionBuilder,
  &_swigt__p_gradido__TransactionBodyBuilder,
  &_swigt__p_gradido__data__CommunityFriendsUpdate,
  &_swigt__p_gradido__data__CommunityRoot,
  &_swigt__p_gradido__data__ConfirmedTransaction,
  &_swigt__p_gradido__data__GradidoCreation,
  &_swigt__p_gradido__data__GradidoDeferredTransfer,
  &_swigt__p_gradido__data__GradidoTransaction,
  &_swigt__p_gradido__data__GradidoTransfer,
  &_swigt__p_gradido__data__RegisterAddress,
  &_swigt__p_gradido__data__SignatureMap,
  &_swigt__p_gradido__data__SignaturePair,
  &_swigt__p_gradido__data__Timestamp,
  &_swigt__p_gradido__data__TimestampSeconds,
  &_swigt__p_gradido__data__TransactionBody,
  &_swigt__p_gradido__data__TransferAmount,
  &_swigt__p_int,
  &_swigt__p_long_long,
  &_swigt__p_memory__Block,
  &_swigt__p_short,
  &_swigt__p_signed_char,
  &_swigt__p_size_type,
  &_swigt__p_std__arrayT_unsigned_char_crypto_scalarmult_curve25519_BYTES_t,
  &_swigt__p_std__chrono__system_clock__duration,
  &_swigt__p_std__chrono__time_pointT_std__chrono__system_clock_t,
  &_swigt__p_std__shared_ptrT_KeyPairEd25519Ex_t,
  &_swigt__p_std__shared_ptrT_KeyPairEd25519_t,
  &_swigt__p_std__shared_ptrT_Passphrase_t,
  &_swigt__p_std__shared_ptrT_SecretKeyCryptography_t,
  &_swigt__p_std__shared_ptrT_gradido__data__CommunityFriendsUpdate_t,
  &_swigt__p_std__shared_ptrT_gradido__data__CommunityRoot_t,
  &_swigt__p_std__shared_ptrT_gradido__data__ConfirmedTransaction_const_t,
  &_swigt__p_std__shared_ptrT_gradido__data__ConfirmedTransaction_t,
  &_swigt__p_std__shared_ptrT_gradido__data__GradidoCreation_t,
  &_swigt__p_std__shared_ptrT_gradido__data__GradidoDeferredTransfer_t,
  &_swigt__p_std__shared_ptrT_gradido__data__GradidoTransaction_const_t,
  &_swigt__p_std__shared_ptrT_gradido__data__GradidoTransfer_t,
  &_swigt__p_std__shared_ptrT_gradido__data__RegisterAddress_t,
  &_swigt__p_std__shared_ptrT_gradido__data__TransactionBody_const_t,
  &_swigt__p_std__shared_ptrT_memory__Block_const_t,
  &_swigt__p_std__shared_ptrT_memory__Block_t,
  &_swigt__p_std__string,
  &_swigt__p_std__vectorT_gradido__data__SignaturePair_t,
  &_swigt__p_std__vectorT_std__shared_ptrT_memory__Block_const_t_t,
  &_swigt__p_std__vectorT_std__shared_ptrT_memory__Block_t_t,
  &_swigt__p_unsigned_char,
  &_swigt__p_unsigned_int,
  &_swigt__p_unsigned_long_long,
  &_swigt__p_unsigned_short,
  &_swigt__p_value_type,
};

SWIGINTERN swig_cast_info _swigc__p_AuthenticatedEncryption[] = {  {&_swigt__p_AuthenticatedEncryption, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_GradidoUnit[] = {  {&_swigt__p_GradidoUnit, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_KeyPairEd25519[] = {  {&_swigt__p_KeyPairEd25519, 0, 0, 0},  {&_swigt__p_KeyPairEd25519Ex, _p_KeyPairEd25519ExTo_p_KeyPairEd25519, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_KeyPairEd25519Ex[] = {  {&_swigt__p_KeyPairEd25519Ex, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_Passphrase[] = {  {&_swigt__p_Passphrase, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_SecretKeyCryptography[] = {  {&_swigt__p_SecretKeyCryptography, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_DecryptionException[] = {{&_swigt__p_DecryptionException, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_EncryptionException[] = {{&_swigt__p_EncryptionException, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_EncryptionKeyException[] = {{&_swigt__p_EncryptionKeyException, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_MissingEncryptionException[] = {{&_swigt__p_MissingEncryptionException, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_SecretKeyCryptographyException[] = {  {&_swigt__p_SecretKeyCryptographyException, 0, 0, 0},  {&_swigt__p_DecryptionException, _p_DecryptionExceptionTo_p_SecretKeyCryptographyException, 0, 0},  {&_swigt__p_EncryptionException, _p_EncryptionExceptionTo_p_SecretKeyCryptographyException, 0, 0},  {&_swigt__p_EncryptionKeyException, _p_EncryptionKeyExceptionTo_p_SecretKeyCryptographyException, 0, 0},  {&_swigt__p_MissingEncryptionException, _p_MissingEncryptionExceptionTo_p_SecretKeyCryptographyException, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_char[] = {  {&_swigt__p_char, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_difference_type[] = {  {&_swigt__p_difference_type, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_gradido__GradidoTransactionBuilder[] = {  {&_swigt__p_gradido__GradidoTransactionBuilder, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_gradido__TransactionBodyBuilder[] = {  {&_swigt__p_gradido__TransactionBodyBuilder, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_gradido__data__CommunityFriendsUpdate[] = {  {&_swigt__p_gradido__data__CommunityFriendsUpdate, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_gradido__data__CommunityRoot[] = {  {&_swigt__p_gradido__data__CommunityRoot, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_gradido__data__ConfirmedTransaction[] = {  {&_swigt__p_gradido__data__ConfirmedTransaction, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_gradido__data__GradidoCreation[] = {  {&_swigt__p_gradido__data__GradidoCreation, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_gradido__data__GradidoDeferredTransfer[] = {  {&_swigt__p_gradido__data__GradidoDeferredTransfer, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_gradido__data__GradidoTransaction[] = {  {&_swigt__p_gradido__data__GradidoTransaction, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_gradido__data__GradidoTransfer[] = {  {&_swigt__p_gradido__data__GradidoTransfer, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_gradido__data__RegisterAddress[] = {  {&_swigt__p_gradido__data__RegisterAddress, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_gradido__data__SignatureMap[] = {  {&_swigt__p_gradido__data__SignatureMap, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_gradido__data__SignaturePair[] = {  {&_swigt__p_gradido__data__SignaturePair, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_gradido__data__Timestamp[] = {  {&_swigt__p_gradido__data__Timestamp, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_gradido__data__TimestampSeconds[] = {  {&_swigt__p_gradido__data__TimestampSeconds, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_gradido__data__TransactionBody[] = {  {&_swigt__p_gradido__data__TransactionBody, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_gradido__data__TransferAmount[] = {  {&_swigt__p_gradido__data__TransferAmount, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_int[] = {  {&_swigt__p_int, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_long_long[] = {  {&_swigt__p_long_long, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_memory__Block[] = {  {&_swigt__p_memory__Block, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_short[] = {  {&_swigt__p_short, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_signed_char[] = {  {&_swigt__p_signed_char, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_size_type[] = {  {&_swigt__p_size_type, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_std__arrayT_unsigned_char_crypto_scalarmult_curve25519_BYTES_t[] = {  {&_swigt__p_std__arrayT_unsigned_char_crypto_scalarmult_curve25519_BYTES_t, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_std__chrono__system_clock__duration[] = {  {&_swigt__p_std__chrono__system_clock__duration, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_std__chrono__time_pointT_std__chrono__system_clock_t[] = {  {&_swigt__p_std__chrono__time_pointT_std__chrono__system_clock_t, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_std__shared_ptrT_KeyPairEd25519Ex_t[] = {{&_swigt__p_std__shared_ptrT_KeyPairEd25519Ex_t, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_std__shared_ptrT_KeyPairEd25519_t[] = {  {&_swigt__p_std__shared_ptrT_KeyPairEd25519_t, 0, 0, 0},  {&_swigt__p_std__shared_ptrT_KeyPairEd25519Ex_t, _p_std__shared_ptrT_KeyPairEd25519Ex_tTo_p_std__shared_ptrT_KeyPairEd25519_t, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_std__shared_ptrT_Passphrase_t[] = {  {&_swigt__p_std__shared_ptrT_Passphrase_t, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_std__shared_ptrT_SecretKeyCryptography_t[] = {  {&_swigt__p_std__shared_ptrT_SecretKeyCryptography_t, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_std__shared_ptrT_gradido__data__CommunityFriendsUpdate_t[] = {  {&_swigt__p_std__shared_ptrT_gradido__data__CommunityFriendsUpdate_t, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_std__shared_ptrT_gradido__data__CommunityRoot_t[] = {  {&_swigt__p_std__shared_ptrT_gradido__data__CommunityRoot_t, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_std__shared_ptrT_gradido__data__ConfirmedTransaction_const_t[] = {  {&_swigt__p_std__shared_ptrT_gradido__data__ConfirmedTransaction_const_t, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_std__shared_ptrT_gradido__data__ConfirmedTransaction_t[] = {  {&_swigt__p_std__shared_ptrT_gradido__data__ConfirmedTransaction_t, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_std__shared_ptrT_gradido__data__GradidoCreation_t[] = {  {&_swigt__p_std__shared_ptrT_gradido__data__GradidoCreation_t, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_std__shared_ptrT_gradido__data__GradidoDeferredTransfer_t[] = {  {&_swigt__p_std__shared_ptrT_gradido__data__GradidoDeferredTransfer_t, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_std__shared_ptrT_gradido__data__GradidoTransaction_const_t[] = {  {&_swigt__p_std__shared_ptrT_gradido__data__GradidoTransaction_const_t, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_std__shared_ptrT_gradido__data__GradidoTransfer_t[] = {  {&_swigt__p_std__shared_ptrT_gradido__data__GradidoTransfer_t, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_std__shared_ptrT_gradido__data__RegisterAddress_t[] = {  {&_swigt__p_std__shared_ptrT_gradido__data__RegisterAddress_t, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_std__shared_ptrT_gradido__data__TransactionBody_const_t[] = {  {&_swigt__p_std__shared_ptrT_gradido__data__TransactionBody_const_t, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_std__shared_ptrT_memory__Block_const_t[] = {  {&_swigt__p_std__shared_ptrT_memory__Block_const_t, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_std__shared_ptrT_memory__Block_t[] = {  {&_swigt__p_std__shared_ptrT_memory__Block_t, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_std__string[] = {  {&_swigt__p_std__string, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_std__vectorT_gradido__data__SignaturePair_t[] = {  {&_swigt__p_std__vectorT_gradido__data__SignaturePair_t, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_std__vectorT_std__shared_ptrT_memory__Block_const_t_t[] = {  {&_swigt__p_std__vectorT_std__shared_ptrT_memory__Block_const_t_t, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_std__vectorT_std__shared_ptrT_memory__Block_t_t[] = {  {&_swigt__p_std__vectorT_std__shared_ptrT_memory__Block_t_t, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_unsigned_char[] = {  {&_swigt__p_unsigned_char, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_unsigned_int[] = {  {&_swigt__p_unsigned_int, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_unsigned_long_long[] = {  {&_swigt__p_unsigned_long_long, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_unsigned_short[] = {  {&_swigt__p_unsigned_short, 0, 0, 0},{0, 0, 0, 0}};
SWIGINTERN swig_cast_info _swigc__p_value_type[] = {  {&_swigt__p_value_type, 0, 0, 0},{0, 0, 0, 0}};

SWIGINTERN swig_cast_info *swig_cast_initial[] = {
  _swigc__p_AuthenticatedEncryption,
  _swigc__p_DecryptionException,
  _swigc__p_EncryptionException,
  _swigc__p_EncryptionKeyException,
  _swigc__p_GradidoUnit,
  _swigc__p_KeyPairEd25519,
  _swigc__p_KeyPairEd25519Ex,
  _swigc__p_MissingEncryptionException,
  _swigc__p_Passphrase,
  _swigc__p_SecretKeyCryptography,
  _swigc__p_SecretKeyCryptographyException,
  _swigc__p_char,
  _swigc__p_difference_type,
  _swigc__p_gradido__GradidoTransactionBuilder,
  _swigc__p_gradido__TransactionBodyBuilder,
  _swigc__p_gradido__data__CommunityFriendsUpdate,
  _swigc__p_gradido__data__CommunityRoot,
  _swigc__p_gradido__data__ConfirmedTransaction,
  _swigc__p_gradido__data__GradidoCreation,
  _swigc__p_gradido__data__GradidoDeferredTransfer,
  _swigc__p_gradido__data__GradidoTransaction,
  _swigc__p_gradido__data__GradidoTransfer,
  _swigc__p_gradido__data__RegisterAddress,
  _swigc__p_gradido__data__SignatureMap,
  _swigc__p_gradido__data__SignaturePair,
  _swigc__p_gradido__data__Timestamp,
  _swigc__p_gradido__data__TimestampSeconds,
  _swigc__p_gradido__data__TransactionBody,
  _swigc__p_gradido__data__TransferAmount,
  _swigc__p_int,
  _swigc__p_long_long,
  _swigc__p_memory__Block,
  _swigc__p_short,
  _swigc__p_signed_char,
  _swigc__p_size_type,
  _swigc__p_std__arrayT_unsigned_char_crypto_scalarmult_curve25519_BYTES_t,
  _swigc__p_std__chrono__system_clock__duration,
  _swigc__p_std__chrono__time_pointT_std__chrono__system_clock_t,
  _swigc__p_std__shared_ptrT_KeyPairEd25519Ex_t,
  _swigc__p_std__shared_ptrT_KeyPairEd25519_t,
  _swigc__p_std__shared_ptrT_Passphrase_t,
  _swigc__p_std__shared_ptrT_SecretKeyCryptography_t,
  _swigc__p_std__shared_ptrT_gradido__data__CommunityFriendsUpdate_t,
  _swigc__p_std__shared_ptrT_gradido__data__CommunityRoot_t,
  _swigc__p_std__shared_ptrT_gradido__data__ConfirmedTransaction_const_t,
  _swigc__p_std__shared_ptrT_gradido__data__ConfirmedTransaction_t,
  _swigc__p_std__shared_ptrT_gradido__data__GradidoCreation_t,
  _swigc__p_std__shared_ptrT_gradido__data__GradidoDeferredTransfer_t,
  _swigc__p_std__shared_ptrT_gradido__data__GradidoTransaction_const_t,
  _swigc__p_std__shared_ptrT_gradido__data__GradidoTransfer_t,
  _swigc__p_std__shared_ptrT_gradido__data__RegisterAddress_t,
  _swigc__p_std__shared_ptrT_gradido__data__TransactionBody_const_t,
  _swigc__p_std__shared_ptrT_memory__Block_const_t,
  _swigc__p_std__shared_ptrT_memory__Block_t,
  _swigc__p_std__string,
  _swigc__p_std__vectorT_gradido__data__SignaturePair_t,
  _swigc__p_std__vectorT_std__shared_ptrT_memory__Block_const_t_t,
  _swigc__p_std__vectorT_std__shared_ptrT_memory__Block_t_t,
  _swigc__p_unsigned_char,
  _swigc__p_unsigned_int,
  _swigc__p_unsigned_long_long,
  _swigc__p_unsigned_short,
  _swigc__p_value_type,
};


/* -------- TYPE CONVERSION AND EQUIVALENCE RULES (END) -------- */

SWIGINTERN swig_type_info *swig_types[64];
SWIGINTERN swig_module_info swig_module = {swig_types, 63, 0, 0, 0, 0};

