module Api
  module V1
    module Admin
      class DiscussionThreadsAdminTopicController < DiscussionThreadsController
          def index
              resentThreads = DiscussionThreadAdmin.fetch_admin
              render_json_response(resentThreads)
          end
          
          def destroy
            resentThreads = DiscussionThreadAdmin.delete_admin(params[:id])
            render_json_response(resentThreads)
          end

          def update
            resentThreads = DiscussionThreadAdmin.update_title_admin(params[:id],params[:thread_title])
            render_json_response(resentThreads)
          end
      end
    end
  end
end