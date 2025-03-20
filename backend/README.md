posgre接続

docker exec -it gender-gap-db psql -U postgres


migrationのやり方

cd backend

docker exec -it rails_api bash

bundle exec rails db:migrate