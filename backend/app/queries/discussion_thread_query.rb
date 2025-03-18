class DiscussionThreadQuery
    attr_reader :limit
  
    def initialize(limit = 10)
      @limit = limit
    end
  
    def recent
      DiscussionThread.order(created_at: :desc).limit(@limit)
    end
  
    def popular
      DiscussionThread
        .left_joins(:posts)
        .where('posts.created_at >= ?', 1.day.ago)
        .group(:id)
        .order("COUNT(posts.id) DESC")
        .limit(@limit)
        .select("discussion_threads.*")
    end

    def weekPopular
      DiscussionThread
        .left_joins(:posts)
        .where('posts.created_at >= ?', 1.week.ago)
        .group(:id)
        .order("COUNT(posts.id) DESC")
        .limit(@limit)
        .select("discussion_threads.*")
    end
  end
   