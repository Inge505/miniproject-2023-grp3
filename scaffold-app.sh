#!/usr/bin/env bash

set -ex

# CORE
yarn nx generate @nrwl/js:library feature --unitTestRunner=jest --directory=app/core --no-interactive

# WELCOME
yarn nx generate @nrwl/js:library feature --unitTestRunner=jest --directory=app/welcome --no-interactive
yarn nx generate @nrwl/js:library data-access --unitTestRunner=jest --directory=app/welcome --no-interactive
yarn nx generate @nrwl/js:library util --unitTestRunner=jest --directory=app/welcome --no-interactive

# LOGIN
yarn nx generate @nrwl/js:library feature --unitTestRunner=jest --directory=app/login --no-interactive
yarn nx generate @nrwl/js:library data-access --unitTestRunner=jest --directory=app/login --no-interactive
yarn nx generate @nrwl/js:library util --unitTestRunner=jest --directory=app/login --no-interactive

# REGISTER
yarn nx generate @nrwl/js:library feature --unitTestRunner=jest --directory=app/register --no-interactive
yarn nx generate @nrwl/js:library data-access --unitTestRunner=jest --directory=app/register --no-interactive
yarn nx generate @nrwl/js:library util --unitTestRunner=jest --directory=app/register --no-interactive

# FORGOT
yarn nx generate @nrwl/js:library feature --unitTestRunner=jest --directory=app/forgot --no-interactive
yarn nx generate @nrwl/js:library data-access --unitTestRunner=jest --directory=app/forgot --no-interactive
yarn nx generate @nrwl/js:library util --unitTestRunner=jest --directory=app/forgot --no-interactive

# RESET
yarn nx generate @nrwl/js:library feature --unitTestRunner=jest --directory=app/reset --no-interactive
yarn nx generate @nrwl/js:library data-access --unitTestRunner=jest --directory=app/reset --no-interactive
yarn nx generate @nrwl/js:library util --unitTestRunner=jest --directory=app/reset --no-interactive

# VERIFY
yarn nx generate @nrwl/js:library feature --unitTestRunner=jest --directory=app/verify --no-interactive
yarn nx generate @nrwl/js:library data-access --unitTestRunner=jest --directory=app/verify --no-interactive
yarn nx generate @nrwl/js:library util --unitTestRunner=jest --directory=app/verify --no-interactive

# TOS
yarn nx generate @nrwl/js:library feature --unitTestRunner=jest --directory=app/tos --no-interactive

# PRIVACY
yarn nx generate @nrwl/js:library feature --unitTestRunner=jest --directory=app/privacy --no-interactive

# HOME
yarn nx generate @nrwl/js:library feature --unitTestRunner=jest --directory=app/home --no-interactive

# DASHBOARD
yarn nx generate @nrwl/js:library feature --unitTestRunner=jest --directory=app/dashboard --no-interactive
yarn nx generate @nrwl/js:library data-access --unitTestRunner=jest --directory=app/dashboard --no-interactive
yarn nx generate @nrwl/js:library util --unitTestRunner=jest --directory=app/dashboard --no-interactive

# PROFILE
yarn nx generate @nrwl/js:library feature --unitTestRunner=jest --directory=app/profile --no-interactive
yarn nx generate @nrwl/js:library ui --unitTestRunner=jest --directory=app/profile --no-interactive
yarn nx generate @nrwl/js:library data-access --unitTestRunner=jest --directory=app/profile --no-interactive
yarn nx generate @nrwl/js:library util --unitTestRunner=jest --directory=app/profile --no-interactive

# UPDATES
yarn nx generate @nrwl/js:library feature --unitTestRunner=jest --directory=app/updates --no-interactive
yarn nx generate @nrwl/js:library data-access --unitTestRunner=jest --directory=app/updates --no-interactive
yarn nx generate @nrwl/js:library util --unitTestRunner=jest --directory=app/updates --no-interactive

# ERRORS
yarn nx generate @nrwl/js:library feature --unitTestRunner=jest --directory=app/errors --no-interactive
yarn nx generate @nrwl/js:library data-access --unitTestRunner=jest --directory=app/errors --no-interactive
yarn nx generate @nrwl/js:library util --unitTestRunner=jest --directory=app/errors --no-interactive

# COPYRIGHT
yarn nx generate @nrwl/js:library ui --unitTestRunner=jest --directory=app/copyright --no-interactive

# VERSION
yarn nx generate @nrwl/js:library ui --unitTestRunner=jest --directory=app/version --no-interactive

# AUTH
yarn nx generate @nrwl/js:library feature --unitTestRunner=jest --directory=app/auth --no-interactive
yarn nx generate @nrwl/js:library data-access --unitTestRunner=jest --directory=app/auth --no-interactive
yarn nx generate @nrwl/js:library util --unitTestRunner=jest --directory=app/auth --no-interactive

# USER
yarn nx generate @nrwl/js:library feature --unitTestRunner=jest --directory=app/user --no-interactive
yarn nx generate @nrwl/js:library data-access --unitTestRunner=jest --directory=app/user --no-interactive
yarn nx generate @nrwl/js:library util --unitTestRunner=jest --directory=app/user --no-interactive
