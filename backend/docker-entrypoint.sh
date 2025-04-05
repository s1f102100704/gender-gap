#!/bin/bash
set -e

# 明示的に RAILS_ENV を設定（他プロセスにも反映される）
export RAILS_ENV=production

# PIDファイルが残っていたら削除
rm -f tmp/pids/server.pid

# DBが使えるようになるまで待つ
echo "Waiting for database to be ready..."
until bundle exec rails db:prepare; do
  echo "Database unavailable, retrying in 2s..."
  sleep 2
done

echo "✅ Database ready. Starting server..."

# RAILS_ENV を維持したまま CMD 実行
exec "$@"
