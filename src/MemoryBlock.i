%include "arraybuffer.i"
%rename(MemoryBlock) memory::Block;
%shared_ptr(memory::Block)
namespace memory {
  %ignore Block::Block(size_t size);
  %ignore Block::Block(const std::vector<unsigned char>& data);
  %ignore Block::Block(std::span<std::byte> data);
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
  try {
        $function    
    } catch (const GradidoInvalidHexException& e) {
      SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const GradidoInvalidBase64Exception& e) {
      SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const std::exception& e) {
      SWIG_exception(SWIG_RuntimeError, e.what());
    }
}

%{
#include "gradido_blockchain/memory/Block.h"
%}
/*
%extend memory::Block {
  static memory::BlockPtr empty() {
    return memory::Block(0);
  }
}
*/
%template(MemoryBlocks) std::vector<std::shared_ptr<memory::Block>>;

%typemap(ts) std::vector<std::shared_ptr<memory::Block>> "MemoryBlocks";
%typemap(ts) std::vector<memory::ConstBlockPtr> "MemoryBlocks";

// define a typemap to convert Buffer into unsigned char* 
%typemap(ts) (size_t size, const unsigned char* data) "Buffer";
%typemap(cstype) (size_t size, const unsigned char* data) "Buffer";
%typemap(in) (size_t size, const unsigned char* data) {
  try {
    Napi::Buffer buffer = $input.As<Napi::Buffer<uint8_t>>();
    $1 = buffer.Length();
    $2 = buffer.Data();  
  } catch(Napi::Error& ex) {
    SWIG_exception_fail(SWIG_TypeError, "Expected a Buffer as input");
  } 
}

%typemap(ts) uint8_t* "Buffer";
%typemap(out) uint8_t* {
  $result = Napi::Buffer<uint8_t>::Copy(info.Env(), arg1->data(), arg1->size());
}

// define typemaps for returning actually null if memoryBlock is empty
%typemap(ts) memory::ConstBlockPtr "MemoryBlock|null"
%typemap(ts) memory::BlockPtr "MemoryBlock|null"
%include "gradido_blockchain/memory/Block.h"

