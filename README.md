# gradido-blockchain-js
Gradido Blockchain c++ lib as nodejs module


# Durations from library always in seconds!

# Dependencies
- nodejs
- npm

## Build
- cmake
git submodules, download with
```bash
git submodule update --init --recursive
```
### Windows
Look at https://github.com/cmake-js/cmake-js for more information
```bash
npm install -g node-gyp
node-gyp install 18.20.7
```

## Generate new swig files
Need swig-jse from https://github.com/mmomtchev/swig 
is a fork of swig specialized for using native addon with TypeScript, exporting TypeScript types


