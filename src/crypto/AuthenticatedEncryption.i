
%exception {
    try {
        $function
    } catch (const AuthenticatedEncryptionException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const AuthenticatedDecryptionException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const AuthenticatedKeyTransformationException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const AuthenticatedPrepareException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}

%ignore AuthenticatedEncryptionException;
%ignore AuthenticatedDecryptionException;
%ignore AuthenticatedKeyTransformationException;
%ignore AuthenticatedPrepareException;
%ignore AuthenticatedEncryption::AuthenticatedEncryption(const std::array<unsigned char, crypto_scalarmult_curve25519_BYTES>& pubkeyx25519);

%{
#include "gradido_blockchain/crypto/AuthenticatedEncryption.h"
%}

%include "gradido_blockchain/crypto/AuthenticatedEncryption.h"
