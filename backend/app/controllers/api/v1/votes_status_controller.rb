module Api
  module V1
    class VotesStatusController < ApplicationController
      def index
        post_id = params[:post_id]
        votes = VoteCacheService.get_votes(post_id)
        Rails.logger.info("Fetched votes for post_id #{post_id}: #{votes}")
        render_success({ votes: votes, post_id: post_id })
      end
    end
  end
end