#!/usr/bin/env bash

# Exit on error
set -o errexit

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps chromium
