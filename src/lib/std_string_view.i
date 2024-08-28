%{
#include <string_view>
%}

// Namespace std
namespace std {

  // Typemaps für std::string_view
  //%typemap(ts) std::string_view "string";
  %typemap(in) std::string_view (std::string tempString) {
    if ($input.IsString()) {
      tempString = $input.ToString();
      $1 = tempString;
    } else {
      SWIG_exception_fail(SWIG_TypeError, "in method '$symname', argument is not a String");
    }
  }

  %typemap(typecheck, precedence=SWIG_TYPECHECK_VOIDPTR) std::string_view {
    $1 = $input.IsString();
  }

  %typemap(out) std::string_view {
    $result =Napi::String::New(info.Env(), std::string($1));
  }

  %typemap(throws) std::string_view {
    SWIG_exception_fail(SWIG_TypeError, "in method '$symname', std_stringview encountered");
  }
}
#ifdef SWIGTYPESCRIPT
%typemap(ts) std::string_view, std::string_view& "string";
#endif
