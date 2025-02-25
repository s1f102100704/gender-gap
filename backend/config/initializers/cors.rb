Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins '*' # 本番では'http://frontend.example.com'に変更
      resource '*', headers: :any, methods: [:get, :post, :put, :delete, :options]
    end
  end