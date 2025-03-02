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
          thread = DiscussionThread.build_new(thread_params)
          if thread.save
            render_json_response({id:thread.id,thread_title:thread.thread_title}, status: :created)
          else
            render_json_response({ errors: thread.errors.full_messages }, status: :unprocessable_entity)
          end
        end
  
        private
  
        def thread_params
          params.require(:discussion_thread).permit(:thread_title)
        end
      end
    end
end