class RepliesController < ApplicationController
  def create
    parent_post = Post.find(params[:post_id])
    reply = parent_post.replies.build(reply_params)

    if reply.save
      render json: reply, status: :created
    else
      render json: { errors: reply.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def reply_params
    params.require(:post).permit(:content, :gender, :image_key)
  end
end
