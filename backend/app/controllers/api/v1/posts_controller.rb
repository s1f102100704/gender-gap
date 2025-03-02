module Api
    module V1
        class Api::V1::PostsController < ApplicationController

            def index
                contents = Post.fetch_recent
                render_json_response(contents)
            end
            def show
                content = Post.find_by_id!(params[:id])
                render_json_response(content)
            end
            def create
                content = Post.build_new(content_params)
                if content.save
                    render_json_response(content, status: :created)
                else
                    render_json_response({ errors: content.errors.full_messages }, status: :unprocessable_entity)
                end
            end

            private
            def content_params
                params.require(:post).permit(:content, :discussion_thread_id)
            end
        end
    end
end
