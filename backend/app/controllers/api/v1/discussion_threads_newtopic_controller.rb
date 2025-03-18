module Api
    module V1
        class DiscussionThreadsNewtopicController < DiscussionThreadsController
            def index
                resentThreads = DiscussionThread.fetch_recent
                render_json_response(resentThreads)
            end
        end
    end
end