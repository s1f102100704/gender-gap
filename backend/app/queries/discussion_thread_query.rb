class DiscussionThreadQuery
    attr_reader :limit
  
    def initialize(limit = 10)
      @limit = limit
    end
  
    def recent
      DiscussionThread
        .includes(posts: :votes)
        .left_joins(:posts)
        .select('discussion_threads.*, COUNT(posts.id) AS comments_count')
        .group('discussion_threads.id, discussion_threads.created_at')
        .order('discussion_threads.created_at DESC')
        .limit(@limit)
    end
  
    def popular
      DiscussionThread
        .includes(posts: :votes)
        .left_joins(:posts)
        .where('posts.created_at >= ?', 1.day.ago)
        .group(:id)
        .order("COUNT(posts.id) DESC")
        .limit(@limit)
        .select("discussion_threads.*, COUNT(posts.id) AS posts_count")
    end

    def weekPopular
      DiscussionThread
        .includes(posts: :votes)
        .left_joins(:posts)
        .where('posts.created_at >= ?', 1.week.ago)
        .group(:id)
        .order("COUNT(posts.id) DESC")
        .limit(@limit)
        .select("discussion_threads.*, COUNT(posts.id) AS comments_count")
    end
end

   