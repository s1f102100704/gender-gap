module Api
    module V1
        class DiscussionThreadsPopulartopicController < DiscussionThreadsController
            def index
                popularThreads = DiscussionThread.fetch_popular
                render_json_response(poparThreads)
            end
        end
    end
end