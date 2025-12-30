
// define a typemap to convert Buffer into unsigned char* 
%typemap(ts) (const uint8_t* data, size_t size) "Buffer";
%typemap(cstype) (const uint8_t* data, size_t size) "Buffer";
%typemap(in) (const uint8_t* data, size_t size) {
  try {
    Napi::Buffer buffer = $input.As<Napi::Buffer<uint8_t>>();
    $1 = buffer.Data();
    $2 = buffer.Length();  
  } catch(Napi::Error& ex) {
    SWIG_exception_fail(SWIG_TypeError, "Expected a Buffer as input");
  } 
}

%include "gradido_blockchain/crypto/SignatureOctet.h"