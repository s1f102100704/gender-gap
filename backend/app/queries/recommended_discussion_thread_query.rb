class RecommendedDiscussionThreadQuery
  attr_reader :limit

  def initialize(limit = 3)
    @limit = limit
  end

  def recommend
    DiscussionThread
    .left_joins(:posts)
    .where(id: RecommendedThread.select(:discussion_thread_id))
    .group(:id)
    .select('discussion_threads.*, COUNT(posts.id) AS comments_count')
    .order(updated_at: :desc)
    .limit(@limit)
  end
end
 