class ApplicationController < ActionController::API
    def render_json_response(data, status: :ok)
        render json: { data: data, status: status }
    end
end
