#!/bin/bash
set -e

# PIDファイルが残っていたら削除
rm -f tmp/pids/server.pid

# DBが使えるようになるまで待つ
echo "Waiting for database to be ready..."
until bin/rails db:migrate; do
  echo "Database unavailable, retrying in 2s..."
  sleep 2
done

echo "✅ Database ready. Starting server..."
exec "$@"