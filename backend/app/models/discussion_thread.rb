class DiscussionThread < ApplicationRecord
  has_many :posts, dependent: :destroy, foreign_key: "discussion_thread_id"
  scope :recent, -> { order(created_at: :desc) }

  # 最近のスレッドを取得
  def self.fetch_recent
    recent
  end

  # ID からスレッドを取得（例外処理は Controller 側で行う）
  def self.find_by_id(id)
    find(id)
  end

  # 新規作成用
  def self.build_new(params)
    new(params)
  end
end