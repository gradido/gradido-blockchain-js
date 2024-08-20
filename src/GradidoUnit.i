/* GradidoUnit.i */
/*%module gradido*/

%ignore GradidoUnit::operator=;

%exception {
    try {
        $function
    } catch (const FixedPointedArithmetikOverflowException& e) {
        SWIG_exception(SWIG_RuntimeError, e.getFullString().data());
    } catch (const std::exception& e) {
        SWIG_exception(SWIG_RuntimeError, e.what());
    }
}

%{
#include "gradido_blockchain/GradidoUnit.h"
%}

/* TODO: specifiy that is only for GradidoUnit */
%rename(value) operator double;
%rename(calculateDecayDirect) GradidoUnit::calculateDecay(int64_t gradidoCent, int64_t seconds);
%ignore operator std::string;
%ignore GradidoUnit::GradidoUnit(int64_t gddCent);

%ignore FixedPointedArithmetikOverflowException;
%include "gradido_blockchain/GradidoUnit.h"



