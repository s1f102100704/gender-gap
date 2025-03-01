class DiscussionThread < ApplicationRecord
  scope :recent, -> { order(created_at: :desc) }

  # インデックス用: 最近のスレッドを取得
  def self.fetch_recent
    recent
  end

  # 詳細ページ用: IDからスレッドを取得（エラーハンドリング含む）
  def self.find_by_id!(id)
    find(id)
  rescue ActiveRecord::RecordNotFound
    raise ActiveRecord::RecordNotFound, "DiscussionThread with ID #{id} not found"
  end

  # 新規作成用: インスタンス生成
  def self.build_new(params)
    new(params)
  end
  end