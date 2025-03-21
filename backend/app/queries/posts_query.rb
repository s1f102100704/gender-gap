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
end