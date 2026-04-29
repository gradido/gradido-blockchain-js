%exception {
    try {
        $function
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}

%{
  #include "gradido_blockchain/lib/MonotonicTimer.h"
%}

%include "gradido_blockchain/lib/MonotonicTimer.h"