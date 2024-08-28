typedef std::chrono::time_point<std::chrono::system_clock> Timepoint;
typedef std::chrono::system_clock::duration Duration;

// typemaps for converting Timepoint in javascript Date in both directions
%typemap(cstype) Timepoint "Timepoint";
%typemap(ts) Timepoint "Date";
%typemap(ts) const Timepoint& "Date";
%typemap(out) Timepoint {
    double ms = std::chrono::duration_cast<std::chrono::milliseconds>($1.time_since_epoch()).count();
    $result = Napi::Date::New(env, ms);
}

%typemap(in) Timepoint {
    if(!$input.IsDate()) {
        SWIG_exception_fail(SWIG_TypeError, "Expected a Date object");
    }
    $1 = Timepoint(std::chrono::milliseconds(static_cast<uint64_t>($input.As<Napi::Date>().ValueOf())));
}

%typemap(in) const Timepoint& (Timepoint temp) {
    if(!$input.IsDate()) {
        SWIG_exception_fail(SWIG_TypeError, "Expected a Date object");
    }
    temp = Timepoint(std::chrono::milliseconds(static_cast<uint64_t>($input.As<Napi::Date>().ValueOf())));
    $1 = &temp;
}

// Typemap for Duration -> JavaScript number in seconds
%typemap(cstype) Duration "Duration";
%typemap(ts) Duration "number";
%typemap(in) Duration {
    if(!$input.IsNumber()) {
        SWIG_exception_fail(SWIG_TypeError, "Expected a number");
    }
    $1 = std::chrono::duration_cast<std::chrono::seconds>(std::chrono::duration<uint32_t>($input.As<Napi::Number>().Uint32Value()));
}

%typemap(out) Duration {
    double seconds = std::chrono::duration_cast<std::chrono::seconds>($1).count();
    $result = Napi::Number::New(env, std::chrono::duration_cast<std::chrono::seconds>($1).count());
}

// converting size_t
%typemap(ts) size_t "number";
%typemap(cstype) size_t "number";
// Typemap for size_t -> JavaScript Number
%typemap(out) size_t {
    $result = Napi::Number::New(env, static_cast<double>($1));
}

// Typemap for JavaScript Number -> size_t
%typemap(in) size_t {
    if(!$input.IsNumber()) {
        SWIG_exception_fail(SWIG_TypeError, "Expected a number");
    }
    $1 = static_cast<size_t>($input.As<Napi::Number>().Uint32Value());
}

// typemaps for date Month and date Year
%typemap(ts) date::month "number";
%typemap(in) date::month {
    if(!$input.IsNumber()) {
        SWIG_exception_fail(SWIG_TypeError, "Expected a number");
    }
    $1 = date::month($input.As<Napi::Number>().Uint32Value());
}

%typemap(out) date::month {
    $result = Napi::Number::New(env, static_cast<unsigned>($1));
}

// typemaps for date Month and date Year
%typemap(ts) date::year "number";
%typemap(in) date::year {
    if(!$input.IsNumber()) {
        SWIG_exception_fail(SWIG_TypeError, "Expected a number");
    }
    $1 = date::year($input.As<Napi::Number>().Int32Value());
}

%typemap(out) date::year {
    $result = Napi::Number::New(env, static_cast<int>($1));
}