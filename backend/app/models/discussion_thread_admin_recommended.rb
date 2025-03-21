class DiscussionThreadAdminRecommended < ApplicationRecord
  has_many :posts, dependent: :destroy, foreign_key: "discussion_thread_id"

  self.table_name = "recommended_threads"

  def self.fetch_recommended
    DiscussionThreadAdminRecommendedQuery.new.all
  end

  def self.bulk_add(thread_ids)
    ActiveRecord::Base.transaction do
      thread_ids.each do |thread_id|
        unless exists?(discussion_thread_id: thread_id)
          create!(discussion_thread_id: thread_id)
        end
      end
    end
  rescue ActiveRecord::RecordInvalid => e
    Rails.logger.error "❌ bulk_add エラー: #{e.message}"
    raise ActiveRecord::Rollback
  end

  def self.bulk_delete(ids)
    DiscussionThread.where(id: ids).destroy_all
  end
end