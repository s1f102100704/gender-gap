module Api
  module V1
    module Admin
      class DiscussionThreadsAdmintopicController < DiscussionThreadsController
          def index
              resentThreads = DiscussionThreadAdmin.fetch_admin
              render_json_response(resentThreads)
          end
      end
    end
  end
end