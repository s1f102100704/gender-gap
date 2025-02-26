#!/bin/sh
set -e

# 古いサーバーの PID ファイルを削除
rm -f /rails/tmp/pids/server.pid

# 指定されたコマンドを実行
exec "$@"