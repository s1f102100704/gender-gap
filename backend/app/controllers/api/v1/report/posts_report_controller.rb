module Api
  module V1
    module Report
      class PostsReportController < ApplicationController

        def index
          posts = Post.reported
          render_json_response(posts)
        end
  
        def create
          report = ::Report.create_by_params(report_params)
          render json: { message: "通報を受け付けました" }, status: :created
        end

        private

        def report_params
          params.require(:report).permit(:post_id, :reason_code, :comment)
        end
      end
    end
  end
end