class PostsQuery
  def all
    Post.all
  end

  def reported
    Post.joins(:reports)
        .select("posts.*, COUNT(reports.id) AS reports_count")
        .group("posts.id")
        .order("reports_count DESC")
  end

  def self.fetch_by_discussion_thread(discussion_thread_id)
    Post.includes(:votes)
        .where(discussion_thread_id: discussion_thread_id)
        .map do |post|
          {
            id: post.id,
            content: post.content,
            discussion_thread_id: post.discussion_thread_id,
            gender: post.gender,
            votes: post.votes.map { |vote| { id: vote.id, gender: vote.gender, vote_type: vote.vote_type } },
            created_at: post.created_at,
          }
        end
  end
end