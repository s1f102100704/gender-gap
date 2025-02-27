#!/bin/bash
set -e

# マイグレーションを実行
bin/rails db:migrate

# データをシード
bin/rails db:seed

# Railsサーバーを起動
exec "$@"
