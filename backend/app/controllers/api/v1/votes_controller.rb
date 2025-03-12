module Api
  module V1
    class VotesController < ApplicationController
      before_action :set_post

      # 投票する（または変更）
      def create
        ip_address = request.env["HTTP_X_FORWARDED_FOR"] || request.remote_ip
        result = Vote.create_or_update_vote(@post, ip_address, vote_params[:vote_type])

        if result[:success]
          render_success({ vote: result[:vote] }, status: result[:vote].persisted? ? :created : :ok)
        else
          render_error(result[:message] || result[:errors])
        end
      end

      # 投票を取り消す
      def destroy
        Rails.logger.debug "Vote in DB: #{Vote.find_by(post_id: @post.id, ip_address: '192.168.1.1').inspect}"

        result = Vote.remove_vote(@post, request.remote_ip)
        
        if result[:success]
          render_success({ message: result[:message] })
        else
          render_error(result[:message], status: :not_found)
        end
      end

      # 投票の集計データを取得
      def index
        render_success({ votes: Vote.vote_counts(@post) })
      end

      private

      def set_post
        @post = Post.find(params[:post_id])
      rescue ActiveRecord::RecordNotFound
        render_error("Post not found", status: :not_found)
      end

      def vote_params
        params.require(:vote).permit(:vote_type,:ip_address,:post_id)
      end
    end
  end
end
