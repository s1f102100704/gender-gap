module Api
  module V1
    module Admin
      class PostsReportController < ApplicationController
        def index
          posts = Post.reported
          render json: { data: posts }, status: :ok
        end
      end
    end
  end
end
