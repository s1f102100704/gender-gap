class VotesController < ApplicationController
    before_action :set_post
  
    # 投票する（または変更）
    def create
      result = Vote.create_or_update_vote(@post, request.remote_ip, vote_params[:vote_type])
  
      if result[:success]
        render_success({ vote: result[:vote] }, status: result[:vote].persisted? ? :created : :ok)
      else
        render_error(result[:message] || result[:errors])
      end
    end
  
    # 投票を取り消す
    def destroy
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
      render_error('Post not found', status: :not_found)
    end
  
    def vote_params
      params.require(:vote).permit(:vote_type)
    end
  end
end