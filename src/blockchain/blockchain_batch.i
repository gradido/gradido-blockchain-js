%apply unsigned long long { uint64_t }
%include <std_vector.i>
%template(VectorUint64) std::vector<uint64_t>;


%include "gradido_blockchain/blockchain/batch/ThreadingPolicy.h"

%{
#include "gradido_blockchain/blockchain/batch/ThreadingPolicy.h"
#include "gradido_blockchain/blockchain/batch/signaturesVerify.h"
%}
%include "gradido_blockchain/blockchain/batch/signaturesVerify.h"
