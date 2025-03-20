class DiscussionThreadAdminRecommendedQuery
  def all
    DiscussionThread.where(id: RecommendedThread.select(:discussion_thread_id))
                    .order(updated_at: :desc)
  end
end