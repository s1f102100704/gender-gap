class ApplicationController < ActionController::API
    def render_json_response(data, status: :ok)
        render json: { data:data , status: status }
    end
    def render_json_thread_title(thread_title,status:ok)
        render json: {threadData:thread_title,status:ok}
    end
end
