
%exception {
    try {
        $function
    } catch (const PassphraseEmptyWordSourceException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}
%shared_ptr(Passphrase)
%shared_ptr(KeyPairEd25519)
%ignore PassphraseEmptyWordSourceException;
%ignore Passphrase::create;
%ignore Passphrase::getWordIndices;
%rename(detectMnemonicWithKeyPair) Passphrase::detectMnemonic(const std::string& passphrase, const KeyPairEd25519* userKeyPair);

%typemap(ts) const KeyPairEd25519* "KeyPairEd25519";

%{
#include "gradido_blockchain/crypto/Passphrase.h"
%}

%include "gradido_blockchain/crypto/Passphrase.h"