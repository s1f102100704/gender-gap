class ApplicationController < ActionController::API
    def render_json_response(data, status: :ok)
        render json: { data:data , status: status }
    end
    def render_success(data = {}, status: :ok)
      render json: { status: 'success' }.merge(data), status: status
    end
  
    # エラー時のレスポンス
    def render_error(message, status: :unprocessable_entity)
      render json: { status: 'error', message: message }, status: status
    end
end

