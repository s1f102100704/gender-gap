module Api
  module V1
    module Admin
      class DiscussionThreadsAdminRecommendedTopicController < DiscussionThreadsController
          def index
              recommended = DiscussionThreadAdminRecommended.fetch_recommended

              Rails.logger.debug("recommendedaaaaaa: #{recommended}")
              render_json_response(recommended)
          end

          def bulk_add
            DiscussionThreadAdminRecommended.bulk_add(params[:selectedThreads])
            render_json_response({ message: "おすすめスレッドが追加されました。" })
          end

          def bulk_delete
            DiscussionThreadAdminRecommended.bulk_delete(params[:selectedThreads])
            render_json_response({ message: "おすすめスレッドが削除されました。" })
          end
      end
    end
  end
end