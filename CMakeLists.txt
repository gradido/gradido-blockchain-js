cmake_minimum_required(VERSION 3.15)
project(gradido-blockchain-js)
IF(WIN32)
	set(CMAKE_CXX_FLAGS         "/MP /EHsc /std:c++20")
	set(BUILD_SHARED_LIBS ON)
ELSE()
	SET(CMAKE_CXX_FLAGS "-std=c++20" )# -fPIC" )
ENDIF()
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_POSITION_INDEPENDENT_CODE ON)

add_subdirectory(deps/gradido_blockchain)

set(CMAKE_EXPORT_COMPILE_COMMANDS 1)

include_directories(. swig)
if(DEFINED ENV{NVM_DIR})
  include_directories("$ENV{NVM_INC}")
endif()
include_directories(${CMAKE_JS_INC})

# gradido blockchain dependencies
include_directories(
	"deps/gradido_blockchain/dependencies"
	"deps/gradido_blockchain/dependencies/tinf/src/" 
	"deps/gradido_blockchain/dependencies/protopuf/include"
	"deps/gradido_blockchain/dependencies/rapidjson/include"
	"deps/gradido_blockchain/dependencies/furi/code/"
	"deps/gradido_blockchain/dependencies/magic_enum/include"
	"deps/gradido_blockchain/dependencies/cpp-httplib"
	"deps/gradido_blockchain/dependencies/date/include"
	"deps/gradido_blockchain/dependencies/ed25519_bip32_c_interface/include"	
)

#swig_add_library(
 # GradidoUnit
  #LANGUAGE javascript
  #SOURCES src/main.cpp src/GradidoUnit.cpp swig/GradidoUnit.i
#)
#GENERATE_EXPORT_HEADER(GradidoUnit)

FILE(GLOB SWIG_GENERATED_INTERFACE "swig/*.cxx" "swig/*.h")

add_library(${PROJECT_NAME} SHARED ${SWIG_GENERATED_INTERFACE} ${CMAKE_JS_SRC})

# This line will give our library file a .node extension without any "lib" prefix
set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")

# Essential library files to link to a node addon,
# you should add this line in every CMake.js based project.
target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB} GradidoBlockchain sodium)

execute_process(COMMAND node -p "require('node-addon-api').include"
  WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
  OUTPUT_VARIABLE NODE_ADDON_API_DIR
)
string(REPLACE "\n" "" NODE_ADDON_API_DIR ${NODE_ADDON_API_DIR})
string(REPLACE "\"" "" NODE_ADDON_API_DIR ${NODE_ADDON_API_DIR})
target_include_directories(${PROJECT_NAME} PRIVATE ${NODE_ADDON_API_DIR})
add_definitions(-DNAPI_VERSION=7)