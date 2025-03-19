class RecommendedThread < ApplicationRecord
  belongs_to :discussion_thread

  # 管理人おすすめのスレッドを取得
  def self.fetch_recommend
    RecommendedDiscussionThreadQuery.new.recommend
  end
end