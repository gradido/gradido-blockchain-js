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
    auto date = $input.As<Napi::Date>();
    auto duration = std::chrono::milliseconds(static_cast<long long>(date.ValueOf()));
    $1 = std::chrono::time_point<std::chrono::system_clock>(duration);
}

%typemap(in) const Timepoint& {
    if(!$input.IsDate()) {
        SWIG_exception_fail(SWIG_TypeError, "Expected a Date object");
    }
    auto date = $input.As<Napi::Date>();
    auto duration = std::chrono::milliseconds(static_cast<long long>(date.ValueOf()));
    auto timepoint = std::chrono::time_point<std::chrono::system_clock>(duration);
    $1 = &timepoint;
}

// Typemap für Duration -> JavaScript number in seconds
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
    $result = Napi::Number::New(env, seconds);
}

// converting size_t
%typemap(ts) size_t "number";
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
