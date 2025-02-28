module Api
    module V1
      class DiscussionThreadsController < ApplicationController
        def index
          threads = DiscussionThread.all.order(created_at: :desc)
          render json: threads
        end
  
        def show
          thread = DiscussionThread.find(params[:id])
          render json: thread
        rescue ActiveRecord::RecordNotFound
          render json: { error: "Thread not found" }, status: :not_found
        end
  
        def create
          thread = DiscussionThread.new(thread_params)
          if thread.save
            render json: thread, status: :created
          else
            render json: { errors: thread.errors.full_messages }, status: :unprocessable_entity
          end
        end
  
        private
  
        def thread_params
          params.require(:discussion_thread).permit(:title)
        end
      end
    end
  end