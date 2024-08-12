%include "arraybuffer.i"
%rename(MemoryBlock) memory::Block;
%shared_ptr(memory::Block)
namespace memory {
  %ignore Block::Block(size_t size);
  %ignore Block::Block(const std::vector<unsigned char>& data);
  %ignore Block::Block(std::span<std::byte> data);
  %ignore Block::Block(const std::string& data);
  %ignore Block::data() const;
  %ignore Block::span() const;
  %ignore Block::operator uint8_t*();
  %ignore Block::operator const uint8_t* () const;
  %ignore Block::data(size_t startIndex);
  %ignore Block::data(size_t startIndex) const;
  %ignore Block::copyAsVector() const;
  %ignore Block::fromHex(const char* hexString, size_t stringSize);
  %ignore Block::fromBase64(const char* base64String, size_t size, int variant);
  %ignore Block::isTheSame(const Block& b) const;
  %ignore Block::Block(const Block& other);
  %ignore Block::Block(Block&& other);
  %ignore Block::operator=;
  %ignore ConstBlockPtrComparator;
  %ignore Block::isTheSame;
}

%exception {
  
}

%{
#include "gradido_blockchain/memory/Block.h"
%}

%template(MemoryBlocks) std::vector<std::shared_ptr<memory::Block>>;

%typemap(ts) std::vector<std::shared_ptr<memory::Block>> "MemoryBlocks";
%typemap(ts) std::vector<memory::ConstBlockPtr> "MemoryBlocks";


// define a typemap to convert uint8array into unsigned char* 
%typemap(ts) (size_t size, const unsigned char* data) "Uint8Array";
%typemap(in) (size_t size, const unsigned char* data) {
  if (!info[1].IsTypedArray()) {
    SWIG_exception_fail(SWIG_TypeError, "Expected a Uint8Array as input");
  }
  
  Napi::Uint8Array array = info[1].As<Napi::Uint8Array>();
  $1 = array.ByteLength();
  $2 = array.Data();  
}

%typemap(ts) uint8_t* "Uint8Array";
%typemap(out) uint8_t* {
  auto jsarray = Napi::Uint8Array::New(info.Env(), arg1->size());
  memcpy(jsarray.Data(), arg1->data(), arg1->size());
  $result = jsarray;
}

%include "gradido_blockchain/memory/Block.h"

