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
%ignore TimepointInterval::TimepointInterval(const date::year_month& startDate, const date::year_month& endDate);

%{
  #include "gradido_blockchain/lib/TimepointInterval.h"
%}

%include "gradido_blockchain/lib/TimepointInterval.h"
%include "gradido_blockchain/serialization/toJsonString.h"

%extend TimepointInterval {
    std::string toJson(bool pretty = false) const {
        return serialization::toJsonString(*self, pretty);
    }
}