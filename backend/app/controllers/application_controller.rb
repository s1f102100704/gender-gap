class ApplicationController < ActionController::API
  before_action :set_current_user


  def render_json_response(data, status: :ok)
    render json: { data:data , status: status }
  end
  def render_success(data = {}, status: :ok)
    render json: { status: 'success' }.merge(data), status: status
  end
  
  def render_error(message, status: :unprocessable_entity)
    render json: { status: 'error', message: message }, status: status
  end
  private
  
  def hashed_ip(ip)
    salt = 'kankyohensu' +Date.today.to_s  # 環境変数から取得
    Digest::SHA256.hexdigest(salt + ip)
  end

  def set_current_user
    ip = request.remote_ip
    hashed_ip = hashed_ip(ip)
    @current_user = User.find_or_create_by(ip_address: hashed_ip)
  end
end

