module Api
    module V1
        class DiscussionThreadsPopulartopicController < DiscussionThreadsController
            def index
                popularThreads = DiscussionThread.fetch_popular
                render_json_response(popularThreads)
            end
        end
    end
end