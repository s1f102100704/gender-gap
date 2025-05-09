# app/lib/json_web_token.rb
require 'jwt'

class JsonWebToken
  SECRET_KEY = Rails.application.secrets.secret_key_base || "your_secret_key"

  def self.encode(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, SECRET_KEY)
  end

  def self.decode(token)
    decoded = JWT.decode(token, SECRET_KEY)[0]
    HashWithIndifferentAccess.new(decoded)
  rescue
    nil
  end
end