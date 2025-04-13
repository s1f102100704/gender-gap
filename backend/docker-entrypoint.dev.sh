#!/bin/bash
set -e
export RAILS_ENV=development
# PIDファイルが残っていたら削除
rm -f tmp/pids/server.pid

# DBが使えるようになるまで待つ

echo "✅ Database ready. Starting server..."
exec "$@"