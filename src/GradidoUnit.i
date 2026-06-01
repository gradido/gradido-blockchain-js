/* GradidoUnit.i */
/*%module gradido*/

%ignore GradidoUnit::operator=;

%exception {
    try {
        $function
    } catch (const FixedPointedArithmetikOverflowException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const InvalidGradidoUnitStringException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}

%typemap(ts) std::optional<GradidoUnit> "GradidoUnit | null";

%{
#include "gradido_blockchain/GradidoUnit.h"
%}

/* TODO: specifiy that is only for GradidoUnit */
%rename(value) operator double;
%ignore operator std::string;
%ignore GradidoUnit::GradidoUnit(int64_t gddCent);

%ignore FixedPointedArithmetikOverflowException;
%ignore InvalidGradidoUnitStringException;
%include "gradido_blockchain/GradidoUnit.h"

%extend GradidoUnit { 
    std::string toJSON(const char* key) 
    { 
        return self->toString(); 
    } 
}
