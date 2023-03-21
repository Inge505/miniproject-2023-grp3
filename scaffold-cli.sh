#!/usr/bin/env bash

set -ex

# CORE
yarn nx generate @nrwl/js:library feature --unitTestRunner=jest --directory=cli/core --no-interactive
