module Api
  module V1
    module Admin
      class AdminsController < ApplicationController
        def login
          
          admin = ::Admin.find_by(email: params[:email])

          if admin
            auth_result = admin.authenticate(params[:password])

            if auth_result
              token = JsonWebToken.encode(admin_id: admin.id)
              render json: { token: token }, status: :ok
            else
              render json: { error: 'Invalid credentials' }, status: :unauthorized
            end
          else
            render json: { error: 'Invalid credentials' }, status: :unauthorized
          end
        end

        def show
          token = request.headers['Authorization']&.split(' ')&.last

          decoded_token = JsonWebToken.decode(token)

          admin_id = decoded_token[:admin_id] rescue nil

          if admin_id && (admin = ::Admin.find_by(id: admin_id))
            render json: { email: admin.email }, status: :ok
          else
            render json: { error: 'Unauthorized' }, status: :unauthorized
          end
        end
      end
    end
  end
end