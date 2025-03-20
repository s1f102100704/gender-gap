module Api
  module V1
    class AdminsController < ApplicationController
      def login
        Rails.logger.info("🔍 Email received: #{params[:email]}")
        
        admin = ::Admin.find_by(email: params[:email])
        Rails.logger.info("🔍 Found Admin: #{admin.inspect}")

        if admin
          auth_result = admin.authenticate(params[:password])
          Rails.logger.info("🔍 Authentication result: #{auth_result.inspect}")

          if auth_result
            token = JsonWebToken.encode(admin_id: admin.id)
            Rails.logger.info("🔐 JWT Generated: #{token}")
            render json: { token: token }, status: :ok
          else
            Rails.logger.warn("❌ Authentication failed: Incorrect password")
            render json: { error: 'Invalid credentials' }, status: :unauthorized
          end
        else
          Rails.logger.warn("❌ Admin not found")
          render json: { error: 'Invalid credentials' }, status: :unauthorized
        end
      end

      def show
  token = request.headers['Authorization']&.split(' ')&.last
  Rails.logger.info("🔐 Received Token: #{token}")

  decoded_token = JsonWebToken.decode(token)
  Rails.logger.info("🔓 Decoded Token: #{decoded_token.inspect}")

  admin_id = decoded_token[:admin_id] rescue nil
  Rails.logger.info("🆔 Extracted admin_id: #{admin_id.inspect}")

  if admin_id && (admin = ::Admin.find_by(id: admin_id))
    Rails.logger.info("✅ Admin Found: #{admin.inspect}")
    render json: { email: admin.email }, status: :ok
  else
    Rails.logger.warn("❌ Unauthorized Access - Admin not found")
    render json: { error: 'Unauthorized' }, status: :unauthorized
  end
end
    end
  end
end