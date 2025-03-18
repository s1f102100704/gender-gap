module Api
  module V1
    class VotesStatusController < ApplicationController
      def index
        redis_key = "post_#{params[:post_id]}_votes"

        # Redisにキャッシュがあるか確認
        cached_votes = $redis.get(redis_key)

        if cached_votes
          votes = JSON.parse(cached_votes)
        else
          post = Post.find(params[:post_id])
          votes = Vote.vote_counts(post)
          $redis.set(redis_key, votes.to_json)
          $redis.expire(redis_key, 10.minutes.to_i) # 10分キャッシュ
        end

        render_success({ votes: votes, post_id: params[:post_id] })
      end
    end
  end
end