%module crypto

%exception {
    try {
        $function
    } catch (const MissingEncryptionException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const EncryptionException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const DecryptionException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const EncryptionKeyException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const SecretKeyCryptographyException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}

%shared_ptr(SecretKeyCryptography)
%rename ("$ignore", fullname=1) SecretKeyCryptography::decrypt(const std::vector<unsigned char>& encryptedMessage) const;
%rename ("$ignore", fullname=1) SecretKeyCryptography::decrypt(const unsigned char* encryptedMessage, size_t encryptedMessageSize) const;

%{
using namespace gradido;
#include "gradido_blockchain/crypto/SecretKeyCryptography.h"
%}

%ignore SecretKeyCryptographyException;
%ignore MissingEncryptionException;
%ignore EncryptionException;
%ignore DecryptionException;
%ignore EncryptionKeyException;

%include "gradido_blockchain/crypto/SecretKeyCryptography.h"


