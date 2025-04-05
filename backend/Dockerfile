ARG RUBY_VERSION=3.4.1
FROM ruby:$RUBY_VERSION-slim as base

WORKDIR /rails

ENV BUNDLE_PATH="/usr/local/bundle"

# Install required packages
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    build-essential git libvips pkg-config \
    nodejs yarn libpq-dev && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Add non-root user
RUN useradd rails --create-home --shell /bin/bash

# Copy Gemfile & install
COPY Gemfile Gemfile.lock ./
RUN bundle config set --local without 'development test' && \
    bundle install --jobs=4 --retry=3

# Copy all app files
COPY . .


RUN mkdir -p tmp/pids log storage db && \
    chown -R rails:rails tmp log storage db

# Entrypoint script
COPY docker-entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/docker-entrypoint.sh

# 非rootユーザーに切り替え
USER rails

# 本番用ポート開放
EXPOSE 3000

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["./bin/rails", "server", "-b", "0.0.0.0"]