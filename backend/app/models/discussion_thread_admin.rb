class DiscussionThreadAdmin < ApplicationRecord
  has_many :posts, dependent: :destroy, foreign_key: "discussion_thread_id"

  # 管理画面からのスレッド取得
  def self.fetch_admin
    DiscussionThreadAdminQuery.new.all
  end
end