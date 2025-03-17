class DiscussionThread < ApplicationRecord
  has_many :posts, dependent: :destroy, foreign_key: "discussion_thread_id"

  def self.create_with_post(thread_params, post_params)
    ActiveRecord::Base.transaction do
      thread = create!(thread_params)

      thread.posts.create!(
        content: post_params[:content],
        gender: post_params[:gender]
      )

      return thread
    end
  rescue ActiveRecord::RecordInvalid => e
    Rails.logger.error "Failed to create DiscussionThread with Post: #{e.message}"
    return DiscussionThread.new 
  end

  # 最近のスレッドを取得
  def self.fetch_recent
    DiscussionThreadQuery.new.recent
  end

  # 人気のスレッドを取得（直近1週間のコメント数が多い順）
  def self.fetch_popular
    DiscussionThreadQuery.new.popular
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