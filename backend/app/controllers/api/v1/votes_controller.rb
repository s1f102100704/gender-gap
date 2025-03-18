module Api
  module V1
    class VotesController < ApplicationController
      before_action :set_post

      # 投票する（または変更）
      def create
        result = Vote.create_or_update_vote(@post, @current_user.id, vote_params[:vote_type])
      
        if result[:success]
          UpdateVoteCountsJob.perform_later(@post.id)
          render_success({ vote: result[:vote] }, status: result[:status])
        else
          render_error(result[:message] , status: result[:status])
        end
      end

      private
      def set_post
        @post = Post.find(params[:post_id])
      rescue ActiveRecord::RecordNotFound
        render_error("Post not found", status: :not_found)
      end

      def vote_params
        params.require(:vote).permit(:vote_type,:post_id)
      end
    end
  end
end
