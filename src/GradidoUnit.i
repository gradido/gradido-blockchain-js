/* GradidoUnit.i */
/*%module gradido*/

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
%ignore operator std::string;

%ignore FixedPointedArithmetikOverflowException;
%include "gradido_blockchain/GradidoUnit.h"



