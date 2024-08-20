%exception {
    try {
        $function
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}

namespace CryptoConfig {
  %ignore loadCryptoKeys;
  %ignore MissingKeyException;
  %ignore loadMnemonicWordLists;
  %ignore unload;
  %ignore getWordList;
  // no access needed/allowed from nodejs to this crypto globals
  %ignore g_CryptoAppSecret;
  %ignore g_ServerCryptoKey;
  %ignore g_SupportPublicKey;
  %ignore g_Mnemonic_WordLists;
}

%{
#include "gradido_blockchain/crypto/CryptoConfig.h"
%}
%{
// helper for initalizing Crypto Keys
//! \param appSecret app secret as app wide salt for generating encryption key for password encryption
//! \param serverCryptoKey server shorthash, exactly 16 Bytes long, 32 Character in Hex Format, used for shorthash as salt, for example password encryption key hash
static void loadCryptoKeys(memory::BlockPtr cryptoAppSecret, memory::BlockPtr serverCryptoKey) {
  CryptoConfig::g_CryptoAppSecret = cryptoAppSecret;
  if (!serverCryptoKey || serverCryptoKey->size() != crypto_shorthash_KEYBYTES) {
    throw std::runtime_error("crypto.server_key hasn't correct size or isn't valid hex");
  }
  CryptoConfig::g_ServerCryptoKey = serverCryptoKey;
}
%}

static void loadCryptoKeys(memory::BlockPtr cryptoAppSecret, memory::BlockPtr serverCryptoKey);

%init %{
CryptoConfig::loadMnemonicWordLists();
%}


%include "gradido_blockchain/crypto/CryptoConfig.h"