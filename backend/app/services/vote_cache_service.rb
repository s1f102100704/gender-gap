class VoteCacheService
  def self.get_votes(post_id)
    redis_key = "post_#{post_id}_votes"
    cached_votes = $redis.get(redis_key)
    return JSON.parse(cached_votes) if cached_votes

    # キャッシュがない場合はDBから取得
    post = Post.find_by_id(post_id)
    votes = Vote.vote_counts(post)

    # キャッシュに保存（10分間）
    $redis.set(redis_key, votes.to_json)
    $redis.expire(redis_key, 10.minutes.to_i)

    votes
  end
end