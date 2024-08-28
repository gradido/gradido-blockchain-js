%exception {
    try {
        $function
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}

%ignore TimepointInterval::MonthYearIterator;
%ignore TimepointInterval::begin();
%ignore TimepointInterval::end();

%{
  #include "gradido_blockchain/lib/TimepointInterval.h"
%}

%include "gradido_blockchain/lib/TimepointInterval.h"