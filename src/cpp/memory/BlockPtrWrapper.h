#ifndef GRADIDO_BLOCKCHAIN_JS_CPP_MEMORY_BLOCK_PTR_WRAPPER_H
#define GRADIDO_BLOCKCHAIN_JS_CPP_MEMORY_BLOCK_PTR_WRAPPER_H

#include "gradido_blockchain/memory/Block.h"
#include "gradido_blockchain/GradidoBlockchainException.h"
#include "gradido_blockchain/export.h"

namespace memory {
    /**
     * Wrapper class for memory::ConstBlockPtr for using in TypeScript.
     * GradidoBlockchain use sometime const memory::Block& if a function only reads the data directly.
     * GradidoBlockchain use often memory::ConstBlockPtr if a object store a reference to the data.
     * To able to use the interface from TypeScript it is necessary to have both options.
     * So we cannot use shared_ptr from swig here. So swig is (MemoryBlock.i) configured to use BlockPtrWrapper as long 
     * memory::ConstBlockPtr resides in Java Space, as Napi Object.
     * 
     * @author einhornimmond
     * @date 2025-07-13
     */
    class GRADIDOBLOCKCHAIN_EXPORT BlockPtrWrapper {
      public:
        BlockPtrWrapper() : mBlock(std::make_shared<memory::Block>(0)) {}
        BlockPtrWrapper(const Block& block) : mBlock(std::make_shared<memory::Block>(block)) {}
        BlockPtrWrapper(const ConstBlockPtr& block) : mBlock(block) {}
        BlockPtrWrapper(const BlockPtrWrapper& block) : mBlock(block.mBlock) {}
        virtual ~BlockPtrWrapper() {}
        operator ConstBlockPtr () { return mBlock; }

        size_t size() const { return mBlock ? mBlock->size() : 0;}
        bool isNull() const { return !mBlock; }
        const uint8_t* data() const { return mBlock ? mBlock->data() : nullptr; }
        Block get() const { return mBlock ? *mBlock.get() : Block(0);}
        std::string convertToHex() const { return mBlock ? mBlock->convertToHex() : "";}
        std::string convertToBase64() const { return mBlock ? mBlock->convertToBase64() : "";}
        std::string copyAsString() const { return mBlock ? mBlock->copyAsString() : "";}
        bool isEmpty() const { return !mBlock || mBlock->isEmpty();}
        inline bool operator == (const BlockPtrWrapper& b) const;
        inline bool operator == (const Block& b) const;
        inline bool operator != (const BlockPtrWrapper& b) const;
        inline bool operator != (const Block& b) const;
        inline bool operator < (const BlockPtrWrapper& b) const;
        inline bool operator < (const Block& b) const;
      // protected:
        ConstBlockPtr mBlock;
    };
    
    bool BlockPtrWrapper::operator == (const BlockPtrWrapper& b) const { 
      if(!mBlock && !b.mBlock) {
        return true;
      }
      if (!mBlock || !b.mBlock) {
        return false;
      }
      return mBlock->isTheSame(*b.mBlock);
    }
    bool BlockPtrWrapper::operator == (const Block& b) const { 
      if (!mBlock) {
        return false;
      }
      return mBlock->isTheSame(b);
    }
    bool BlockPtrWrapper::operator != (const BlockPtrWrapper& b) const { 
      return !(*this == b);
    }
    bool BlockPtrWrapper::operator != (const Block& b) const { 
      return !(*this == b);
    }
    bool BlockPtrWrapper::operator < (const BlockPtrWrapper& b) const { 
      if (!mBlock || !b.mBlock) {
        throw GradidoNullPointerException("BlockPtrWrapper::operator <", "BlockPtrWrapper", "operator <");
      }
      return get() < b.get();
    }
    bool BlockPtrWrapper::operator < (const Block& b) const { 
      if (!mBlock) {
        throw GradidoNullPointerException("BlockPtrWrapper::operator <", "BlockPtrWrapper", "operator <");
      }
      return get() < b;
    }
}

#endif //GRADIDO_BLOCKCHAIN_JS_CPP_MEMORY_BLOCK_PTR_WRAPPER_H