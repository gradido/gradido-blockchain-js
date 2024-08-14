
%exception {
    try {
        $function
    } catch (const Ed25519SignException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const Ed25519VerifyException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const Ed25519DeriveException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const Ed25519InvalidKeyException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const Ed25519MissingKeyException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const ED25519InvalidPrivateKeyForPublicKey& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}

%shared_ptr(KeyPairEd25519)
%shared_ptr(KeyPairEd25519Ex)
%ignore Ed25519SignException;
%ignore Ed25519VerifyException;
%ignore Ed25519DeriveException;
%ignore Ed25519InvalidKeyException;
%ignore Ed25519MissingKeyException;
%ignore ED25519InvalidPrivateKeyForPublicKey;
%ignore KeyPairEd25519::isTheSame(const unsigned char* pubkey) const;
%rename("$ignore") KeyPairEd25519::operator==(const unsigned char* b) const;
%ignore KeyPairEd25519::operator== (const unsigned char* b) const;
%rename("$ignore") KeyPairEd25519::operator!=(const unsigned char* b) const;
%ignore KeyPairEd25519::operator!= (const unsigned char* b) const;
%typemap(ts) Ed25519DerivationType "Ed25519DerivationType";
%typemap(ts) std::shared_ptr<KeyPairEd25519Ex> "KeyPairEd25519Ex";

%typemap(ts) (const unsigned char* message, size_t messageSize) "Uint8Array";
%typemap(in) (const unsigned char* message, size_t messageSize) {
  if (!info[1].IsTypedArray()) {
    SWIG_exception_fail(SWIG_TypeError, "Expected a Uint8Array as input");
  }
  
  Napi::Uint8Array array = info[1].As<Napi::Uint8Array>();
  $1 = array.Data();  
  $2 = array.ByteLength();
}


%{
#include "gradido_blockchain/crypto/KeyPairEd25519.h"
#include "gradido_blockchain/crypto/KeyPairEd25519Ex.h"
%}

%include "gradido_blockchain/crypto/KeyPairEd25519.h"
%include "gradido_blockchain/crypto/KeyPairEd25519Ex.h"