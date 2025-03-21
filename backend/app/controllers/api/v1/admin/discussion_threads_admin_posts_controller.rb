module Api
  module V1
    module Admin
      class DiscussionThreadsAdminPostsController < DiscussionThreadsController
          def index
              resentThreads = DiscussionThreadAdminPosts.fetch_posts
              render_json_response(resentThreads)
          end
          
          def destroy
            resentThreads = DiscussionThreadAdminPosts.delete_posts(params[:id])
            render_json_response(resentThreads)
          end
          def update
            result = DiscussionThreadAdminPosts.update_posts(params[:id], post_params[:content])
            render json: result
          end
          
          private
          
          def post_params
            params.require(:discussion_threads_admin_post).permit(:content)
          end
      end
    end
  end
end