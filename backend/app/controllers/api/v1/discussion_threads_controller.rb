module Api
    module V1
      class DiscussionThreadsController < ApplicationController
        def index
          threads = DiscussionThread.fetch_recent
          render_json_response(threads)
        end
  
        def show
          thread = DiscussionThread.find_by_id!(params[:id])
          render_json_response(thread)
        rescue ActiveRecord::RecordNotFound
          render_json_response({ error: "Thread not found" }, status: :not_found)
        end
  
        def create
          ActiveRecord::Base.transaction do
            thread = DiscussionThread.create!(thread_params)

            Post.create!(
              discussion_thread_id: thread.id,
              content: params[:post][:content], # post の中の content を取得
              gender: params[:post][:gender]
            )
  
            render_json_response({ id: thread.id, thread_title: thread.thread_title }, status: :created)
          end
        rescue ActiveRecord::RecordInvalid => e
          render_json_response({ errors: e.message }, status: :unprocessable_entity)
        end
  
        private
  
        def thread_params
          params.require(:discussion_thread).permit(:thread_title)
        end
      end
    end
end