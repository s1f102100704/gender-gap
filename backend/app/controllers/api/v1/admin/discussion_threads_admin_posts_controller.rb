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
            resentThreads = DiscussionThreadAdminPosts.update_posts(params[:id],params[:thread_title])
            render_json_response(resentThreads)
          end
      end
    end
  end
end