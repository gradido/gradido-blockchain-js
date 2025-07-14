%include "arraybuffer.i"
%rename(MemoryBlock) memory::Block;
%rename(MemoryBlockPtr) memory::BlockPtrWrapper;

namespace memory {
  %ignore Block::Block(size_t size);
  %ignore Block::Block(const std::vector<unsigned char>& data);
  %ignore Block::Block(std::span<std::byte> data);
  %ignore Block::data();
  %ignore Block::span() const;
  %ignore Block::operator uint8_t*();
  %ignore Block::operator const uint8_t* () const;
  %ignore Block::operator[];
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
  %ignore BlockPtrWrapper::operator ConstBlockPtr;
  %ignore BlockPtrWrapper::BlockPtrWrapper();
  %ignore BlockPtrWrapper::BlockPtrWrapper(const ConstBlockPtr& block);
  %ignore BlockPtrWrapper::BlockPtrWrapper(const BlockPtrWrapper& block);
}

%extend memory::Block {
  static memory::BlockPtrWrapper createPtr(const memory::Block& block) {
    return memory::BlockPtrWrapper(block);
  }
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
// #include "gradido_blockchain/memory/Block.h"
#include "memory/BlockPtrWrapper.h"

%}

%typemap(ts) const memory::Block& "MemoryBlock"
%typemap(ts) const memory::BlockPtrWrapper& "MemoryBlockPtr"
%typemap(ts) memory::Block const "MemoryBlock"
%typemap(ts) std::vector<memory::BlockPtrWrapper> "MemoryBlocks";
%typemap(ts) const std::vector<memory::BlockPtrWrapper>& "MemoryBlocks";
%typemap(ts) std::vector<memory::ConstBlockPtr> "MemoryBlocks";
%typemap(ts) const std::vector<memory::ConstBlockPtr>& "MemoryBlocks";
%template(MemoryBlocks) std::vector<memory::BlockPtrWrapper>;

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

%typemap(in) memory::ConstBlockPtr {
  void* argp = nullptr;
  int res = SWIG_ConvertPtr($input, &argp, SWIGTYPE_p_memory__BlockPtrWrapper, 0);
  if (!SWIG_IsOK(res)) {
    SWIG_exception_fail(SWIG_ArgError(res), "Expected BlockPtrWrapper");
  }
  if (argp) {
    memory::BlockPtrWrapper* wrapper = reinterpret_cast<memory::BlockPtrWrapper*>(argp);
    $1 = *wrapper;
  } else {
    $1 = nullptr;
  }
}
// swig generate direct setter and getter always with pointer
%typemap(in) memory::ConstBlockPtr* {
  void* argp = nullptr;
  int res = SWIG_ConvertPtr($input, &argp, SWIGTYPE_p_memory__BlockPtrWrapper, 0);
  if (!SWIG_IsOK(res)) {
    SWIG_exception_fail(SWIG_ArgError(res), "Expected BlockPtrWrapper");
  }
  if (argp) {
    memory::BlockPtrWrapper* wrapper = reinterpret_cast<memory::BlockPtrWrapper*>(argp);
    $1 = &wrapper->mBlock;
  } else {
    $1 = nullptr;
  }
}

%typemap(out) memory::ConstBlockPtr {
  $result = SWIG_NewPointerObj((new memory::BlockPtrWrapper($1)), SWIGTYPE_p_memory__BlockPtrWrapper, SWIG_POINTER_OWN |  0 );
}

%typemap(out) memory::ConstBlockPtr* {
  $result = SWIG_NewPointerObj((new memory::BlockPtrWrapper(*$1)), SWIGTYPE_p_memory__BlockPtrWrapper, SWIG_POINTER_OWN |  0 );
}

%typemap(ts) const uint8_t* "Buffer";
%typemap(out) const uint8_t*  {
  $result = Napi::Buffer<uint8_t>::Copy(info.Env(), arg1->data(), arg1->size());
}

// define typemaps for returning actually null if memoryBlock is empty
%typemap(ts) memory::BlockPtrWrapper "MemoryBlockPtr"
%typemap(ts) memory::ConstBlockPtr "MemoryBlockPtr|null"

%include "gradido_blockchain/memory/Block.h"
%include "memory/BlockPtrWrapper.h"

