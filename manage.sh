#!/usr/bin/env bash

set -euo pipefail

# Colors
GREEN='\033[0;32m'
YELLOW='\033[0;93m'
NC='\033[0m' # No Color

log() {
  echo -e "\n${YELLOW}==>${NC} ${GREEN}$1${NC}\n"
}

COMMAND="${1:-}"

usage() {
  echo "Usage: $0 <command>"
  echo
  echo "Commands:"
  echo "  install   Install dependencies (npm, ruby gems and pods)"
  echo "  clean     Clean the project (node_modules, build, vendor, Pods...)"
}

install_dependencies() {
  log "Installing npm dependencies..."
  npm install
  log "Installing ruby gems..."
  bundle install
  log "Installing pods..."
  (cd ios && bundle exec pod install)
  log "Dependencies installed successfully."
  log "To run the project, use 'npm run android' or 'npm run ios'."
}

clean_project() {
  log "Cleaning project..."
  rm -rf node_modules
  rm -rf android/build
  rm -rf android/app/build
  rm -rf android/app/.cxx
  rm -rf vendor
  rm -rf ios/build
  rm -rf ios/Pods
  log "Project cleaned."
}

if [ -z "$COMMAND" ]; then
    usage
    exit 1
fi

case "$COMMAND" in
  install)
    install_dependencies
    ;;
  clean)
    clean_project
    ;;
  *)
    usage
    exit 1
    ;;
esac
