ARG RUBY_VERSION=3.4.1
FROM ruby:$RUBY_VERSION-slim as base

WORKDIR /rails

# Set development environment
ENV RAILS_ENV="development" \
    BUNDLE_PATH="/usr/local/bundle"

# Install required packages (PostgreSQL client added, SQLite removed)
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    build-essential git libvips pkg-config \
    nodejs yarn libpq-dev && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Add non-root user early
RUN useradd rails --create-home --shell /bin/bash

# Set user before installing gems
USER rails

# Copy Gemfile and install gems as non-root user
COPY --chown=rails:rails Gemfile Gemfile.lock ./
RUN bundle install --jobs=4 --retry=3

# Copy the rest of the application
COPY --chown=rails:rails . .

# Ensure correct ownership for runtime dirs
RUN mkdir -p tmp/pids && \
    chown -R rails:rails tmp log storage db

# Copy entrypoint script
COPY --chown=rails:rails docker-entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/docker-entrypoint.sh

# Expose the application port
EXPOSE 3000

# Set the entrypoint to use the custom script
ENTRYPOINT ["docker-entrypoint.sh"]

# Start the Rails server with Puma
CMD ["./bin/rails", "server", "-b", "0.0.0.0", "-e", "development"]
