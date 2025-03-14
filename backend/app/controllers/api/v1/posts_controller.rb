module Api
    module V1
        class Api::V1::PostsController < ApplicationController
            def index
                content = Post.where(discussion_thread_id: params[:discussion_thread_id])
                if content
                    render_json_response(content)
                else
                    render json: { error: "Post not found for this discussion_thread_id" }, status: :not_found
                end
                
            end
            def show
                content = Post.where(discussion_thread_id: params[:discussion_thread_id])
                if content
                    render_json_response(content)
                else
                    render json: { error: "Post not found for this discussion_thread_id" }, status: :not_found
                end
                
            end
            def create
                content = Post.build_new(content_params,@current_user.id)
                if content.save 
                    render_json_response({content:content}, status: :created)
                else
                    render_json_response({ errors: content.errors.full_messages }, status: :unprocessable_entity)
                end
            end

            private
            def content_params
                params.require(:post).permit(:content, :discussion_thread_id, :gender)
            end
        end
    end
end
