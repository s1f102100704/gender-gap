module Api
  module V1
      class DiscussionThreadsRecommendtopicController < DiscussionThreadsController
          def index
              recommendThreads = RecommendedThread.fetch_recommend
              render_json_response(recommendThreads)
          end
      end
  end
end