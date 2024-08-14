
%exception {
    try {
        $function
    } catch (const SealedBoxes::DecryptException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}

%ignore SealedBoxes::DecryptException;
%rename(SealedBoxEncrypt) SealedBoxes::encrypt(const AuthenticatedEncryption* keys, const std::string& message);
%rename(SealedBoxDecrypt) SealedBoxes::decrypt(const AuthenticatedEncryption* keys, const memory::Block& encryptedMessage);
%rename(SealedBoxDecrypt) SealedBoxes::decrypt(memory::ConstBlockPtr privateKey, const memory::Block& encryptedMessage);

%{
#include "gradido_blockchain/crypto/SealedBoxes.h"
%}

%include "gradido_blockchain/crypto/SealedBoxes.h"
