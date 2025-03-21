class DiscussionThreadAdminPosts < ApplicationRecord
  has_many :posts, dependent: :destroy, foreign_key: "discussion_thread_id"

  # 管理画面からのスレッド取得
  def self.fetch_posts
    Post.all
  end
  def self.delete_posts(id)
    post = Post.find_by(id: id)
    if post
      post.destroy
      { message: "ポストが削除されました。" }
    else
      { error: "ポストが見つかりません。" }
    end
  end
  def self.update_posts(id, postContent)
    post = Post.find_by(id: id)
    if post
      Rails.logger.debug(postContent)
      post.update(content: postContent)
      { message: "ポストが変更されました。" }
    else
      { error: "ポストが見つかりません。" }
    end
  end
end