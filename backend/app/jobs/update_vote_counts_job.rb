class UpdateVoteCountsJob < ApplicationJob
  queue_as :default

  def perform
    redis_key = "post_#{post_id}_votes"
    $redis.del(redis_key) # Redisのキャッシュを削除
  end
end

