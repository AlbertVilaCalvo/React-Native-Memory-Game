#!/usr/bin/env bash

set -e

COMMAND=$1

usage() {
  echo "Usage: $0 <command>"
  echo
  echo "Commands:"
  echo "  install   Install dependencies (npm, ruby gems and pods)"
  echo "  clean     Clean the project (node_modules, build, vendor, Pods...)"
}

install_dependencies() {
  echo "Installing npm dependencies..."
  npm install
  echo "Installing ruby gems..."
  bundle install
  echo "Installing pods..."
  (cd ios && bundle exec pod install)
  echo "Dependencies installed successfully."
  echo "To run the project, use 'npm run android' or 'npm run ios'."
}

clean_project() {
  echo "Cleaning project..."
  rm -rf node_modules
  rm -rf android/build
  rm -rf android/app/build
  rm -rf android/app/.cxx
  rm -rf vendor
  rm -rf ios/build
  rm -rf ios/Pods
  echo "Project cleaned."
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
