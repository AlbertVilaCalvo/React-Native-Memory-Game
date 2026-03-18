#!/usr/bin/env bash

set -euo pipefail

# Colors
GREEN='\033[0;32m'
YELLOW='\033[0;93m'
NC='\033[0m' # No Color

# Log a message with a prefix and color.
#
# Flags:
#   -b, --before              Print a newline before the message.
#   -a, --after               Print a newline after the message.
#   -ba, -ab, --before-after  Print a newline both before and after the message.
#
# Usage:
#   log "Message"
#   log "Message" -a
#   log -b "Message"
#   log "Message" --before-after
#
# Flags can be placed anywhere in the argument list.
log() {
  local before=false
  local after=false
  local message_parts=()

  while [[ $# -gt 0 ]]; do
    case "$1" in
      -b|--before)
        before=true
        shift
        ;;
      -a|--after)
        after=true
        shift
        ;;
      -ba|-ab|--before-after)
        before=true
        after=true
        shift
        ;;
      --)
        shift
        break
        ;;
      *)
        message_parts+=("$1")
        shift
        ;;
    esac
  done

  if [ "$before" = true ]; then
    echo
  fi

  echo -e "${YELLOW}==>${NC} ${GREEN}${message_parts[*]}${NC}"

  if [ "$after" = true ]; then
    echo
  fi
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
  log "npm install" -a
  npm install

  log "Installing ruby gems..." -b
  log "bundle install" -a
  bundle install

  log "Installing pods..." -b
  log "cd ios && bundle exec pod install" -a
  (cd ios && bundle exec pod install)

  log "Dependencies installed successfully." -b
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
