module Api
  module V1
    module Admin
      class DiscussionThreadsAdminRecommendedTopicController < DiscussionThreadsController
          def index
              resentThreads = DiscussionThreadAdminRecommended.fetch_recommended
              render_json_response(resentThreads)
          end
          
          # def destroy
          #   resentThreads = DiscussionThreadAdmin.delete_admin(params[:id])
          #   render_json_response(resentThreads)
          # end
          # def update
          #   Rails.logger.debug("update_title_admin: #{params[:id]}")
          #   resentThreads = DiscussionThreadAdmin.update_title_admin(params[:id],params[:thread_title])
          #   render_json_response(resentThreads)
          # end
      end
    end
  end
end