class Api::AdminsController < ApplicationController
  def login
    admin = Admin.find_by(email: params[:email])
    if admin&.authenticate(params[:password])
      token = JsonWebToken.encode(admin_id: admin.id)
      render json: { token: token }, status: :ok
    else
      render json: { error: 'Invalid credentials' }, status: :unauthorized
    end
  end

  def show
    token = request.headers['Authorization']&.split(' ')&.last
    decoded_token = JsonWebToken.decode(token)

    if decoded_token && (admin = Admin.find_by(id: decoded_token[:admin_id]))
      render json: { email: admin.email }, status: :ok
    else
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end
end