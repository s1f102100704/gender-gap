class RecommendedDiscussionThreadQuery
  attr_reader :limit

  def initialize(limit = 3)
    @limit = limit
  end

  def recommend
    DiscussionThread.where(id: RecommendedThread.select(:discussion_thread_id))
                    .order(updated_at: :desc)
                    .limit(@limit)
  end
end
 