module Api
    module V1
        class DiscussionThreadsWeekPopulartopicController < DiscussionThreadsController
            def index
                weekPopularThreads = DiscussionThread.fetch_week_popular
                render_json_response(weekPopularThreads)
            end
        end
    end
end